import { createServerFn } from "@tanstack/react-start";
import { getDB, DBQuestion, SecurityLog, DBMCQQuestion } from "./db";
import { FILLBLANK_QUESTIONS } from "./fillblank-data";

// Helper to shuffle questions
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper to serialize MongoDB BSON objects safely for TanStack/Seroval transfer
function serializeDoc<T>(doc: T): T {
  if (!doc) return doc;
  return JSON.parse(JSON.stringify(doc));
}

// Question 2 of the 3-question trial: the AI prompt strength question.
// The candidate is given an AI topic and must write a strong prompt for it.
// Strength is computed server-side (never trusted from the client) and stored
// so admins can review it; candidates see it on their results page only.
const PROMPT_QUESTION_ID = "prompt-strength-question";

// Question 3 of the 3-question trial: fill in the blanks.
// Answers live server-side only; the client sends the submitted text keyed by question id.

// Heuristic "prompt strength" score (0-100) based on characteristics of a
// strong prompt: substance, role/persona, a clear task verb, context,
// output constraints and basic clarity.
function computePromptStrength(prompt: string): number {
  const p = (prompt || "").trim();
  if (!p) return 0;

  const words = p.split(/\s+/).filter(Boolean);
  let score = 0;

  // Substance: a strong prompt has meaningful length (target ~40+ words)
  score += Math.min(35, (words.length / 40) * 35);

  // Role / persona framing
  if (/\b(act as|you are|as a|assume the role|your role|imagine you)\b/i.test(p)) score += 15;

  // Clear task verb
  if (/\b(write|create|generate|draft|produce|build|design|code|implement|analyze|explain|describe|list|summarize|solve|answer|translate|review|evaluate|outline|compare|train)\b/i.test(p)) score += 15;

  // Context / reasoning words
  if (/\b(because|for|given|based on|context|in order to|so that|such as)\b/i.test(p)) score += 10;

  // Output constraints / format expectations
  if (/\b(format|list|bullet|table|json|csv|code|steps|words|concise|detailed|tone|style|paragraph|example)\b/i.test(p)) score += 10;

  // Specificity: numbers, colons or named detail
  if (/\d/.test(p)) score += 5;

  // Clarity: starts with a capital letter and ends with sentence punctuation
  if (/^[A-Z]/.test(p)) score += 5;
  if (/[.!?]$/.test(p)) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export const adminCheckSession = createServerFn({ method: "GET" }).handler(async () => {
  const { verifyAdminSession } = await import("./server-helpers.server");
  const isValid = await verifyAdminSession();
  return { success: isValid };
});

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { getCookie, deleteCookie } = await import("@tanstack/react-start/server");
  const token = getCookie("admin_session");
  if (token) {
    try {
      const db = await getDB();
      await db.collection("adminSessions").deleteOne({ token });
    } catch (e) {
      console.error("[adminLogout] DB Error:", e);
    }
    deleteCookie("admin_session");
  }
  return { success: true };
});

export const adminAuthenticate = createServerFn({ method: "POST" }).validator((d: any) => d).handler(async (ctx: any) => {
  const { checkRateLimit } = await import("./server-helpers.server");
  const data = ctx?.data;
  if (!data || !data.password) {
    return { success: false, error: "Missing password" };
  }

  // Account & Token Based Rate Limiting for Admin Authenticate
  const rateLimitKey = `admin_auth`;
  if (!checkRateLimit(rateLimitKey, 5, 60000)) {
    return { success: false, error: "Too many authentication attempts. Please wait 1 minute." };
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) {
    throw new Error("CRITICAL SECURITY ERROR: ADMIN_PASSWORD environment variable is not defined.");
  }

  try {
    if (data.password !== ADMIN_PASSWORD) {
      const db = await getDB();
      const logsColl = db.collection<SecurityLog>("securityLogs");
      await logsColl.insertOne({
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        email: "admin",
        action: "ADMIN_AUTH_FAILURE",
        status: "suspicious",
        details: `Failed admin login attempt.`,
      });
      return { success: false, error: "Invalid credentials" };
    }

    const db = await getDB();
    const logsColl = db.collection<SecurityLog>("securityLogs");
    await logsColl.insertOne({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      email: "admin",
      action: "ADMIN_LOGIN",
      status: "success",
      details: "Admin authenticated successfully",
    });

    const token = crypto.randomUUID();
    const maxAge = data.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24; 
    const expiresAt = new Date(Date.now() + maxAge * 1000);

    await db.collection("adminSessions").insertOne({
      token,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    });

    const { setCookie } = await import("@tanstack/react-start/server");
    setCookie("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return { success: true };
  } catch (error: any) {
    console.error("[SERVER_FN:adminAuthenticate] Error:", error.message);
    return { success: false, error: "Authentication failed" };
  }
});

// 1. Student Registration, Resume, or Login
export const registerOrResumeStudent = createServerFn({ method: "POST" }).validator((d: any) => d).handler(
  async (ctx: any) => {
    const { checkRateLimit, getCached, setCached, clearCachePrefix, getSystemConfig } = await import("./server-helpers.server");
    const data = ctx?.data;
    if (!data || !data.email) {
      return { student: null, questions: [], error: "Missing email field" };
    }

    const email = data.email.toLowerCase().trim();
    const action = data.action || "resume"; // "register" | "login" | "resume"
    const pinInput = data.pin?.toUpperCase().trim();

    // Student Login/Register Rate Limiting
    const rateLimitKey = `student_auth:${email}`;
    if (!checkRateLimit(rateLimitKey, 10, 60000)) {
      return { student: null, questions: [], error: "Too many login/registration attempts. Please wait 1 minute." };
    }

    // Access Control check
    const systemConfig = await getSystemConfig();
    if (systemConfig.mode === "maintenance") {
      return {
        student: null,
        questions: [],
        error: "Access Denied: The system is in Maintenance Mode. Only administrators can connect."
      };
    }

    try {
      const db = await getDB();
      const studentsColl = db.collection<any>("students");
      const questionsColl = db.collection<DBQuestion>("questions");
      const mcqColl = db.collection<DBMCQQuestion>("mcqQuestions");
      const logsColl = db.collection<SecurityLog>("securityLogs");
      const studentSessionsColl = db.collection("studentSessions");

      const student = await studentsColl.findOne({ email });

      // (MCQs are assigned conditionally based on action and student status)

      // If user chooses to register but email exists, deny it
      if (action === "register" && student) {
        return { student: null, questions: [], error: "Email already registered. Please Login/Resume with PIN." };
      }

      // If user wants to Login/Resume
      if (action === "login" || action === "resume") {
        if (!student) {
          return { student: null, questions: [], error: "Email address not found. Register first." };
        }

        // Validate PIN
        if (action === "login") {
          if (student.loginPin !== pinInput) {
            const log: SecurityLog = {
              id: Math.random().toString(36).substring(7),
              timestamp: new Date().toISOString(),
              email,
              action: "STUDENT_AUTH_FAILURE",
              status: "suspicious",
              details: "Invalid PIN provided",
            };
            await logsColl.insertOne(log);
            return { student: null, questions: [], error: "Invalid PIN code. Access denied." };
          }
        } else if (action === "resume") {
          const { verifyStudentSession } = await import("./server-helpers.server");
          if (!(await verifyStudentSession(email))) {
            return { student: null, questions: [], error: "Session expired or invalid. Please log in again." };
          }
        }

        // Create secure student session
        const token = crypto.randomUUID();
        const maxAge = 60 * 60 * 24; // 24 hours
        const expiresAt = new Date(Date.now() + maxAge * 1000);

        await studentSessionsColl.insertOne({
          token,
          email,
          createdAt: new Date().toISOString(),
          expiresAt: expiresAt.toISOString(),
        });

        // Set secure HTTP-only cookie
        const { setCookie } = await import("@tanstack/react-start/server");
        setCookie("student_session", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge,
        });

        const nowStr = new Date().toISOString();
        await studentsColl.updateOne(
          { email },
          {
            $set: { loginTime: nowStr, lastActiveTime: nowStr },
            $inc: { attempts: 1 },
          },
        );

        const updatedStudent = await studentsColl.findOne({ email });
        const assignedQ = await questionsColl
          .find({ id: { $in: updatedStudent.assignedQuestions } })
          .toArray();

        // Write security log
        const log: SecurityLog = {
          id: Math.random().toString(36).substring(7),
          timestamp: nowStr,
          email,
          action: "RESUME_SESSION",
          status: "success",
          details: `Resumed active session at level ${updatedStudent.currentLevel}`,
        };
        await logsColl.insertOne(log);

      let assignedMCQIds = updatedStudent.assignedMCQs || [];
      if (assignedMCQIds.length < 2) {
        const randomMCQs = await mcqColl.aggregate([
          { $match: { active: true } },
          { $sample: { size: 2 } }
        ]).toArray();
        if (randomMCQs.length < 2) {
          return { student: null, questions: [], error: "System configuration error: At least 2 active MCQs are required. Contact administrator." };
        }
        assignedMCQIds = randomMCQs.map(q => q.id);
        await studentsColl.updateOne({ email }, { $set: { assignedMCQs: assignedMCQIds } });
        updatedStudent.assignedMCQs = assignedMCQIds;
      }

        const mcqDocs = await mcqColl.find({ id: { $in: assignedMCQIds } }).toArray();
        const sanitizedMCQs = shuffleArray(mcqDocs).map((q: any) => ({
          id: q.id,
          category: q.category,
          text: q.text,
          options: q.options,
        }));

        return serializeDoc({
          student: updatedStudent,
          questions: getAssignedQuestionsForStudent(updatedStudent, assignedQ),
          mcqQuestions: sanitizedMCQs,
          error: null,
        });
      }

      // If user wants to register as a new candidate
      const name = (data.name || "").trim();
      const department = (data.department || "").trim();
      const macAddress = (data.macAddress || "").trim().toUpperCase();

      if (!name || !department) {
        return {
          student: null,
          questions: [],
          error: "Full Name and Department are required to register",
        };
      }

      // Strict validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { student: null, questions: [], error: "Invalid email format" };
      }
      
      const macRegex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
      if (macAddress && !macRegex.test(macAddress)) {
        return { student: null, questions: [], error: "Invalid MAC Address format (e.g. 00:1A:2B:3C:4D:5E)" };
      }

      // Retrieve cached active questions or fetch from DB
      let activeQuestions = getCached<DBQuestion[]>("active_questions");
      if (!activeQuestions) {
        activeQuestions = await questionsColl.find({ active: true }).toArray();
        setCached("active_questions", activeQuestions, 30000); // cache for 30s
      }

      if (activeQuestions.length === 0) {
        return {
          student: null,
          questions: [],
          error: "No active questions in pool to start test. Contact administrator.",
        };
      }

      const shuffled = shuffleArray(activeQuestions);
      const assigned = shuffled.slice(0, 1).map((q) => q.id);

      // Generate random 6-character Pin
      const allowedChars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // exclude confusing characters (0, 1, I, O)
      let generatedPin = "";
      for (let i = 0; i < 6; i++) {
        generatedPin += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
      }

      const nowStr = new Date().toISOString();
      const newStudent: any = {
        email,
        name,
        department,
        macAddress,
        loginPin: generatedPin,
        score: 0,
        levelsCompleted: 0,
        status: "Active",
        timeTaken: 0,
        completionTime: null,
        loginTime: nowStr,
        attempts: 1,
        wrongAnswersCount: 0,
        eliminationDetails: null,
        locked: false,
        currentLevel: 1,
        assignedQuestions: assigned,
        currentGuesses: [],
        levelStartTime: nowStr,
        lastActiveTime: nowStr,
      };

      let assignedMCQIds: string[] = [];
      const randomMCQs = await mcqColl.aggregate([
        { $match: { active: true } },
        { $sample: { size: 2 } }
      ]).toArray();
      if (randomMCQs.length < 2) {
        return { student: null, questions: [], error: "System configuration error: At least 2 active MCQs are required to start the assessment. Contact administrator." };
      }
      assignedMCQIds = randomMCQs.map(q => q.id);
      newStudent.assignedMCQs = assignedMCQIds;

      await studentsColl.insertOne(newStudent);

      // Create session
      const token = crypto.randomUUID();
      const maxAge = 60 * 60 * 24; 
      const expiresAt = new Date(Date.now() + maxAge * 1000);

      await studentSessionsColl.insertOne({
        token,
        email,
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
      });

      const { setCookie } = await import("@tanstack/react-start/server");
      setCookie("student_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
      });

      const log: SecurityLog = {
        id: Math.random().toString(36).substring(7),
        timestamp: nowStr,
        email,
        action: "REGISTRATION",
        status: "success",
        details: `Registered candidate with PIN ${generatedPin}`,
      };
      await logsColl.insertOne(log);

      const assignedQ = await questionsColl.find({ id: { $in: assigned } }).toArray();
      
      const mcqDocs = await mcqColl.find({ id: { $in: assignedMCQIds } }).toArray();
      const sanitizedMCQs = shuffleArray(mcqDocs).map((q: any) => ({
        id: q.id,
        category: q.category,
        text: q.text,
        options: q.options,
      }));

      // Clear leaderboard cache as new user registered
      clearCachePrefix("leaderboard");

      return serializeDoc({
        student: newStudent,
        questions: getAssignedQuestionsForStudent(newStudent, assignedQ),
        mcqQuestions: sanitizedMCQs,
        loginPin: generatedPin,
        error: null,
      });
    } catch (error: any) {
      console.error("[SERVER_FN:registerOrResumeStudent] Error:", error.message);
      return {
        student: null,
        questions: [],
        error: `Internal Server Error: ${error.message}`,
      };
    }
  },
);

// 1.5 Submit MCQ Assessment Results (SECURE)
export const submitMCQResults = createServerFn({ method: "POST" }).validator((d: any) => d).handler(async (ctx: any) => {
  const { checkRateLimit, verifyStudentSession, getSystemConfig } = await import("./server-helpers.server");
  const data = ctx?.data;
  
  if (!data || !data.email || !data.answers) {
    return { success: false, error: "Invalid submission payload" };
  }

  const email = data.email.toLowerCase().trim();

  // Rate Limiting
  const rateLimitKey = `submit_mcq:${email}`;
  if (!checkRateLimit(rateLimitKey, 5, 60000)) {
    return { success: false, error: "Rate limit exceeded." };
  }

  if (!(await verifyStudentSession(email))) {
    return { success: false, error: "Unauthorized session." };
  }

  try {
    const db = await getDB();
    const studentsColl = db.collection<any>("students");
    const mcqColl = db.collection<DBMCQQuestion>("mcqQuestions");
    const logsColl = db.collection<SecurityLog>("securityLogs");

    const student = await studentsColl.findOne({ email });
    if (!student) return { success: false, error: "Student not found" };

    if (student.mcqCompleted) {
      return { success: false, error: "Assessment already submitted" };
    }

    const config = await getSystemConfig();

    // Backend Scoring Validation
    let mcqScore = 0;
    const assignedMCQIds = student.assignedMCQs || [];
    const assignedQuestions = await mcqColl.find({ id: { $in: assignedMCQIds } }).toArray();

    for (const [qId, optionIdx] of Object.entries(data.answers)) {
      if (!assignedMCQIds.includes(qId)) continue;
      const q = assignedQuestions.find((item) => item.id === qId);
      if (q && q.correctAnswer === optionIdx) {
        mcqScore += 5; // MCQ is worth exactly 5 points
      }
    }
    // Strict limit enforcement
    mcqScore = Math.min(mcqScore, config.mcqMaxScore || 5);

    // AI prompt strength question (Question 2 of the 3-question trial).
    // Strength is computed on the server; never trusted from the client.
    const promptTitle = "AI Prompt Challenge";
    const promptText =
      typeof data.answers?.[PROMPT_QUESTION_ID] === "string"
        ? data.answers[PROMPT_QUESTION_ID].trim()
        : "";
    const promptStrength = computePromptStrength(promptText);
    // Prompt Score (Max 15)
    let promptScore = Math.round((promptStrength / 100) * (config.promptMaxScore || 15));
    promptScore = Math.min(promptScore, config.promptMaxScore || 15);

    // Fill in the blanks question
    let fillupScore = 0;
    let fillBlankSolved = false;
    for (const fb of FILLBLANK_QUESTIONS) {
      const val =
        typeof data.answers?.[fb.id] === "string"
          ? data.answers[fb.id].trim().toLowerCase()
          : "";
      if (val && val === fb.answer.toLowerCase()) {
        fillupScore += 5; // Fill in the blank is exactly 5 points
        fillBlankSolved = true;
        break;
      }
    }
    // Strict limit enforcement
    fillupScore = Math.min(fillupScore, config.fillupMaxScore || 5);

    // Final calculations
    const totalScore = mcqScore + promptScore + fillupScore;
    const maxScore = config.totalMaxScore || 25;
    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    
    // Status is now Completed since this is the only assessment
    const isSelected = percentage >= (config.round1PassingScore || 60);
    const finalStatus = "Completed";

    // Save to DB
    await studentsColl.updateOne(
      { email },
      {
        $set: {
          mcqCompleted: true,
          mcqScore,
          promptScore,
          fillupScore,
          totalScore,
          finalScore: totalScore,
          finalPercentage: percentage,
          mcqPercentage: percentage,
          mcqAnswers: data.answers,
          mcqTimeTaken: data.timeTaken || 0,
          mcqCompletionTime: new Date().toISOString(),
          finalSubmissionTime: new Date().toISOString(),
          promptTitle,
          promptText,
          promptStrength,
          status: finalStatus,
          locked: true,
          selectionStatus: "PENDING",
        },
      }
    );

    await logsColl.insertOne({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      email,
      action: "MCQ_SUBMISSION",
      status: "success",
      details: `Submitted assessment: MCQ=${mcqScore}, Prompt=${promptScore}, Fillup=${fillupScore}. Total=${totalScore}/${maxScore} (${percentage.toFixed(1)}%).`,
    });

    return {
      success: true,
      mcqScore,
      promptScore,
      fillupScore,
      totalScore,
      percentage,
      maxScore,
      score: totalScore, // For backwards compatibility
      totalQuestions: 3, // For backwards compatibility
      promptStrength,
      promptTitle,
      promptText,
      fillBlankSolved,
    };
  } catch (error: any) {
    console.error("[SERVER_FN:submitMCQResults] Error:", error.message);
    return { success: false, error: "Internal Server Error" };
  }
});

// 2. Submit Letter or Full Word Guess
export const submitGuess = createServerFn({ method: "POST" }).validator((d: any) => d).handler(async (ctx: any) => {
  const { checkRateLimit, verifyStudentSession, clearCachePrefix } = await import("./server-helpers.server");
  const data = ctx?.data;
  if (!data || !data.email || !data.guess) {
    return {
      student: null,
      questions: [],
      error: "Invalid guess submission: Missing email or guess field.",
    };
  }

  const email = data.email.toLowerCase().trim();
  const guess = data.guess.toUpperCase().trim();

  // API Rate Limiting: 60 requests per minute per session/account
  const rateLimitKey = `submit_guess:${email}`;
  if (!checkRateLimit(rateLimitKey, 60, 60000)) {
    return { student: null, questions: [], error: "Rate limit exceeded. Please wait a moment." };
  }

  // Validate student session
  if (!(await verifyStudentSession(email))) {
    return { student: null, questions: [], error: "Unauthorized session. Please login again." };
  }

    try {
      const { getSystemConfig } = await import("./server-helpers.server");
      const config = await getSystemConfig();
      const db = await getDB();
      const studentsColl = db.collection<any>("students");
      const questionsColl = db.collection<DBQuestion>("questions");
      const logsColl = db.collection<SecurityLog>("securityLogs");

    const student = await studentsColl.findOne({ email });
    if (!student) return { student: null, questions: [], error: "Student not found" };

    if (!student.mcqCompleted) {
      return { student: null, questions: [], error: "Must complete MCQ round first." };
    }

    if (student.locked) {
      const assignedQ = await questionsColl
        .find({ id: { $in: student.assignedQuestions } })
        .toArray();
      return serializeDoc({
        student,
        questions: getAssignedQuestionsForStudent(student, assignedQ),
        error: "Account is locked. Retest not allowed.",
      });
    }

    const currentQId = student.assignedQuestions[student.currentLevel - 1];
    const question = await questionsColl.findOne({ id: currentQId });
    if (!question) return { student, questions: [], error: "Assigned question not found" };

    const word = question.word.toUpperCase();
    const now = new Date();
    const elapsedSeconds = Math.floor(
      (now.getTime() - new Date(student.levelStartTime).getTime()) / 1000,
    );

    student.timeTaken += Math.max(0, elapsedSeconds);
    student.levelStartTime = now.toISOString();
    student.lastActiveTime = now.toISOString();

    if (guess === "-TIMEOUT-") {
      student.status = "Eliminated";
      student.round1Completed = true;
      student.round1Qualified = false;
      student.locked = true;
      student.eliminationDetails = `Failed level ${student.currentLevel} by running out of time`;

      await logsColl.insertOne({
        id: Math.random().toString(36).substring(7),
        timestamp: now.toISOString(),
        email,
        action: "ELIMINATION",
        status: "failed",
        details: `Eliminated on level ${student.currentLevel} due to time expiration. Target word was: ${word}`,
      });
    } else if (guess.length === 1) {
      if (student.currentGuesses.includes(guess)) {
        const assignedQ = await questionsColl
          .find({ id: { $in: student.assignedQuestions } })
          .toArray();
        return serializeDoc({
          student,
          questions: getAssignedQuestionsForStudent(student, assignedQ),
          message: "Letter already guessed",
        });
      }
      student.currentGuesses.push(guess);

      const isCorrect = word.includes(guess);
      if (!isCorrect) {
        student.wrongAnswersCount += 1;
        if (student.wrongAnswersCount >= config.maxWrongAttempts) {
          student.status = "Eliminated";
          student.round1Completed = true;
          student.round1Qualified = false;
          student.locked = true;
          student.eliminationDetails = `Failed level ${student.currentLevel} by guessing incorrect letter '${guess}'`;

          await logsColl.insertOne({
            id: Math.random().toString(36).substring(7),
            timestamp: now.toISOString(),
            email,
            action: "ELIMINATION",
            status: "failed",
            details: `Eliminated on level ${student.currentLevel}. Target word was: ${word}`,
          });
        }
      }
    } else {
      if (guess === word) {
        word.split("").forEach((c) => {
          if (!student.currentGuesses.includes(c)) student.currentGuesses.push(c);
        });
      } else {
        student.wrongAnswersCount += 1;
        if (student.wrongAnswersCount >= config.maxWrongAttempts) {
          student.status = "Eliminated";
          student.round1Completed = true;
          student.round1Qualified = false;
          student.locked = true;
          student.eliminationDetails = `Failed level ${student.currentLevel} by guessing incorrect word '${guess}'`;

          await logsColl.insertOne({
            id: Math.random().toString(36).substring(7),
            timestamp: now.toISOString(),
            email,
            action: "ELIMINATION",
            status: "failed",
            details: `Eliminated on level ${student.currentLevel} via incorrect word guess.`,
          });
        }
      }
    }

    const isSolved = word.split("").every((char) => student.currentGuesses.includes(char));
    if (isSolved && (student.status === "Active" || student.status === "Qualified")) {
      const penalty = student.wrongAnswersCount * 15;
      student.score += Math.max(40, 100 - penalty);
      student.levelsCompleted = student.currentLevel;

      if (student.currentLevel >= student.assignedQuestions.length) {
        student.round1Completed = true;
        student.round1Score = student.score;
        student.round1TimeTaken = student.timeTaken;
        student.round1CompletionTime = now.toISOString();

        // Puzzle is now Round 2, meaning it's the final round
        const finalScore = (student.mcqScore || 0) + student.score;
        student.finalScore = finalScore;
        student.score = finalScore;
        student.finalSubmissionTime = now.toISOString();

        student.status = "Completed";
        student.round1Qualified = true;
        student.locked = true;

        await logsColl.insertOne({
          id: Math.random().toString(36).substring(7),
          timestamp: now.toISOString(),
          email,
          action: "COMPLETION",
          status: "success",
          details: `Successfully completed all levels with score: ${student.score}`,
        });
      } else {
        student.currentLevel += 1;
        student.currentGuesses = [];
        student.wrongAnswersCount = 0; 
        student.levelStartTime = now.toISOString();
      }
    }

    await studentsColl.replaceOne({ email }, student);

    const assignedQ = await questionsColl
      .find({ id: { $in: student.assignedQuestions } })
      .toArray();
      
    // Clear leaderboard cache
    clearCachePrefix("leaderboard");

    return serializeDoc({
      student,
      questions: getAssignedQuestionsForStudent(student, assignedQ),
      error: null,
    });
  } catch (error: any) {
    console.error("[SERVER_FN:submitGuess] Error:", error.message);
    return { student: null, questions: [], error: `Submit Guess failed: ${error.message}` };
  }
});

// 3. Admin Get Dashboard
export const adminGetDashboardData = createServerFn({ method: "GET" }).handler(async () => {
  const { verifyAdminSession, getCached, setCached } = await import("./server-helpers.server");
  if (!(await verifyAdminSession())) {
    return {
      students: [],
      questions: [],
      securityLogs: [],
      error: "Unauthorized",
    };
  }

  // Cache Admin dashboard data for 5 seconds to handle heavy concurrent access
  const cacheKey = "admin_dashboard";
  const cached = getCached<any>(cacheKey);
  if (cached) return cached;

  try {
    const db = await getDB();
    const students = await db.collection("students").find().toArray();
    const questions = await db.collection("questions").find().toArray();
    const mcqQuestions = await db.collection("mcqQuestions").find().toArray();
    const securityLogs = await db.collection("securityLogs").find().sort({ timestamp: -1 }).limit(200).toArray();
    
    const result = serializeDoc({
      students,
      questions,
      mcqQuestions,
      securityLogs,
      error: null,
    });

    setCached(cacheKey, result, 5000); 
    return result;
  } catch (error: any) {
    console.error("[SERVER_FN:adminGetDashboardData] Error:", error.message);
    return {
      students: [],
      questions: [],
      securityLogs: [],
      error: `Admin Fetch failed: ${error.message}`,
    };
  }
});

// 4. Admin CRUD Question
export const adminUpdateQuestion = createServerFn({ method: "POST" }).validator((d: any) => d).handler(async (ctx: any) => {
  const { verifyAdminSession } = await import("./server-helpers.server");
  if (!(await verifyAdminSession())) {
    return { success: false, questions: [], error: "Unauthorized" };
  }
  const data = ctx?.data;
  if (!data) return { success: false, questions: [], error: "Missing data payload" };
  
  try {
    const db = await getDB();
    const questionsColl = db.collection<DBQuestion>("questions");
    const { action, question } = data;

    if (action === "add") {
      const lastQ = await questionsColl.find().sort({ id: -1 }).limit(1).toArray();
      const nextId = lastQ.length > 0 ? lastQ[0].id + 1 : 1;
      const newQ: DBQuestion = {
        id: nextId,
        word: (question.word || "").toUpperCase().trim(),
        category: question.category || "General",
        hint: question.hint || "",
        difficulty: question.difficulty || "medium",
        active: question.active !== false,
      };
      await questionsColl.insertOne(newQ);
    } else if (action === "edit") {
      await questionsColl.updateOne(
        { id: question.id },
        {
          $set: {
            word: (question.word || "").toUpperCase().trim(),
            category: question.category || "General",
            hint: question.hint || "",
            difficulty: question.difficulty || "medium",
            active: question.active !== undefined ? question.active : true,
          },
        },
      );
    } else if (action === "delete") {
      await questionsColl.deleteOne({ id: question.id });
    }

    // Invalidate questions cache
    const { clearCachePrefix } = await import("./server-helpers.server");
    clearCachePrefix("active_questions");

    const allQuestions = await questionsColl.find().toArray();
    const sanitized = allQuestions.map(q => { const { _id, ...rest } = q as any; return rest; });
    return serializeDoc({ success: true, questions: sanitized, error: null });
  } catch (error: any) {
    console.error("[SERVER_FN:adminUpdateQuestion] Error:", error.message);
    return { success: false, questions: [], error: `Update Question failed: ${error.message}` };
  }
});

export const adminUpdateMCQQuestion = createServerFn({ method: "POST" }).validator((d: any) => d).handler(async (ctx: any) => {
  const { verifyAdminSession } = await import("./server-helpers.server");
  if (!(await verifyAdminSession())) {
    return { success: false, mcqQuestions: [], error: "Unauthorized" };
  }
  const data = ctx?.data;
  if (!data) return { success: false, mcqQuestions: [], error: "Missing data payload" };
  
  try {
    const db = await getDB();
    const mcqColl = db.collection<DBMCQQuestion>("mcqQuestions");
    const { action, question } = data;

    if (action === "add") {
      const newQ: DBMCQQuestion = {
        id: crypto.randomUUID(),
        category: question.category || "General",
        text: question.text || "",
        options: question.options || ["A", "B", "C", "D"],
        correctAnswer: question.correctAnswer || 0,
        active: question.active !== false,
      };
      await mcqColl.insertOne(newQ);
    } else if (action === "edit") {
      await mcqColl.updateOne(
        { id: question.id },
        {
          $set: {
            category: question.category || "General",
            text: question.text || "",
            options: question.options || ["A", "B", "C", "D"],
            correctAnswer: question.correctAnswer !== undefined ? question.correctAnswer : 0,
            active: question.active !== undefined ? question.active : true,
          },
        },
      );
    } else if (action === "delete") {
      await mcqColl.deleteOne({ id: question.id });
    }

    const { clearCachePrefix } = await import("./server-helpers.server");
    clearCachePrefix("admin_dashboard");

    const allQuestions = await mcqColl.find().toArray();
    const sanitized = allQuestions.map(q => { const { _id, ...rest } = q as any; return rest; });
    return serializeDoc({ success: true, mcqQuestions: sanitized, error: null });
  } catch (error: any) {
    console.error("[SERVER_FN:adminUpdateMCQQuestion] Error:", error.message);
    return { success: false, mcqQuestions: [], error: `Update MCQ failed: ${error.message}` };
  }
});

// 5. Admin Bulk Upload
export const adminBulkUploadQuestions = createServerFn({ method: "POST" }).validator((d: any) => d).handler(
  async (ctx: any) => {
    const { verifyAdminSession } = await import("./server-helpers.server");
    if (!(await verifyAdminSession())) {
      return { success: false, questions: [], error: "Unauthorized" };
    }
    const data = ctx?.data;
    if (!data || !Array.isArray(data))
      return { success: false, questions: [], error: "Invalid data payload" };
      
    try {
      const db = await getDB();
      const questionsColl = db.collection<DBQuestion>("questions");

      const lastQ = await questionsColl.find().sort({ id: -1 }).limit(1).toArray();
      let nextId = lastQ.length > 0 ? lastQ[0].id + 1 : 1;

      const newDocs = data.map((q: any) => ({
        id: nextId++,
        word: q.word.toUpperCase().trim(),
        category: q.category || "General",
        hint: q.hint || "",
        difficulty: q.difficulty || "medium",
        active: q.active !== false,
      }));

      if (newDocs.length > 0) {
        await questionsColl.insertMany(newDocs);
      }

      // Invalidate cache
      const { clearCachePrefix } = await import("./server-helpers.server");
      clearCachePrefix("active_questions");

      const allQuestions = await questionsColl.find().toArray();
      const sanitized = allQuestions.map(q => { const { _id, ...rest } = q as any; return rest; });
      return serializeDoc({ success: true, questions: sanitized, error: null });
    } catch (error: any) {
      console.error("[SERVER_FN:adminBulkUploadQuestions] Error:", error.message);
      return { success: false, questions: [], error: `Bulk upload failed: ${error.message}` };
    }
  },
);

// 6. Admin Unlock or Lock Student Account
export const adminUpdateStudentLock = createServerFn({ method: "POST" }).validator((d: any) => d).handler(
  async (ctx: any) => {
    const { verifyAdminSession, clearCachePrefix } = await import("./server-helpers.server");
    if (!(await verifyAdminSession())) {
      return { success: false, students: [], error: "Unauthorized" };
    }
    const data = ctx?.data;
    if (!data) return { success: false, students: [], error: "Missing data payload" };
    
    try {
      const db = await getDB();
      const studentsColl = db.collection<any>("students");
      const logsColl = db.collection<SecurityLog>("securityLogs");
      const email = data.email.toLowerCase().trim();

      const student = await studentsColl.findOne({ email });
      if (student) {
        const updateFields: any = {
          locked: data.locked,
        };
        if (data.status) {
          updateFields.status = data.status;
          if (data.status === "Active") {
            updateFields.wrongAnswersCount = 0;
            updateFields.currentGuesses = [];
          }
        }

        await studentsColl.updateOne({ email }, { $set: updateFields });

        await logsColl.insertOne({
          id: Math.random().toString(36).substring(7),
          timestamp: new Date().toISOString(),
          email: data.email,
          action: data.locked ? "ADMIN_LOCK_ACCOUNT" : "ADMIN_UNLOCK_ACCOUNT",
          status: "success",
          details: `Admin changed account lock status to ${data.locked}`,
        });
      }

      // Clear caches
      clearCachePrefix("leaderboard");
      clearCachePrefix("admin_dashboard");

      const allStudents = await studentsColl.find().toArray();
      return serializeDoc({ success: true, students: allStudents, error: null });
    } catch (error: any) {
      console.error("[SERVER_FN:adminUpdateStudentLock] Error:", error.message);
      return {
        success: false,
        students: [],
        error: `Update Student Lock failed: ${error.message}`,
      };
    }
  },
);

// 7. Public Paginated Leaderboard Data (Secure)
export const getLeaderboardData = createServerFn({ method: "GET" }).validator((d: any) => d).handler(async (ctx: any) => {
  const { checkRateLimit, getCached, setCached } = await import("./server-helpers.server");
  const data = ctx?.data || {};
  const page = Math.max(1, parseInt(data.page || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(data.limit || "20", 10)));
  const skip = (page - 1) * limit;
  const currentUserEmail = data.currentUserEmail;

  // Rate Limiting: max 60 requests per minute on leaderboard
  const rateLimitKey = `leaderboard_access`;
  if (!checkRateLimit(rateLimitKey, 120, 60000)) {
    return { success: false, error: "Rate limit exceeded. Please wait a moment." };
  }

  const cacheKey = `leaderboard:${page}:${limit}`;
  const cached = getCached<any>(cacheKey);
  if (cached) return cached;

  try {
    const db = await getDB();
    const studentsColl = db.collection("students");

    // Total participants count
    const total = await studentsColl.countDocuments();

    // Query top students with pagination and strict projection (security)
    const students = await studentsColl.find(
      {},
      {
        projection: {
          name: 1,
          department: 1,
          email: 1, // Will be masked
          score: 1,
          mcqScore: 1,
          promptScore: 1,
          fillupScore: 1,
          totalScore: 1,
          finalScore: 1,
          completionTime: 1,
          timeTaken: 1,
          status: 1,
          levelsCompleted: 1,
        }
      }
    )
    .sort({ totalScore: -1, finalScore: -1, score: -1, completionTime: 1, lastActiveTime: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();

    // Mask emails for privacy, except for the requesting user
    const sanitizedStudents = students.map(s => ({
      ...s,
      email: currentUserEmail && s.email === currentUserEmail ? s.email : "HIDDEN"
    }));

    const result = {
      success: true,
      students: serializeDoc(sanitizedStudents),
      total,
      page,
      limit,
    };

    setCached(cacheKey, result, 5000); // cache for 5 seconds
    return result;
  } catch (e: any) {
    console.error("[SERVER_FN:getLeaderboardData] Error:", e);
    return { success: false, error: "Failed to fetch standings" };
  }
});

// Helper: map student assigned question IDs to DBQuestion
function getAssignedQuestionsForStudent(
  student: any,
  allQuestions: DBQuestion[],
): DBQuestion[] {
  return student.assignedQuestions.map((id: number) => {
    const q = allQuestions.find((item) => item.id === id);
    if (q) {
      const { _id, ...rest } = q as any;
      return rest;
    }
    return {
      id,
      word: "FALLBACK",
      category: "General",
      hint: "Contact Admin - Assigned question missing",
      difficulty: "easy",
      active: false,
    };
  });
}

// 8. Public System Config Retrieval (Cached)
export const getSystemConfigData = createServerFn({ method: "GET" }).handler(async () => {
  const { getSystemConfig } = await import("./server-helpers.server");
  const config = await getSystemConfig();
  return serializeDoc(config);
});

// 9. Admin System Config Update
export const adminUpdateSystemConfig = createServerFn({ method: "POST" }).validator((d: any) => d).handler(async (ctx: any) => {
  const { verifyAdminSession } = await import("./server-helpers.server");
  if (!(await verifyAdminSession())) {
    return { success: false, error: "Unauthorized" };
  }

  const data = ctx?.data;
  if (!data) return { success: false, error: "Missing config data" };

  try {
    const db = await getDB();
    await db.collection("systemConfig").updateOne(
      { id: "global" },
      {
        $set: {
          sessionTimeout: Math.max(10, parseInt(data.sessionTimeout, 10) || 45),
          maxWrongAttempts: Math.max(1, parseInt(data.maxWrongAttempts, 10) || 4),
          mode: data.mode || "workshop",
          round1PassingScore: Math.max(0, parseInt(data.round1PassingScore, 10) || 60),
          round2PassingScore: Math.max(0, parseInt(data.round2PassingScore, 10) || 60),
          round1TimeLimit: Math.max(0, parseInt(data.round1TimeLimit, 10) || 300),
          round2TimeLimit: Math.max(0, parseInt(data.round2TimeLimit, 10) || 600),
        }
      },
      { upsert: true }
    );

    // Invalidate config cache
    const { clearCachePrefix } = await import("./server-helpers.server");
    clearCachePrefix("system_config");

    return { success: true };
  } catch (e: any) {
    console.error("[adminUpdateSystemConfig] Error:", e);
    return { success: false, error: e.message };
  }
});

// Finalize Top 125 Selection
export const finalizeTop125 = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
  const { verifyAdminSession, getSystemConfig } = await import("./server-helpers.server");
  const auth = await verifyAdminSession();
  if (!auth) return { success: false, error: "Unauthorized" };

  try {
    const db = await getDB();
    const studentsColl = db.collection<any>("students");
    const config = await getSystemConfig();
    const shortlistSize = config.shortlistSize || 125;

    // Get all completed students
    const candidates = await studentsColl.find({ status: "Completed" }).toArray();

    // Sort deterministically:
    // 1. Total Score (DESC)
    // 2. Prompt Score (DESC)
    // 3. MCQ Score (DESC)
    // 4. Completion Time (ASC)
    candidates.sort((a, b) => {
      const scoreDiff = (b.totalScore || 0) - (a.totalScore || 0);
      if (scoreDiff !== 0) return scoreDiff;
      
      const promptDiff = (b.promptScore || 0) - (a.promptScore || 0);
      if (promptDiff !== 0) return promptDiff;

      const mcqDiff = (b.mcqScore || 0) - (a.mcqScore || 0);
      if (mcqDiff !== 0) return mcqDiff;

      const timeA = new Date(a.finalSubmissionTime || 0).getTime();
      const timeB = new Date(b.finalSubmissionTime || 0).getTime();
      return timeA - timeB;
    });

    const version = new Date().toISOString().replace(/[:.]/g, "-");
    const snapshotCandidates: any[] = [];
    let selectedCount = 0;

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      const rank = i + 1;
      const isSelected = rank <= shortlistSize;
      
      const selectionStatus = isSelected ? "SELECTED" : "NOT_SELECTED";
      const ticketId = isSelected ? `NXP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}` : "";

      await studentsColl.updateOne(
        { email: candidate.email },
        { 
          $set: { 
            rank, 
            selectionStatus, 
            ticketId,
            selectionVersion: version,
            emailStatus: isSelected ? "PENDING" : undefined
          } 
        }
      );

      if (isSelected) selectedCount++;

      snapshotCandidates.push({
        email: candidate.email,
        rank,
        score: candidate.totalScore || 0,
        percentage: candidate.finalPercentage || 0,
        department: candidate.department || "Unknown",
        selectionStatus,
        ticketId
      });
    }

    const snapshot = {
      id: version,
      timestamp: new Date().toISOString(),
      adminId: "admin",
      selectedCount,
      candidates: snapshotCandidates
    };

    await db.collection("selectionSnapshots").insertOne(snapshot);
    await db.collection("securityLogs").insertOne({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      email: "system",
      action: "TOP_125_SELECTION_FINALIZED",
      status: "success",
      details: `Admin finalized selection version ${version}. Selected: ${selectedCount}`
    });

    return { success: true, version, selectedCount };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
});

// Trigger Emails for Selection
export const sendSelectionEmails = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
  const { verifyAdminSession, getSystemConfig } = await import("./server-helpers.server");
  const auth = await verifyAdminSession();
  if (!auth) return { success: false, error: "Unauthorized" };

  try {
    const db = await getDB();
    const studentsColl = db.collection<any>("students");
    const { sendEmail } = await import("./email");

    // Find candidates pending email
    const pendingCandidates = await studentsColl.find({ 
      selectionStatus: "SELECTED", 
      emailStatus: { $in: ["PENDING", "FAILED"] } 
    }).toArray();

    if (pendingCandidates.length === 0) {
      return { success: true, message: "No pending emails" };
    }

    const config = await getSystemConfig();
    const eventDate = config.eventDate || "TBD";

    let successCount = 0;
    let failCount = 0;

    for (const candidate of pendingCandidates) {
      const emailContent = `
        <h1>Congratulations ${candidate.name}!</h1>
        <p>You have been officially selected for NexusPro!</p>
        <ul>
          <li><strong>Rank:</strong> ${candidate.rank}</li>
          <li><strong>Score:</strong> ${candidate.totalScore}/25 (${candidate.finalPercentage}%)</li>
          <li><strong>Department:</strong> ${candidate.department}</li>
          <li><strong>Ticket ID:</strong> ${candidate.ticketId}</li>
          <li><strong>Event Date:</strong> ${eventDate}</li>
        </ul>
        <p>Please keep this Ticket ID secure. You will need it for entry.</p>
      `;

      const result = await sendEmail({
        to: candidate.email,
        subject: "NEXUSPRO — YOU'RE SELECTED | EVENT ENTRY TICKET",
        html: emailContent
      });

      if (result.success) {
        successCount++;
        await studentsColl.updateOne(
          { email: candidate.email },
          { 
            $set: { 
              emailStatus: "SENT", 
              lastEmailAttempt: new Date().toISOString(),
              emailFailureReason: null
            } 
          }
        );
      } else {
        failCount++;
        await studentsColl.updateOne(
          { email: candidate.email },
          { 
            $set: { 
              emailStatus: "FAILED", 
              lastEmailAttempt: new Date().toISOString(),
              emailFailureReason: result.error || "Unknown error"
            } 
          }
        );
      }
    }

    await db.collection("securityLogs").insertOne({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      email: "system",
      action: "EMAILS_DISPATCHED",
      status: "success",
      details: `Admin dispatched selection emails. Success: ${successCount}, Failed: ${failCount}`
    });

    return { success: true, successCount, failCount };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
});
