import { DBStudent, DBQuestion, SecurityLog } from "@/lib/db";

export type Tab =
  "overview" | "students" | "live" | "questions" | "leaderboard" | "audit" | "settings";

export type DataState = {
  students: DBStudent[];
  questions: DBQuestion[];
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
