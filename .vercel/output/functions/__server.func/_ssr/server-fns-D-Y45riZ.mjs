import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as FILLBLANK_QUESTIONS } from "./fillblank-data-D9-HLXwo.mjs";
import { t as getDB } from "./db-Dy0-QO7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-fns-D-Y45riZ.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function shuffleArray(array) {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
function serializeDoc(doc) {
	if (!doc) return doc;
	return JSON.parse(JSON.stringify(doc));
}
var PROMPT_QUESTION_ID = "prompt-strength-question";
function computePromptStrength(prompt) {
	const p = (prompt || "").trim();
	if (!p) return 0;
	const words = p.split(/\s+/).filter(Boolean);
	let score = 0;
	score += Math.min(35, words.length / 40 * 35);
	if (/\b(act as|you are|as a|assume the role|your role|imagine you)\b/i.test(p)) score += 15;
	if (/\b(write|create|generate|draft|produce|build|design|code|implement|analyze|explain|describe|list|summarize|solve|answer|translate|review|evaluate|outline|compare|train)\b/i.test(p)) score += 15;
	if (/\b(because|for|given|based on|context|in order to|so that|such as)\b/i.test(p)) score += 10;
	if (/\b(format|list|bullet|table|json|csv|code|steps|words|concise|detailed|tone|style|paragraph|example)\b/i.test(p)) score += 10;
	if (/\d/.test(p)) score += 5;
	if (/^[A-Z]/.test(p)) score += 5;
	if (/[.!?]$/.test(p)) score += 5;
	return Math.max(0, Math.min(100, Math.round(score)));
}
var adminCheckSession_createServerFn_handler = createServerRpc({
	id: "220c0424dcf996be039ec68621c36ac54f0d5261a0f7e6c3d643864262695da4",
	name: "adminCheckSession",
	filename: "src/lib/server-fns.ts"
}, (opts) => adminCheckSession.__executeServer(opts));
var adminCheckSession = createServerFn({ method: "GET" }).handler(adminCheckSession_createServerFn_handler, async () => {
	const { verifyAdminSession } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	return { success: await verifyAdminSession() };
});
var adminLogout_createServerFn_handler = createServerRpc({
	id: "ef500b865ded474ada9177cb740af019b4470871f4f8a62c7c79d82ee0adbc44",
	name: "adminLogout",
	filename: "src/lib/server-fns.ts"
}, (opts) => adminLogout.__executeServer(opts));
var adminLogout = createServerFn({ method: "POST" }).handler(adminLogout_createServerFn_handler, async () => {
	const { getCookie, deleteCookie } = await import("./server-CzwrC6AH.mjs");
	const token = getCookie("admin_session");
	if (token) {
		try {
			await (await getDB()).collection("adminSessions").deleteOne({ token });
		} catch (e) {
			console.error("[adminLogout] DB Error:", e);
		}
		deleteCookie("admin_session");
	}
	return { success: true };
});
var adminAuthenticate_createServerFn_handler = createServerRpc({
	id: "a122f78a17f8171f84de43807ee05a54f7028217b380353ec860930e26e6f8b3",
	name: "adminAuthenticate",
	filename: "src/lib/server-fns.ts"
}, (opts) => adminAuthenticate.__executeServer(opts));
var adminAuthenticate = createServerFn({ method: "POST" }).validator((d) => d).handler(adminAuthenticate_createServerFn_handler, async (ctx) => {
	const { checkRateLimit } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	const data = ctx?.data;
	if (!data || !data.password) return {
		success: false,
		error: "Missing password"
	};
	if (!checkRateLimit(`admin_auth`, 5, 6e4)) return {
		success: false,
		error: "Too many authentication attempts. Please wait 1 minute."
	};
	const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
	if (!ADMIN_PASSWORD) throw new Error("CRITICAL SECURITY ERROR: ADMIN_PASSWORD environment variable is not defined.");
	try {
		if (data.password !== ADMIN_PASSWORD) {
			await (await getDB()).collection("securityLogs").insertOne({
				id: Math.random().toString(36).substring(7),
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				email: "admin",
				action: "ADMIN_AUTH_FAILURE",
				status: "suspicious",
				details: `Failed admin login attempt.`
			});
			return {
				success: false,
				error: "Invalid credentials"
			};
		}
		const db = await getDB();
		await db.collection("securityLogs").insertOne({
			id: Math.random().toString(36).substring(7),
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			email: "admin",
			action: "ADMIN_LOGIN",
			status: "success",
			details: "Admin authenticated successfully"
		});
		const token = crypto.randomUUID();
		const maxAge = data.rememberMe ? 3600 * 24 * 7 : 3600 * 24;
		const expiresAt = new Date(Date.now() + maxAge * 1e3);
		await db.collection("adminSessions").insertOne({
			token,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			expiresAt: expiresAt.toISOString()
		});
		const { setCookie } = await import("./server-CzwrC6AH.mjs");
		setCookie("admin_session", token, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
			maxAge
		});
		return { success: true };
	} catch (error) {
		console.error("[SERVER_FN:adminAuthenticate] Error:", error.message);
		return {
			success: false,
			error: "Authentication failed"
		};
	}
});
var registerOrResumeStudent_createServerFn_handler = createServerRpc({
	id: "4aeb2ec1c37092defabdb6da2cd389a1b2dc95c0fc21c5655c78bb667ac60e7a",
	name: "registerOrResumeStudent",
	filename: "src/lib/server-fns.ts"
}, (opts) => registerOrResumeStudent.__executeServer(opts));
var registerOrResumeStudent = createServerFn({ method: "POST" }).validator((d) => d).handler(registerOrResumeStudent_createServerFn_handler, async (ctx) => {
	const { checkRateLimit, getCached, setCached, clearCachePrefix, getSystemConfig } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	const data = ctx?.data;
	if (!data || !data.email) return {
		student: null,
		questions: [],
		error: "Missing email field"
	};
	const email = data.email.toLowerCase().trim();
	const action = data.action || "resume";
	const pinInput = data.pin?.toUpperCase().trim();
	if (!checkRateLimit(`student_auth:${email}`, 10, 6e4)) return {
		student: null,
		questions: [],
		error: "Too many login/registration attempts. Please wait 1 minute."
	};
	if ((await getSystemConfig()).mode === "maintenance") return {
		student: null,
		questions: [],
		error: "Access Denied: The system is in Maintenance Mode. Only administrators can connect."
	};
	try {
		const db = await getDB();
		const studentsColl = db.collection("students");
		const questionsColl = db.collection("questions");
		const mcqColl = db.collection("mcqQuestions");
		const logsColl = db.collection("securityLogs");
		const studentSessionsColl = db.collection("studentSessions");
		const student = await studentsColl.findOne({ email });
		if (action === "register" && student) return {
			student: null,
			questions: [],
			error: "Email already registered. Please Login/Resume with PIN."
		};
		if (action === "login" || action === "resume") {
			if (!student) return {
				student: null,
				questions: [],
				error: "Email address not found. Register first."
			};
			if (action === "login") {
				if (student.loginPin !== pinInput) {
					const log = {
						id: Math.random().toString(36).substring(7),
						timestamp: (/* @__PURE__ */ new Date()).toISOString(),
						email,
						action: "STUDENT_AUTH_FAILURE",
						status: "suspicious",
						details: "Invalid PIN provided"
					};
					await logsColl.insertOne(log);
					return {
						student: null,
						questions: [],
						error: "Invalid PIN code. Access denied."
					};
				}
			} else if (action === "resume") {
				const { verifyStudentSession } = await import("./server-helpers.server-CEpv9qNZ.mjs");
				if (!await verifyStudentSession(email)) return {
					student: null,
					questions: [],
					error: "Session expired or invalid. Please log in again."
				};
			}
			const token = crypto.randomUUID();
			const maxAge = 3600 * 24;
			const expiresAt = new Date(Date.now() + maxAge * 1e3);
			await studentSessionsColl.insertOne({
				token,
				email,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				expiresAt: expiresAt.toISOString()
			});
			const { setCookie } = await import("./server-CzwrC6AH.mjs");
			setCookie("student_session", token, {
				httpOnly: true,
				secure: true,
				sameSite: "lax",
				path: "/",
				maxAge
			});
			const nowStr = (/* @__PURE__ */ new Date()).toISOString();
			await studentsColl.updateOne({ email }, {
				$set: {
					loginTime: nowStr,
					lastActiveTime: nowStr
				},
				$inc: { attempts: 1 }
			});
			const updatedStudent = await studentsColl.findOne({ email });
			const assignedQ = await questionsColl.find({ id: { $in: updatedStudent.assignedQuestions } }).toArray();
			const log = {
				id: Math.random().toString(36).substring(7),
				timestamp: nowStr,
				email,
				action: "RESUME_SESSION",
				status: "success",
				details: `Resumed active session at level ${updatedStudent.currentLevel}`
			};
			await logsColl.insertOne(log);
			let assignedMCQIds = updatedStudent.assignedMCQs || [];
			if (assignedMCQIds.length < 2) {
				const randomMCQs = await mcqColl.aggregate([{ $match: { active: true } }, { $sample: { size: 2 } }]).toArray();
				if (randomMCQs.length < 2) return {
					student: null,
					questions: [],
					error: "System configuration error: At least 2 active MCQs are required. Contact administrator."
				};
				assignedMCQIds = randomMCQs.map((q) => q.id);
				await studentsColl.updateOne({ email }, { $set: { assignedMCQs: assignedMCQIds } });
				updatedStudent.assignedMCQs = assignedMCQIds;
			}
			const sanitizedMCQs = shuffleArray(await mcqColl.find({ id: { $in: assignedMCQIds } }).toArray()).map((q) => ({
				id: q.id,
				category: q.category,
				text: q.text,
				options: q.options
			}));
			return serializeDoc({
				student: updatedStudent,
				questions: getAssignedQuestionsForStudent(updatedStudent, assignedQ),
				mcqQuestions: sanitizedMCQs,
				error: null
			});
		}
		const name = (data.name || "").trim();
		const department = (data.department || "").trim();
		const macAddress = (data.macAddress || "").trim().toUpperCase();
		if (!name || !department) return {
			student: null,
			questions: [],
			error: "Full Name and Department are required to register"
		};
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return {
			student: null,
			questions: [],
			error: "Invalid email format"
		};
		if (macAddress && !/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(macAddress)) return {
			student: null,
			questions: [],
			error: "Invalid MAC Address format (e.g. 00:1A:2B:3C:4D:5E)"
		};
		let activeQuestions = getCached("active_questions");
		if (!activeQuestions) {
			activeQuestions = await questionsColl.find({ active: true }).toArray();
			setCached("active_questions", activeQuestions, 3e4);
		}
		if (activeQuestions.length === 0) return {
			student: null,
			questions: [],
			error: "No active questions in pool to start test. Contact administrator."
		};
		const assigned = shuffleArray(activeQuestions).slice(0, 1).map((q) => q.id);
		const allowedChars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
		let generatedPin = "";
		for (let i = 0; i < 6; i++) generatedPin += allowedChars.charAt(Math.floor(Math.random() * 32));
		const nowStr = (/* @__PURE__ */ new Date()).toISOString();
		const newStudent = {
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
			lastActiveTime: nowStr
		};
		let assignedMCQIds = [];
		const randomMCQs = await mcqColl.aggregate([{ $match: { active: true } }, { $sample: { size: 2 } }]).toArray();
		if (randomMCQs.length < 2) return {
			student: null,
			questions: [],
			error: "System configuration error: At least 2 active MCQs are required to start the assessment. Contact administrator."
		};
		assignedMCQIds = randomMCQs.map((q) => q.id);
		newStudent.assignedMCQs = assignedMCQIds;
		await studentsColl.insertOne(newStudent);
		const token = crypto.randomUUID();
		const maxAge = 3600 * 24;
		const expiresAt = new Date(Date.now() + maxAge * 1e3);
		await studentSessionsColl.insertOne({
			token,
			email,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			expiresAt: expiresAt.toISOString()
		});
		const { setCookie } = await import("./server-CzwrC6AH.mjs");
		setCookie("student_session", token, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
			maxAge
		});
		const log = {
			id: Math.random().toString(36).substring(7),
			timestamp: nowStr,
			email,
			action: "REGISTRATION",
			status: "success",
			details: `Registered candidate with PIN ${generatedPin}`
		};
		await logsColl.insertOne(log);
		const assignedQ = await questionsColl.find({ id: { $in: assigned } }).toArray();
		const sanitizedMCQs = shuffleArray(await mcqColl.find({ id: { $in: assignedMCQIds } }).toArray()).map((q) => ({
			id: q.id,
			category: q.category,
			text: q.text,
			options: q.options
		}));
		clearCachePrefix("leaderboard");
		return serializeDoc({
			student: newStudent,
			questions: getAssignedQuestionsForStudent(newStudent, assignedQ),
			mcqQuestions: sanitizedMCQs,
			loginPin: generatedPin,
			error: null
		});
	} catch (error) {
		console.error("[SERVER_FN:registerOrResumeStudent] Error:", error.message);
		return {
			student: null,
			questions: [],
			error: `Internal Server Error: ${error.message}`
		};
	}
});
var submitMCQResults_createServerFn_handler = createServerRpc({
	id: "3a225929a800e137232c34655f668507e7af8c96e3fa62443a62befde273ec31",
	name: "submitMCQResults",
	filename: "src/lib/server-fns.ts"
}, (opts) => submitMCQResults.__executeServer(opts));
var submitMCQResults = createServerFn({ method: "POST" }).validator((d) => d).handler(submitMCQResults_createServerFn_handler, async (ctx) => {
	const { checkRateLimit, verifyStudentSession, getSystemConfig } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	const data = ctx?.data;
	if (!data || !data.email || !data.answers) return {
		success: false,
		error: "Invalid submission payload"
	};
	const email = data.email.toLowerCase().trim();
	if (!checkRateLimit(`submit_mcq:${email}`, 5, 6e4)) return {
		success: false,
		error: "Rate limit exceeded."
	};
	if (!await verifyStudentSession(email)) return {
		success: false,
		error: "Unauthorized session."
	};
	try {
		const db = await getDB();
		const studentsColl = db.collection("students");
		const mcqColl = db.collection("mcqQuestions");
		const logsColl = db.collection("securityLogs");
		const student = await studentsColl.findOne({ email });
		if (!student) return {
			success: false,
			error: "Student not found"
		};
		if (student.mcqCompleted) return {
			success: false,
			error: "MCQ Assessment already submitted"
		};
		let score = 0;
		const assignedMCQIds = student.assignedMCQs || [];
		const assignedQuestions = await mcqColl.find({ id: { $in: assignedMCQIds } }).toArray();
		for (const [qId, optionIdx] of Object.entries(data.answers)) {
			if (!assignedMCQIds.includes(qId)) continue;
			const q = assignedQuestions.find((item) => item.id === qId);
			if (q && q.correctAnswer === optionIdx) score++;
		}
		const promptText = typeof data.answers?.[PROMPT_QUESTION_ID] === "string" ? data.answers[PROMPT_QUESTION_ID].trim() : "";
		const promptStrength = computePromptStrength(promptText);
		const promptTitle = data.promptTitle || "";
		score += promptStrength / 100;
		let fillBlankSolved = false;
		for (const fb of FILLBLANK_QUESTIONS) {
			const val = typeof data.answers?.[fb.id] === "string" ? data.answers[fb.id].trim().toLowerCase() : "";
			if (val && val === fb.answer.toLowerCase()) {
				fillBlankSolved = true;
				break;
			}
		}
		if (fillBlankSolved) score++;
		const config = await getSystemConfig();
		const totalQuestions = 3;
		const percentage = score / totalQuestions * 100;
		config.round1PassingScore;
		await studentsColl.updateOne({ email }, { $set: {
			mcqCompleted: true,
			mcqScore: score,
			mcqPercentage: percentage,
			mcqAnswers: data.answers,
			mcqTimeTaken: data.timeTaken || 0,
			mcqCompletionTime: (/* @__PURE__ */ new Date()).toISOString(),
			promptTitle,
			promptText,
			promptStrength,
			status: "Active",
			locked: false
		} });
		await logsColl.insertOne({
			id: Math.random().toString(36).substring(7),
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			email,
			action: "MCQ_SUBMISSION",
			status: "success",
			details: `Submitted MCQ with score ${score.toFixed(2)}/${totalQuestions} (${percentage.toFixed(1)}%). Prompt strength: ${promptStrength}/100`
		});
		return {
			success: true,
			score,
			percentage,
			totalQuestions,
			promptStrength,
			promptTitle,
			promptText,
			fillBlankSolved
		};
	} catch (error) {
		console.error("[SERVER_FN:submitMCQResults] Error:", error.message);
		return {
			success: false,
			error: "Internal Server Error"
		};
	}
});
var submitGuess_createServerFn_handler = createServerRpc({
	id: "1f63413257f480c1f8709827f79c8dd513d52842d685d5b462cca4f6b170e6e1",
	name: "submitGuess",
	filename: "src/lib/server-fns.ts"
}, (opts) => submitGuess.__executeServer(opts));
var submitGuess = createServerFn({ method: "POST" }).validator((d) => d).handler(submitGuess_createServerFn_handler, async (ctx) => {
	const { checkRateLimit, verifyStudentSession, clearCachePrefix } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	const data = ctx?.data;
	if (!data || !data.email || !data.guess) return {
		student: null,
		questions: [],
		error: "Invalid guess submission: Missing email or guess field."
	};
	const email = data.email.toLowerCase().trim();
	const guess = data.guess.toUpperCase().trim();
	if (!checkRateLimit(`submit_guess:${email}`, 60, 6e4)) return {
		student: null,
		questions: [],
		error: "Rate limit exceeded. Please wait a moment."
	};
	if (!await verifyStudentSession(email)) return {
		student: null,
		questions: [],
		error: "Unauthorized session. Please login again."
	};
	try {
		const { getSystemConfig } = await import("./server-helpers.server-CEpv9qNZ.mjs");
		const config = await getSystemConfig();
		const db = await getDB();
		const studentsColl = db.collection("students");
		const questionsColl = db.collection("questions");
		const logsColl = db.collection("securityLogs");
		const student = await studentsColl.findOne({ email });
		if (!student) return {
			student: null,
			questions: [],
			error: "Student not found"
		};
		if (!student.mcqCompleted) return {
			student: null,
			questions: [],
			error: "Must complete MCQ round first."
		};
		if (student.locked) return serializeDoc({
			student,
			questions: getAssignedQuestionsForStudent(student, await questionsColl.find({ id: { $in: student.assignedQuestions } }).toArray()),
			error: "Account is locked. Retest not allowed."
		});
		const currentQId = student.assignedQuestions[student.currentLevel - 1];
		const question = await questionsColl.findOne({ id: currentQId });
		if (!question) return {
			student,
			questions: [],
			error: "Assigned question not found"
		};
		const word = question.word.toUpperCase();
		const now = /* @__PURE__ */ new Date();
		const elapsedSeconds = Math.floor((now.getTime() - new Date(student.levelStartTime).getTime()) / 1e3);
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
				details: `Eliminated on level ${student.currentLevel} due to time expiration. Target word was: ${word}`
			});
		} else if (guess.length === 1) {
			if (student.currentGuesses.includes(guess)) return serializeDoc({
				student,
				questions: getAssignedQuestionsForStudent(student, await questionsColl.find({ id: { $in: student.assignedQuestions } }).toArray()),
				message: "Letter already guessed"
			});
			student.currentGuesses.push(guess);
			if (!word.includes(guess)) {
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
						details: `Eliminated on level ${student.currentLevel}. Target word was: ${word}`
					});
				}
			}
		} else if (guess === word) word.split("").forEach((c) => {
			if (!student.currentGuesses.includes(c)) student.currentGuesses.push(c);
		});
		else {
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
					details: `Eliminated on level ${student.currentLevel} via incorrect word guess.`
				});
			}
		}
		if (word.split("").every((char) => student.currentGuesses.includes(char)) && (student.status === "Active" || student.status === "Qualified")) {
			const penalty = student.wrongAnswersCount * 15;
			student.score += Math.max(40, 100 - penalty);
			student.levelsCompleted = student.currentLevel;
			if (student.currentLevel >= student.assignedQuestions.length) {
				student.round1Completed = true;
				student.round1Score = student.score;
				student.round1TimeTaken = student.timeTaken;
				student.round1CompletionTime = now.toISOString();
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
					details: `Successfully completed all levels with score: ${student.score}`
				});
			} else {
				student.currentLevel += 1;
				student.currentGuesses = [];
				student.wrongAnswersCount = 0;
				student.levelStartTime = now.toISOString();
			}
		}
		await studentsColl.replaceOne({ email }, student);
		const assignedQ = await questionsColl.find({ id: { $in: student.assignedQuestions } }).toArray();
		clearCachePrefix("leaderboard");
		return serializeDoc({
			student,
			questions: getAssignedQuestionsForStudent(student, assignedQ),
			error: null
		});
	} catch (error) {
		console.error("[SERVER_FN:submitGuess] Error:", error.message);
		return {
			student: null,
			questions: [],
			error: `Submit Guess failed: ${error.message}`
		};
	}
});
var adminGetDashboardData_createServerFn_handler = createServerRpc({
	id: "4ba5652efc09bee95610b6f5e68a89f32c2c6dc5b39579a14e191dcbfb02cc35",
	name: "adminGetDashboardData",
	filename: "src/lib/server-fns.ts"
}, (opts) => adminGetDashboardData.__executeServer(opts));
var adminGetDashboardData = createServerFn({ method: "GET" }).handler(adminGetDashboardData_createServerFn_handler, async () => {
	const { verifyAdminSession, getCached, setCached } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	if (!await verifyAdminSession()) return {
		students: [],
		questions: [],
		securityLogs: [],
		error: "Unauthorized"
	};
	const cacheKey = "admin_dashboard";
	const cached = getCached(cacheKey);
	if (cached) return cached;
	try {
		const db = await getDB();
		const result = serializeDoc({
			students: await db.collection("students").find().toArray(),
			questions: await db.collection("questions").find().toArray(),
			mcqQuestions: await db.collection("mcqQuestions").find().toArray(),
			securityLogs: await db.collection("securityLogs").find().sort({ timestamp: -1 }).limit(200).toArray(),
			error: null
		});
		setCached(cacheKey, result, 5e3);
		return result;
	} catch (error) {
		console.error("[SERVER_FN:adminGetDashboardData] Error:", error.message);
		return {
			students: [],
			questions: [],
			securityLogs: [],
			error: `Admin Fetch failed: ${error.message}`
		};
	}
});
var adminUpdateQuestion_createServerFn_handler = createServerRpc({
	id: "b16b93aa9fd91823a0073bd4ea12c30cc8149bb9cdabfc6b1fae7f8503a4af50",
	name: "adminUpdateQuestion",
	filename: "src/lib/server-fns.ts"
}, (opts) => adminUpdateQuestion.__executeServer(opts));
var adminUpdateQuestion = createServerFn({ method: "POST" }).validator((d) => d).handler(adminUpdateQuestion_createServerFn_handler, async (ctx) => {
	const { verifyAdminSession } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	if (!await verifyAdminSession()) return {
		success: false,
		questions: [],
		error: "Unauthorized"
	};
	const data = ctx?.data;
	if (!data) return {
		success: false,
		questions: [],
		error: "Missing data payload"
	};
	try {
		const questionsColl = (await getDB()).collection("questions");
		const { action, question } = data;
		if (action === "add") {
			const lastQ = await questionsColl.find().sort({ id: -1 }).limit(1).toArray();
			const newQ = {
				id: lastQ.length > 0 ? lastQ[0].id + 1 : 1,
				word: (question.word || "").toUpperCase().trim(),
				category: question.category || "General",
				hint: question.hint || "",
				difficulty: question.difficulty || "medium",
				active: question.active !== false
			};
			await questionsColl.insertOne(newQ);
		} else if (action === "edit") await questionsColl.updateOne({ id: question.id }, { $set: {
			word: (question.word || "").toUpperCase().trim(),
			category: question.category || "General",
			hint: question.hint || "",
			difficulty: question.difficulty || "medium",
			active: question.active !== void 0 ? question.active : true
		} });
		else if (action === "delete") await questionsColl.deleteOne({ id: question.id });
		const { clearCachePrefix } = await import("./server-helpers.server-CEpv9qNZ.mjs");
		clearCachePrefix("active_questions");
		return serializeDoc({
			success: true,
			questions: (await questionsColl.find().toArray()).map((q) => {
				const { _id, ...rest } = q;
				return rest;
			}),
			error: null
		});
	} catch (error) {
		console.error("[SERVER_FN:adminUpdateQuestion] Error:", error.message);
		return {
			success: false,
			questions: [],
			error: `Update Question failed: ${error.message}`
		};
	}
});
var adminUpdateMCQQuestion_createServerFn_handler = createServerRpc({
	id: "e4d1a3a9cb16adc78189a096bb7b5cefab163f94d6223d89fd32f751ef94f4c5",
	name: "adminUpdateMCQQuestion",
	filename: "src/lib/server-fns.ts"
}, (opts) => adminUpdateMCQQuestion.__executeServer(opts));
var adminUpdateMCQQuestion = createServerFn({ method: "POST" }).validator((d) => d).handler(adminUpdateMCQQuestion_createServerFn_handler, async (ctx) => {
	const { verifyAdminSession } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	if (!await verifyAdminSession()) return {
		success: false,
		mcqQuestions: [],
		error: "Unauthorized"
	};
	const data = ctx?.data;
	if (!data) return {
		success: false,
		mcqQuestions: [],
		error: "Missing data payload"
	};
	try {
		const mcqColl = (await getDB()).collection("mcqQuestions");
		const { action, question } = data;
		if (action === "add") {
			const newQ = {
				id: crypto.randomUUID(),
				category: question.category || "General",
				text: question.text || "",
				options: question.options || [
					"A",
					"B",
					"C",
					"D"
				],
				correctAnswer: question.correctAnswer || 0,
				active: question.active !== false
			};
			await mcqColl.insertOne(newQ);
		} else if (action === "edit") await mcqColl.updateOne({ id: question.id }, { $set: {
			category: question.category || "General",
			text: question.text || "",
			options: question.options || [
				"A",
				"B",
				"C",
				"D"
			],
			correctAnswer: question.correctAnswer !== void 0 ? question.correctAnswer : 0,
			active: question.active !== void 0 ? question.active : true
		} });
		else if (action === "delete") await mcqColl.deleteOne({ id: question.id });
		const { clearCachePrefix } = await import("./server-helpers.server-CEpv9qNZ.mjs");
		clearCachePrefix("admin_dashboard");
		return serializeDoc({
			success: true,
			mcqQuestions: (await mcqColl.find().toArray()).map((q) => {
				const { _id, ...rest } = q;
				return rest;
			}),
			error: null
		});
	} catch (error) {
		console.error("[SERVER_FN:adminUpdateMCQQuestion] Error:", error.message);
		return {
			success: false,
			mcqQuestions: [],
			error: `Update MCQ failed: ${error.message}`
		};
	}
});
var adminBulkUploadQuestions_createServerFn_handler = createServerRpc({
	id: "265e4ae78b330cc9eddd22b6493af1e67c09e859d98e27856b719c560e1e90d8",
	name: "adminBulkUploadQuestions",
	filename: "src/lib/server-fns.ts"
}, (opts) => adminBulkUploadQuestions.__executeServer(opts));
var adminBulkUploadQuestions = createServerFn({ method: "POST" }).validator((d) => d).handler(adminBulkUploadQuestions_createServerFn_handler, async (ctx) => {
	const { verifyAdminSession } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	if (!await verifyAdminSession()) return {
		success: false,
		questions: [],
		error: "Unauthorized"
	};
	const data = ctx?.data;
	if (!data || !Array.isArray(data)) return {
		success: false,
		questions: [],
		error: "Invalid data payload"
	};
	try {
		const questionsColl = (await getDB()).collection("questions");
		const lastQ = await questionsColl.find().sort({ id: -1 }).limit(1).toArray();
		let nextId = lastQ.length > 0 ? lastQ[0].id + 1 : 1;
		const newDocs = data.map((q) => ({
			id: nextId++,
			word: q.word.toUpperCase().trim(),
			category: q.category || "General",
			hint: q.hint || "",
			difficulty: q.difficulty || "medium",
			active: q.active !== false
		}));
		if (newDocs.length > 0) await questionsColl.insertMany(newDocs);
		const { clearCachePrefix } = await import("./server-helpers.server-CEpv9qNZ.mjs");
		clearCachePrefix("active_questions");
		return serializeDoc({
			success: true,
			questions: (await questionsColl.find().toArray()).map((q) => {
				const { _id, ...rest } = q;
				return rest;
			}),
			error: null
		});
	} catch (error) {
		console.error("[SERVER_FN:adminBulkUploadQuestions] Error:", error.message);
		return {
			success: false,
			questions: [],
			error: `Bulk upload failed: ${error.message}`
		};
	}
});
var adminUpdateStudentLock_createServerFn_handler = createServerRpc({
	id: "16def2c88d821231df73a84aca3363bae17a490edee4f3fd2d69608d8839dee4",
	name: "adminUpdateStudentLock",
	filename: "src/lib/server-fns.ts"
}, (opts) => adminUpdateStudentLock.__executeServer(opts));
var adminUpdateStudentLock = createServerFn({ method: "POST" }).validator((d) => d).handler(adminUpdateStudentLock_createServerFn_handler, async (ctx) => {
	const { verifyAdminSession, clearCachePrefix } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	if (!await verifyAdminSession()) return {
		success: false,
		students: [],
		error: "Unauthorized"
	};
	const data = ctx?.data;
	if (!data) return {
		success: false,
		students: [],
		error: "Missing data payload"
	};
	try {
		const db = await getDB();
		const studentsColl = db.collection("students");
		const logsColl = db.collection("securityLogs");
		const email = data.email.toLowerCase().trim();
		if (await studentsColl.findOne({ email })) {
			const updateFields = { locked: data.locked };
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
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				email: data.email,
				action: data.locked ? "ADMIN_LOCK_ACCOUNT" : "ADMIN_UNLOCK_ACCOUNT",
				status: "success",
				details: `Admin changed account lock status to ${data.locked}`
			});
		}
		clearCachePrefix("leaderboard");
		clearCachePrefix("admin_dashboard");
		return serializeDoc({
			success: true,
			students: await studentsColl.find().toArray(),
			error: null
		});
	} catch (error) {
		console.error("[SERVER_FN:adminUpdateStudentLock] Error:", error.message);
		return {
			success: false,
			students: [],
			error: `Update Student Lock failed: ${error.message}`
		};
	}
});
var getLeaderboardData_createServerFn_handler = createServerRpc({
	id: "78ae18d99fdefeac7d451c660b78fceeda53d6de8d9b11c2d8ebf12d5db4fed7",
	name: "getLeaderboardData",
	filename: "src/lib/server-fns.ts"
}, (opts) => getLeaderboardData.__executeServer(opts));
var getLeaderboardData = createServerFn({ method: "GET" }).validator((d) => d).handler(getLeaderboardData_createServerFn_handler, async (ctx) => {
	const { checkRateLimit, getCached, setCached } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	const data = ctx?.data || {};
	const page = Math.max(1, parseInt(data.page || "1", 10));
	const limit = Math.max(1, Math.min(100, parseInt(data.limit || "20", 10)));
	const skip = (page - 1) * limit;
	if (!checkRateLimit(`leaderboard_access`, 120, 6e4)) return {
		success: false,
		error: "Rate limit exceeded. Please wait a moment."
	};
	const cacheKey = `leaderboard:${page}:${limit}`;
	const cached = getCached(cacheKey);
	if (cached) return cached;
	try {
		const studentsColl = (await getDB()).collection("students");
		const total = await studentsColl.countDocuments();
		const result = {
			success: true,
			students: serializeDoc(await studentsColl.find({}, { projection: {
				name: 1,
				department: 1,
				score: 1,
				completionTime: 1,
				timeTaken: 1,
				status: 1,
				levelsCompleted: 1
			} }).sort({
				score: -1,
				completionTime: 1,
				lastActiveTime: 1
			}).skip(skip).limit(limit).toArray()),
			total,
			page,
			limit
		};
		setCached(cacheKey, result, 5e3);
		return result;
	} catch (e) {
		console.error("[SERVER_FN:getLeaderboardData] Error:", e);
		return {
			success: false,
			error: "Failed to fetch standings"
		};
	}
});
function getAssignedQuestionsForStudent(student, allQuestions) {
	return student.assignedQuestions.map((id) => {
		const q = allQuestions.find((item) => item.id === id);
		if (q) {
			const { _id, ...rest } = q;
			return rest;
		}
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
var getSystemConfigData_createServerFn_handler = createServerRpc({
	id: "e5d63187c666fdcd91f1831510c716c75eb5dc3b0adfec35a024be49bc9a7710",
	name: "getSystemConfigData",
	filename: "src/lib/server-fns.ts"
}, (opts) => getSystemConfigData.__executeServer(opts));
var getSystemConfigData = createServerFn({ method: "GET" }).handler(getSystemConfigData_createServerFn_handler, async () => {
	const { getSystemConfig } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	return serializeDoc(await getSystemConfig());
});
var adminUpdateSystemConfig_createServerFn_handler = createServerRpc({
	id: "e35514a5f0cd8a750abdacb1026db86dda8f6e1125e38782576b482e5bf7c97f",
	name: "adminUpdateSystemConfig",
	filename: "src/lib/server-fns.ts"
}, (opts) => adminUpdateSystemConfig.__executeServer(opts));
var adminUpdateSystemConfig = createServerFn({ method: "POST" }).validator((d) => d).handler(adminUpdateSystemConfig_createServerFn_handler, async (ctx) => {
	const { verifyAdminSession } = await import("./server-helpers.server-CEpv9qNZ.mjs");
	if (!await verifyAdminSession()) return {
		success: false,
		error: "Unauthorized"
	};
	const data = ctx?.data;
	if (!data) return {
		success: false,
		error: "Missing config data"
	};
	try {
		await (await getDB()).collection("systemConfig").updateOne({ id: "global" }, { $set: {
			sessionTimeout: Math.max(10, parseInt(data.sessionTimeout, 10) || 45),
			maxWrongAttempts: Math.max(1, parseInt(data.maxWrongAttempts, 10) || 4),
			mode: data.mode || "workshop",
			round1PassingScore: Math.max(0, parseInt(data.round1PassingScore, 10) || 60),
			round2PassingScore: Math.max(0, parseInt(data.round2PassingScore, 10) || 60),
			round1TimeLimit: Math.max(0, parseInt(data.round1TimeLimit, 10) || 300),
			round2TimeLimit: Math.max(0, parseInt(data.round2TimeLimit, 10) || 600)
		} }, { upsert: true });
		const { clearCachePrefix } = await import("./server-helpers.server-CEpv9qNZ.mjs");
		clearCachePrefix("system_config");
		return { success: true };
	} catch (e) {
		console.error("[adminUpdateSystemConfig] Error:", e);
		return {
			success: false,
			error: e.message
		};
	}
});
//#endregion
export { adminAuthenticate_createServerFn_handler, adminBulkUploadQuestions_createServerFn_handler, adminCheckSession_createServerFn_handler, adminGetDashboardData_createServerFn_handler, adminLogout_createServerFn_handler, adminUpdateMCQQuestion_createServerFn_handler, adminUpdateQuestion_createServerFn_handler, adminUpdateStudentLock_createServerFn_handler, adminUpdateSystemConfig_createServerFn_handler, getLeaderboardData_createServerFn_handler, getSystemConfigData_createServerFn_handler, registerOrResumeStudent_createServerFn_handler, submitGuess_createServerFn_handler, submitMCQResults_createServerFn_handler };
