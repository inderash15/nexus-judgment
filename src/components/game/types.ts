import { DBStudent, DBQuestion } from "@/lib/db";

export type Scene =
  | "boot"
  | "cinematic"
  | "intro"
  | "register"
  | "briefing"
  | "chamber"
  | "verdict"
  | "final"
  | "gameover";

export type SpeakFn = (text: string, emotion?: string) => void;

export interface SceneProps {
  speak: SpeakFn;
  isSpeaking: boolean;
}

export interface SceneWrapProps {
  children: React.ReactNode;
}
