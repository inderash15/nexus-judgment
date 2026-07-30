import { createServerFn } from "@tanstack/react-start";
import { getDB, DBQuestion, SecurityLog } from "./db";

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

export const adminAuthenticate = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
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
export const registerOrResumeStudent = createServerFn({ method: "POST" }).handler(
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
      const logsColl = db.collection<SecurityLog>("securityLogs");
      const studentSessionsColl = db.collection("studentSessions");

      const student = await studentsColl.findOne({ email });

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

        return serializeDoc({
          student: updatedStudent,
          questions: getAssignedQuestionsForStudent(updatedStudent, assignedQ),
          error: null,
        });
      }

      // If user wants to register as a new candidate
      const name = (data.name || "").trim();
      const department = (data.department || "").trim();
      const macAddress = (data.macAddress || "").trim();

      if (!name || !department || !macAddress) {
        return {
          student: null,
          questions: [],
          error: "Full Name, Department, and Laptop MAC Address are required to register",
        };
      }

      // Retrieve cached active questions or fetch from DB
      let activeQuestions = getCached<DBQuestion[]>("active_questions");
      if (!activeQuestions) {
        activeQuestions = await questionsColl.find({ active: true }).toArray();
        setCached("active_questions", activeQuestions, 30000); // cache for 30s
      }

      if (activeQuestions.length < 7) {
        return {
          student: null,
          questions: [],
          error: "Insufficient questions in pool to start test. Contact administrator.",
        };
      }

      const shuffled = shuffleArray(activeQuestions);
      const assigned = shuffled.slice(0, 7).map((q) => q.id);

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
      
      // Clear leaderboard cache as new user registered
      clearCachePrefix("leaderboard");

      return serializeDoc({
        student: newStudent,
        questions: getAssignedQuestionsForStudent(newStudent, assignedQ),
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

// 2. Submit Letter or Full Word Guess
export const submitGuess = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
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
    const db = await getDB();
    const studentsColl = db.collection<any>("students");
    const questionsColl = db.collection<DBQuestion>("questions");
    const logsColl = db.collection<SecurityLog>("securityLogs");

    const student = await studentsColl.findOne({ email });
    if (!student) return { student: null, questions: [], error: "Student not found" };

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

    if (guess.length === 1) {
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
        if (student.wrongAnswersCount >= 4) {
          student.status = "Eliminated";
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
        if (student.wrongAnswersCount >= 4) {
          student.status = "Eliminated";
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
    if (isSolved && student.status === "Active") {
      const penalty = student.wrongAnswersCount * 15;
      student.score += Math.max(40, 100 - penalty);
      student.levelsCompleted = student.currentLevel;

      if (student.currentLevel >= 7) {
        student.status = student.score >= 500 ? "Qualified" : "Completed";
        student.locked = true;
        student.completionTime = now.toISOString();

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
    const securityLogs = await db.collection("securityLogs").find().sort({ timestamp: -1 }).limit(200).toArray();
    
    const result = serializeDoc({
      students,
      questions,
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
export const adminUpdateQuestion = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
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
    return serializeDoc({ success: true, questions: allQuestions, error: null });
  } catch (error: any) {
    console.error("[SERVER_FN:adminUpdateQuestion] Error:", error.message);
    return { success: false, questions: [], error: `Update Question failed: ${error.message}` };
  }
});

// 5. Admin Bulk Upload
export const adminBulkUploadQuestions = createServerFn({ method: "POST" }).handler(
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
      return serializeDoc({ success: true, questions: allQuestions, error: null });
    } catch (error: any) {
      console.error("[SERVER_FN:adminBulkUploadQuestions] Error:", error.message);
      return { success: false, questions: [], error: `Bulk Upload failed: ${error.message}` };
    }
  },
);

// 6. Admin Unlock or Lock Student Account
export const adminUpdateStudentLock = createServerFn({ method: "POST" }).handler(
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
export const getLeaderboardData = createServerFn({ method: "GET" }).handler(async (ctx: any) => {
  const { checkRateLimit, getCached, setCached } = await import("./server-helpers.server");
  const data = ctx?.data || {};
  const page = Math.max(1, parseInt(data.page || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(data.limit || "20", 10)));
  const skip = (page - 1) * limit;

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
          score: 1,
          completionTime: 1,
          timeTaken: 1,
          status: 1,
          levelsCompleted: 1,
        }
      }
    )
    .sort({ score: -1, completionTime: 1, lastActiveTime: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();

    const result = {
      success: true,
      students: serializeDoc(students),
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
    if (q) return q;
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
export const adminUpdateSystemConfig = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
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
