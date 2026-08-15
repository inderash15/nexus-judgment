import { DBStudent, DBQuestion, SecurityLog, DBMCQQuestion } from "@/lib/db";

export type Tab = "overview" | "students" | "live" | "questions" | "mcq" | "leaderboard" | "audit" | "settings" | "analytics" | "risk";

export type DataState = {
  students: DBStudent[];
  questions: DBQuestion[];
  mcqQuestions: DBMCQQuestion[];
  securityLogs: SecurityLog[];
};

export type Metrics = {
  totalReg: number;
  active: number;
  eliminated: number;
  qualified: number;
  avgScore: number;
  successRate: number;
  failureRate: number;
  liveCount: number;
  topPerformers: DBStudent[];
};
