import { MongoClient, Db } from "mongodb";
// Override local DNS resolution to resolve MongoDB Atlas SRV records successfully in Node environments
if (typeof window === "undefined") {
  import("dns").then((dnsModule) => {
    try {
      dnsModule.setServers(["8.8.8.8", "1.1.1.1"]);
      console.log("[DB] Custom DNS servers set successfully.");
    } catch (e) {
      console.warn("[DB] Could not set custom DNS servers", e);
    }
  }).catch((err) => {
    console.warn("[DB] dns module not available in this runtime environment.", err.message);
  });
}

// Define Types
export type DBQuestion = {
  id: number;
  word: string;
  category: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
  active: boolean;
};

export type StudentStatus = "Active" | "Selected" | "Qualified" | "Eliminated" | "Disqualified" | "Completed";

export type DBStudent = {
  email: string;
  name: string;
  department: string;
  score: number;
  levelsCompleted: number;
  status: StudentStatus;
  timeTaken: number; // in seconds
  completionTime: string | null;
  loginTime: string;
  attempts: number;
  wrongAnswersCount: number; // lives lost (max 4, 4th is elimination)
  eliminationDetails: string | null;
  locked: boolean;
  currentLevel: number; // 1-based, starts at 1, max is 7
  assignedQuestions: number[]; // Array of question IDs
  currentGuesses: string[]; // guessed characters
  levelStartTime: string;
  lastActiveTime: string;
};

export type SecurityLog = {
  id: string;
  timestamp: string;
  email: string;
  action: string;
  status: "success" | "failed" | "suspicious";
  details: string;
};

const DEFAULT_QUESTIONS: DBQuestion[] = [
  { id: 1, word: "TRANSFORMER", category: "Artificial Intelligence", hint: "The sequence-to-sequence architecture that uses self-attention mechanisms and powers modern LLMs.", difficulty: "hard", active: true },
  { id: 2, word: "PYTHON", category: "Programming", hint: "An interpreted, high-level programming language known for its readability and massive ecosystem in AI/ML.", difficulty: "easy", active: true },
  { id: 3, word: "VECTOR", category: "Data Science", hint: "A multi-dimensional representation of data or words in a continuous embedding space.", difficulty: "medium", active: true },
  { id: 4, word: "ALGORITHM", category: "Algorithms", hint: "A step-by-step procedure or set of rules defined to solve a specific problem.", difficulty: "easy", active: true },
  { id: 5, word: "RECURSION", category: "Programming", hint: "A programming technique where a function calls itself directly or indirectly to solve a problem.", difficulty: "medium", active: true },
  { id: 6, word: "DATABASE", category: "Advanced Technical Concepts", hint: "An organized collection of structured information or data, typically stored electronically.", difficulty: "easy", active: true },
  { id: 7, word: "TENSORFLOW", category: "Machine Learning", hint: "An open-source library developed by Google for deep learning and neural network computations.", difficulty: "medium", active: true },
  { id: 8, word: "ENCODER", category: "Artificial Intelligence", hint: "A model component that processes input sequence data and compresses it into a context vector.", difficulty: "medium", active: true },
  { id: 9, word: "TOKENIZATION", category: "Generative AI", hint: "The process of converting raw text into smaller chunks or numerical IDs for language models.", difficulty: "medium", active: true },
  { id: 10, word: "OPTIMIZATION", category: "Mathematics", hint: "The act of making a system, design, or decision as fully perfect, functional, or effective as possible.", difficulty: "hard", active: true },
  { id: 11, word: "NEURAL", category: "Machine Learning", hint: "Relating to a web of artificial nodes designed to simulate human brain biological processes.", difficulty: "easy", active: true },
  { id: 12, word: "HEURISTIC", category: "Problem Solving", hint: "A practical approach to problem-solving that is not guaranteed to be optimal but is sufficient for immediate goals.", difficulty: "hard", active: true },
  { id: 13, word: "CRYPTOGRAPHY", category: "Cyber Security", hint: "The practice and study of techniques for secure communication in the presence of third parties.", difficulty: "hard", active: true },
  { id: 14, word: "PHISHING", category: "Cyber Security", hint: "A fraudulent attempt to obtain sensitive information by masquerading as a trustworthy entity.", difficulty: "easy", active: true },
  { id: 15, word: "REINFORCEMENT", category: "Machine Learning", hint: "A type of machine learning where an agent learns to make decisions by performing actions and receiving rewards.", difficulty: "hard", active: true },
  { id: 16, word: "SUPERVISED", category: "Machine Learning", hint: "Learning a model from labeled training data containing both inputs and correct outputs.", difficulty: "easy", active: true },
  { id: 17, word: "DEADLOCK", category: "Operating Systems", hint: "A state in which two or more processes are blocked, each waiting for the other to release a resource.", difficulty: "medium", active: true },
  { id: 18, word: "PROTOCOL", category: "Networking", hint: "A system of digital rules that govern how data is exchanged within or between computers.", difficulty: "easy", active: true },
  { id: 19, word: "PROMPT", category: "Generative AI", hint: "An input instruction provided to a generative AI model to guide its output response.", difficulty: "easy", active: true },
  { id: 20, word: "AGENT", category: "AI Agents", hint: "An autonomous entity that perceives its environment through sensors and acts upon it using actuators.", difficulty: "medium", active: true },
  { id: 21, word: "OVERFITTING", category: "Data Science", hint: "When a model learns the training data too well, failing to generalize to unseen test data.", difficulty: "medium", active: true },
  { id: 22, word: "GRADIENT", category: "Mathematics", hint: "A vector representing the direction and rate of fastest increase of a multi-variable function.", difficulty: "hard", active: true },
  { id: 23, word: "RECURSIVE", category: "Algorithms", hint: "Relating to a method that calls itself, requiring a base case to prevent infinite loops.", difficulty: "medium", active: true },
  { id: 24, word: "SEMANTIC", category: "RAG Systems", hint: "Relating to meaning in language or data, crucial for vector similarity searches in RAG.", difficulty: "medium", active: true },
  { id: 25, word: "FIREWALL", category: "Cyber Security", hint: "A network security system that monitors and controls incoming and outgoing network traffic.", difficulty: "easy", active: true },
  { id: 26, word: "REGRESSION", category: "Data Science", hint: "A statistical method used to model the relationship between a dependent variable and one or more independent variables.", difficulty: "easy", active: true },
  { id: 27, word: "BANDWIDTH", category: "Networking", hint: "The maximum rate of data transfer across a given path or network connection.", difficulty: "easy", active: true },
  { id: 28, word: "BACKPROPAGATION", category: "Machine Learning", hint: "The primary algorithm used to train neural networks by calculating the gradient of the loss function.", difficulty: "hard", active: true },
  { id: 29, word: "PARALLELISM", category: "Operating Systems", hint: "The simultaneous execution of multiple computing tasks, threads, or instructions.", difficulty: "medium", active: true },
  { id: 30, word: "APTITUDE", category: "Aptitude", hint: "A natural ability or suitability to perform a certain type of work or task efficiently.", difficulty: "easy", active: true }
];

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://inderashaiworkspace_db_user:fPZJ6C3DeezVr4n4@cluster0.fw4opds.mongodb.net";
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "nexus_judgment";

let client: MongoClient | null = null;
let dbInstance: Db | null = null;

export async function getDB(): Promise<Db> {
  if (dbInstance) return dbInstance;
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  dbInstance = client.db(MONGODB_DB_NAME);

  // Seed default questions if empty
  const questionsColl = dbInstance.collection("questions");
  const count = await questionsColl.countDocuments();
  if (count === 0) {
    await questionsColl.insertMany(DEFAULT_QUESTIONS);
  }

  return dbInstance;
}
