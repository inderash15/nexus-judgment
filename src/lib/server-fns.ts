import { createServerFn } from "@tanstack/react-start";
import { getDB, DBStudent, DBQuestion, StudentStatus, SecurityLog } from "./db";

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

// 1. Student Registration or Resume
export const registerOrResumeStudent = createServerFn({ method: "POST" })
  .handler(async (ctx: any) => {
    try {
      console.log("[SERVER_FN:registerOrResumeStudent] Handler start. Email:", ctx?.data?.email);
      const data = ctx?.data;
      if (!data || !data.email) {
        console.warn("[SERVER_FN:registerOrResumeStudent] Validation failed: Missing email field.");
        return { student: null, questions: [], error: "Missing email field" };
      }

      console.log("[SERVER_FN:registerOrResumeStudent] Connecting to database...");
      const db = await getDB();
      console.log("[SERVER_FN:registerOrResumeStudent] Database connected successfully.");
      
      const studentsColl = db.collection<DBStudent>("students");
      const questionsColl = db.collection<DBQuestion>("questions");
      const logsColl = db.collection<SecurityLog>("securityLogs");

      const email = data.email.toLowerCase().trim();
      const name = (data.name || "").trim();
      const department = (data.department || "").trim();

      console.log("[SERVER_FN:registerOrResumeStudent] Querying student collection for:", email);
      let student = await studentsColl.findOne({ email });

      if (student) {
        console.log("[SERVER_FN:registerOrResumeStudent] Student found. Resuming session at level:", student.currentLevel);
        const nowStr = new Date().toISOString();
        await studentsColl.updateOne(
          { email },
          {
            $set: { loginTime: nowStr, lastActiveTime: nowStr },
            $inc: { attempts: 1 }
          }
        );
        
        const updatedStudent = await studentsColl.findOne({ email });
        if (!updatedStudent) throw new Error("Student update failed");

        console.log("[SERVER_FN:registerOrResumeStudent] Writing security log for resume...");
        if (updatedStudent.locked) {
          const log: SecurityLog = {
            id: Math.random().toString(36).substring(7),
            timestamp: nowStr,
            email,
            action: "RESUME_LOCKED_ACCOUNT",
            status: "suspicious",
            details: `Attempted to resume locked account. Current Status: ${updatedStudent.status}`
          };
          await logsColl.insertOne(log);
        } else {
          const log: SecurityLog = {
            id: Math.random().toString(36).substring(7),
            timestamp: nowStr,
            email,
            action: "RESUME_SESSION",
            status: "success",
            details: `Resumed active session at level ${updatedStudent.currentLevel}`
          };
          await logsColl.insertOne(log);
        }

        const assignedQ = await questionsColl.find({ id: { $in: updatedStudent.assignedQuestions } }).toArray();
        console.log("[SERVER_FN:registerOrResumeStudent] Session resume success.");
        return serializeDoc({ student: updatedStudent, questions: getAssignedQuestionsForStudent(updatedStudent, assignedQ), error: null });
      }

      console.log("[SERVER_FN:registerOrResumeStudent] Student record not found in DB.");
      
      // New student registration requires name and department
      if (!name || !department) {
        console.log("[SERVER_FN:registerOrResumeStudent] Missing parameters for registration. Gaze-bypassed.");
        return { student: null, questions: [], error: "Name and department are required for new registration" };
      }

      console.log("[SERVER_FN:registerOrResumeStudent] Registering new student. Fetching questions...");
      const activeQuestions = await questionsColl.find({ active: true }).toArray();
      if (activeQuestions.length < 7) {
        console.log("[SERVER_FN:registerOrResumeStudent] Insufficient questions. Pool count:", activeQuestions.length);
        return { student: null, questions: [], error: "Insufficient questions in pool to start test. Contact administrator." };
      }

      const shuffled = shuffleArray(activeQuestions);
      const assigned = shuffled.slice(0, 7).map((q) => q.id);

      const nowStr = new Date().toISOString();
      const newStudent: DBStudent = {
        email,
        name,
        department,
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

      console.log("[SERVER_FN:registerOrResumeStudent] Inserting new student document...");
      await studentsColl.insertOne(newStudent);

      console.log("[SERVER_FN:registerOrResumeStudent] Writing security log for registration...");
      const log: SecurityLog = {
        id: Math.random().toString(36).substring(7),
        timestamp: nowStr,
        email,
        action: "REGISTRATION",
        status: "success",
        details: `Registered candidate from ${department}`
      };
      await logsColl.insertOne(log);

      const assignedQ = await questionsColl.find({ id: { $in: assigned } }).toArray();
      console.log("[SERVER_FN:registerOrResumeStudent] Registration success. Outputting questions.");
      return serializeDoc({ student: newStudent, questions: getAssignedQuestionsForStudent(newStudent, assignedQ), error: null });
    } catch (error: any) {
      console.error("[SERVER_FN:registerOrResumeStudent] Critical unhandled error caught inside handler:", error.message, error.stack);
      return {
        student: null,
        questions: [],
        error: `Internal Server Error: ${error.message}`,
        stack: error.stack
      };
    }
  });

// 2. Submit Letter or Full Word Guess
export const submitGuess = createServerFn({ method: "POST" })
  .handler(async (ctx: any) => {
    try {
      const data = ctx?.data;
      if (!data || !data.email || !data.guess) {
        return { student: null, questions: [], error: "Invalid guess submission: Missing email or guess field." };
      }

      const db = await getDB();
      const studentsColl = db.collection<DBStudent>("students");
      const questionsColl = db.collection<DBQuestion>("questions");
      const logsColl = db.collection<SecurityLog>("securityLogs");

      const email = data.email.toLowerCase().trim();
      const guess = data.guess.toUpperCase().trim();

      const student = await studentsColl.findOne({ email });
      if (!student) return { student: null, questions: [], error: "Student not found" };

      if (student.locked) {
        const assignedQ = await questionsColl.find({ id: { $in: student.assignedQuestions } }).toArray();
        return serializeDoc({ student, questions: getAssignedQuestionsForStudent(student, assignedQ), error: "Account is locked. Retest not allowed." });
      }

      const currentQId = student.assignedQuestions[student.currentLevel - 1];
      const question = await questionsColl.findOne({ id: currentQId });
      if (!question) return { student, questions: [], error: "Assigned question not found" };

      const word = question.word.toUpperCase();
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - new Date(student.levelStartTime).getTime()) / 1000);

      student.timeTaken += Math.max(0, elapsedSeconds);
      student.levelStartTime = now.toISOString();
      student.lastActiveTime = now.toISOString();

      // Check if guess is single letter or whole word
      if (guess.length === 1) {
        if (student.currentGuesses.includes(guess)) {
          const assignedQ = await questionsColl.find({ id: { $in: student.assignedQuestions } }).toArray();
          return serializeDoc({ student, questions: getAssignedQuestionsForStudent(student, assignedQ), message: "Letter already guessed" });
        }
        student.currentGuesses.push(guess);

        const isCorrect = word.includes(guess);
        if (!isCorrect) {
          student.wrongAnswersCount += 1;
          // Check for Elimination
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
              details: `Eliminated on level ${student.currentLevel}. Target word was: ${word}`
            });
          }
        }
      } else {
        // Whole word guess
        if (guess === word) {
          // Add all letters to guesses to trigger solved check
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
              details: `Eliminated on level ${student.currentLevel} via incorrect word guess.`
            });
          }
        }
      }

      // Check if word is fully solved
      const isSolved = word.split("").every((char) => student.currentGuesses.includes(char));
      if (isSolved && student.status === "Active") {
        // Calculate score gained (e.g. 100 base - penalty for incorrect attempts)
        const penalty = student.wrongAnswersCount * 15;
        student.score += Math.max(40, 100 - penalty);
        student.levelsCompleted = student.currentLevel;

        if (student.currentLevel >= 7) {
          // Final completion
          student.status = student.score >= 500 ? "Qualified" : "Completed";
          student.locked = true;
          student.completionTime = now.toISOString();

          await logsColl.insertOne({
            id: Math.random().toString(36).substring(7),
            timestamp: now.toISOString(),
            email,
            action: "COMPLETION",
            status: "success",
            details: `Successfully completed all levels with score: ${student.score}`
          });
        } else {
          // Unlock next level
          student.currentLevel += 1;
          student.currentGuesses = [];
          student.wrongAnswersCount = 0; // reset lives for new level
          student.levelStartTime = now.toISOString();
        }
      }

      // Update in DB
      await studentsColl.replaceOne({ email }, student);

      const assignedQ = await questionsColl.find({ id: { $in: student.assignedQuestions } }).toArray();
      return serializeDoc({ student, questions: getAssignedQuestionsForStudent(student, assignedQ), error: null });
    } catch (error: any) {
      console.error("[SERVER_FN:submitGuess] Error:", error.message, error.stack);
      return { student: null, questions: [], error: `Submit Guess failed: ${error.message}` };
    }
  });

// 3. Admin Get Dashboard
export const adminGetDashboardData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const db = await getDB();
      const students = await db.collection<DBStudent>("students").find().toArray();
      const questions = await db.collection<DBQuestion>("questions").find().toArray();
      const securityLogs = await db.collection<SecurityLog>("securityLogs").find().toArray();
      return serializeDoc({
        students,
        questions,
        securityLogs,
        error: null
      });
    } catch (error: any) {
      console.error("[SERVER_FN:adminGetDashboardData] Error:", error.message, error.stack);
      return { students: [], questions: [], securityLogs: [], error: `Admin Fetch failed: ${error.message}` };
    }
  });

// 4. Admin CRUD Question
export const adminUpdateQuestion = createServerFn({ method: "POST" })
  .handler(async (ctx: any) => {
    try {
      const data = ctx?.data;
      if (!data) return { success: false, questions: [], error: "Missing data payload" };
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
            }
          }
        );
      } else if (action === "delete") {
        await questionsColl.deleteOne({ id: question.id });
      }

      const allQuestions = await questionsColl.find().toArray();
      return serializeDoc({ success: true, questions: allQuestions, error: null });
    } catch (error: any) {
      console.error("[SERVER_FN:adminUpdateQuestion] Error:", error.message, error.stack);
      return { success: false, questions: [], error: `Update Question failed: ${error.message}` };
    }
  });

// 5. Admin Bulk Upload
export const adminBulkUploadQuestions = createServerFn({ method: "POST" })
  .handler(async (ctx: any) => {
    try {
      const data = ctx?.data;
      if (!data || !Array.isArray(data)) return { success: false, questions: [], error: "Invalid data payload" };
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

      const allQuestions = await questionsColl.find().toArray();
      return serializeDoc({ success: true, questions: allQuestions, error: null });
    } catch (error: any) {
      console.error("[SERVER_FN:adminBulkUploadQuestions] Error:", error.message, error.stack);
      return { success: false, questions: [], error: `Bulk Upload failed: ${error.message}` };
    }
  });

// 6. Admin Unlock or Lock Student Account
export const adminUpdateStudentLock = createServerFn({ method: "POST" })
  .handler(async (ctx: any) => {
    try {
      const data = ctx?.data;
      if (!data) return { success: false, students: [], error: "Missing data payload" };
      const db = await getDB();
      const studentsColl = db.collection<DBStudent>("students");
      const logsColl = db.collection<SecurityLog>("securityLogs");
      const email = data.email.toLowerCase().trim();

      const student = await studentsColl.findOne({ email });
      if (student) {
        const updateFields: Partial<DBStudent> = {
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
          details: `Admin changed account lock status to ${data.locked} (Status set to ${data.status || student.status})`
        });
      }

      const allStudents = await studentsColl.find().toArray();
      return serializeDoc({ success: true, students: allStudents, error: null });
    } catch (error: any) {
      console.error("[SERVER_FN:adminUpdateStudentLock] Error:", error.message, error.stack);
      return { success: false, students: [], error: `Update Student Lock failed: ${error.message}` };
    }
  });

// Helper: map student assigned question IDs to DBQuestion
function getAssignedQuestionsForStudent(student: DBStudent, allQuestions: DBQuestion[]): DBQuestion[] {
  return student.assignedQuestions.map((id) => {
    const q = allQuestions.find((item) => item.id === id);
    if (q) return q;
    // Fallback: return default question if deleted
    return {
      id,
      word: "FALLBACK",
      category: "General",
      hint: "Contact Admin - Assigned question missing",
      difficulty: "easy",
      active: false
    };
  });
}
