import { t as require_lib } from "../_libs/mongodb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-Dy0-QO7S.js
var import_lib = require_lib();
var DEFAULT_QUESTIONS = [
	{
		id: 1,
		word: "TRANSFORMER",
		category: "Artificial Intelligence",
		hint: "The sequence-to-sequence architecture that uses self-attention mechanisms and powers modern LLMs.",
		difficulty: "hard",
		active: true
	},
	{
		id: 2,
		word: "PYTHON",
		category: "Programming",
		hint: "An interpreted, high-level programming language known for its readability and massive ecosystem in AI/ML.",
		difficulty: "easy",
		active: true
	},
	{
		id: 3,
		word: "VECTOR",
		category: "Data Science",
		hint: "A multi-dimensional representation of data or words in a continuous embedding space.",
		difficulty: "medium",
		active: true
	},
	{
		id: 4,
		word: "ALGORITHM",
		category: "Algorithms",
		hint: "A step-by-step procedure or set of rules defined to solve a specific problem.",
		difficulty: "easy",
		active: true
	},
	{
		id: 5,
		word: "RECURSION",
		category: "Programming",
		hint: "A programming technique where a function calls itself directly or indirectly to solve a problem.",
		difficulty: "medium",
		active: true
	},
	{
		id: 6,
		word: "DATABASE",
		category: "Advanced Technical Concepts",
		hint: "An organized collection of structured information or data, typically stored electronically.",
		difficulty: "easy",
		active: true
	},
	{
		id: 7,
		word: "TENSORFLOW",
		category: "Machine Learning",
		hint: "An open-source library developed by Google for deep learning and neural network computations.",
		difficulty: "medium",
		active: true
	},
	{
		id: 8,
		word: "ENCODER",
		category: "Artificial Intelligence",
		hint: "A model component that processes input sequence data and compresses it into a context vector.",
		difficulty: "medium",
		active: true
	},
	{
		id: 9,
		word: "TOKENIZATION",
		category: "Generative AI",
		hint: "The process of converting raw text into smaller chunks or numerical IDs for language models.",
		difficulty: "medium",
		active: true
	},
	{
		id: 10,
		word: "OPTIMIZATION",
		category: "Mathematics",
		hint: "The act of making a system, design, or decision as fully perfect, functional, or effective as possible.",
		difficulty: "hard",
		active: true
	},
	{
		id: 11,
		word: "NEURAL",
		category: "Machine Learning",
		hint: "Relating to a web of artificial nodes designed to simulate human brain biological processes.",
		difficulty: "easy",
		active: true
	},
	{
		id: 12,
		word: "HEURISTIC",
		category: "Problem Solving",
		hint: "A practical approach to problem-solving that is not guaranteed to be optimal but is sufficient for immediate goals.",
		difficulty: "hard",
		active: true
	},
	{
		id: 13,
		word: "CRYPTOGRAPHY",
		category: "Cyber Security",
		hint: "The practice and study of techniques for secure communication in the presence of third parties.",
		difficulty: "hard",
		active: true
	},
	{
		id: 14,
		word: "PHISHING",
		category: "Cyber Security",
		hint: "A fraudulent attempt to obtain sensitive information by masquerading as a trustworthy entity.",
		difficulty: "easy",
		active: true
	},
	{
		id: 15,
		word: "REINFORCEMENT",
		category: "Machine Learning",
		hint: "A type of machine learning where an agent learns to make decisions by performing actions and receiving rewards.",
		difficulty: "hard",
		active: true
	},
	{
		id: 16,
		word: "SUPERVISED",
		category: "Machine Learning",
		hint: "Learning a model from labeled training data containing both inputs and correct outputs.",
		difficulty: "easy",
		active: true
	},
	{
		id: 17,
		word: "DEADLOCK",
		category: "Operating Systems",
		hint: "A state in which two or more processes are blocked, each waiting for the other to release a resource.",
		difficulty: "medium",
		active: true
	},
	{
		id: 18,
		word: "PROTOCOL",
		category: "Networking",
		hint: "A system of digital rules that govern how data is exchanged within or between computers.",
		difficulty: "easy",
		active: true
	},
	{
		id: 19,
		word: "PROMPT",
		category: "Generative AI",
		hint: "An input instruction provided to a generative AI model to guide its output response.",
		difficulty: "easy",
		active: true
	},
	{
		id: 20,
		word: "AGENT",
		category: "AI Agents",
		hint: "An autonomous entity that perceives its environment through sensors and acts upon it using actuators.",
		difficulty: "medium",
		active: true
	},
	{
		id: 21,
		word: "OVERFITTING",
		category: "Data Science",
		hint: "When a model learns the training data too well, failing to generalize to unseen test data.",
		difficulty: "medium",
		active: true
	},
	{
		id: 22,
		word: "GRADIENT",
		category: "Mathematics",
		hint: "A vector representing the direction and rate of fastest increase of a multi-variable function.",
		difficulty: "hard",
		active: true
	},
	{
		id: 23,
		word: "RECURSIVE",
		category: "Algorithms",
		hint: "Relating to a method that calls itself, requiring a base case to prevent infinite loops.",
		difficulty: "medium",
		active: true
	},
	{
		id: 24,
		word: "SEMANTIC",
		category: "RAG Systems",
		hint: "Relating to meaning in language or data, crucial for vector similarity searches in RAG.",
		difficulty: "medium",
		active: true
	},
	{
		id: 25,
		word: "FIREWALL",
		category: "Cyber Security",
		hint: "A network security system that monitors and controls incoming and outgoing network traffic.",
		difficulty: "easy",
		active: true
	},
	{
		id: 26,
		word: "REGRESSION",
		category: "Data Science",
		hint: "A statistical method used to model the relationship between a dependent variable and one or more independent variables.",
		difficulty: "easy",
		active: true
	},
	{
		id: 27,
		word: "BANDWIDTH",
		category: "Networking",
		hint: "The maximum rate of data transfer across a given path or network connection.",
		difficulty: "easy",
		active: true
	},
	{
		id: 28,
		word: "BACKPROPAGATION",
		category: "Machine Learning",
		hint: "The primary algorithm used to train neural networks by calculating the gradient of the loss function.",
		difficulty: "hard",
		active: true
	},
	{
		id: 29,
		word: "PARALLELISM",
		category: "Operating Systems",
		hint: "The simultaneous execution of multiple computing tasks, threads, or instructions.",
		difficulty: "medium",
		active: true
	},
	{
		id: 30,
		word: "APTITUDE",
		category: "Aptitude",
		hint: "A natural ability or suitability to perform a certain type of work or task efficiently.",
		difficulty: "easy",
		active: true
	}
];
var MONGODB_URI = process.env.MONGODB_URI;
var MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "nexus_judgment";
var globalWithMongo = globalThis;
async function initializeDB(client) {
	const dbInstance = client.db(MONGODB_DB_NAME);
	const questionsColl = dbInstance.collection("questions");
	if (await questionsColl.countDocuments() === 0) await questionsColl.insertMany(DEFAULT_QUESTIONS);
	const mcqColl = dbInstance.collection("mcqQuestions");
	const mcqCount = await mcqColl.countDocuments();
	if (mcqCount < 10) {
		if (mcqCount > 0) await mcqColl.deleteMany({});
		const { EXTENDED_MCQ_QUESTIONS } = await import("./mcq-data-0loSUswX.mjs");
		await mcqColl.insertMany(EXTENDED_MCQ_QUESTIONS);
	}
	const configColl = dbInstance.collection("systemConfig");
	if (await configColl.countDocuments() === 0) await configColl.insertOne({
		id: "global",
		sessionTimeout: 45,
		maxWrongAttempts: 4,
		mode: "workshop",
		round1PassingScore: 60,
		round2PassingScore: 60,
		round1TimeLimit: 300,
		round2TimeLimit: 600
	});
	try {
		const studentsColl = dbInstance.collection("students");
		const securityLogsColl = dbInstance.collection("securityLogs");
		const adminSessionsColl = dbInstance.collection("adminSessions");
		const studentSessionsColl = dbInstance.collection("studentSessions");
		await studentsColl.createIndex({ email: 1 }, { unique: true });
		await studentsColl.createIndex({
			score: -1,
			completionTime: 1
		});
		await questionsColl.createIndex({ id: 1 }, { unique: true });
		await securityLogsColl.createIndex({
			email: 1,
			timestamp: -1
		});
		await securityLogsColl.createIndex({ timestamp: -1 });
		await adminSessionsColl.createIndex({ token: 1 });
		await adminSessionsColl.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
		await studentSessionsColl.createIndex({ token: 1 });
		await studentSessionsColl.createIndex({ email: 1 });
		await studentSessionsColl.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
		console.log("[DB] Performance indexes verified successfully.");
	} catch (e) {
		console.warn("[DB] Index creation skipped or failed:", e);
	}
	return dbInstance;
}
async function getDB() {
	if (globalWithMongo._mongoDbInstance) return globalWithMongo._mongoDbInstance;
	if (!MONGODB_URI) throw new Error("MONGODB_URI environment variable is not set. Please configure it in your deployment settings.");
	if (!globalWithMongo._mongoInitPromise) globalWithMongo._mongoInitPromise = (async () => {
		try {
			if (!globalWithMongo._mongoClient) {
				globalWithMongo._mongoClient = new import_lib.MongoClient(MONGODB_URI, {
					maxPoolSize: 100,
					minPoolSize: 10,
					maxIdleTimeMS: 3e4,
					connectTimeoutMS: 3e4,
					socketTimeoutMS: 3e4
				});
				await globalWithMongo._mongoClient.connect();
			}
			const dbInstance = await initializeDB(globalWithMongo._mongoClient);
			globalWithMongo._mongoDbInstance = dbInstance;
			return dbInstance;
		} catch (e) {
			globalWithMongo._mongoInitPromise = void 0;
			globalWithMongo._mongoClient = void 0;
			throw e;
		}
	})();
	return globalWithMongo._mongoInitPromise;
}
//#endregion
export { getDB as t };
