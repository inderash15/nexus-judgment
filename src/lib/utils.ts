import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { DBStudent } from "./db";

export function getCandidateScore(student: DBStudent): number {
  if (student.finalScore !== undefined) {
    return Number(student.finalScore.toFixed(2));
  }
  if (student.totalScore !== undefined) {
    return Number(student.totalScore.toFixed(2));
  }
  const total = (student.mcqScore || 0) + (student.promptScore || 0) + (student.fillupScore || 0);
  return Number(total.toFixed(2));
}
