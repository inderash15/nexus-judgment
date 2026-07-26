import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { InlineLeaderboard } from "./InlineLeaderboard";
import { DBStudent } from "@/lib/db";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";

export function FinalScene({
  student,
  speak,
  isSpeaking,
  onRestart,
  onReturnHome,
}: {
  student: DBStudent;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
  onRestart: () => void;
  onReturnHome: () => void;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(
        `You have finished all chambers. Your final score is ${student.score}. Your attempt is locked.`,
        "final",
      );
      hasSpoken.current = true;
    }
  }, [speak, student.score]);

  return (
    <SceneWrap>
      <div className="w-full max-w-lg bg-black/75 border border-emerald-950/40 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6 text-left shadow-[0_20px_50px_rgba(16,185,129,0.15)] animate-in fade-in duration-500">
        <div className="font-mono text-xs text-emerald-400 font-extrabold uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
          Trial Complete
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-emerald-100 font-bold uppercase drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
          Judgment Rendered
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed">
          Your credentials and final score have been submitted and locked to the system database.
          Retesting or resetting questions is disabled.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full pt-2 font-mono">
          <div className="bg-black/70 border border-emerald-500/25 rounded-xl p-3">
            <div className="text-[9px] uppercase tracking-wider text-emerald-400/60">
              Total Score
            </div>
            <div className="text-lg font-black text-emerald-100">{student.score}</div>
          </div>
          <div className="bg-black/70 border border-emerald-500/25 rounded-xl p-3">
            <div className="text-[9px] uppercase tracking-wider text-emerald-400/60">
              Time Elapsed
            </div>
            <div className="text-sm font-black text-emerald-100 mt-1">
              {Math.floor(student.timeTaken / 60)}m {student.timeTaken % 60}s
            </div>
          </div>
          <div className="bg-black/70 border border-emerald-500/25 rounded-xl p-3">
            <div className="text-[9px] uppercase tracking-wider text-emerald-400/60">Status</div>
            <div className="text-xs font-black text-emerald-300 mt-1.5 uppercase">
              {student.status}
            </div>
          </div>
        </div>

        <InlineLeaderboard currentEmail={student.email} />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full">
          <button
            onClick={onRestart}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            New Trial
          </button>
          <button
            onClick={onReturnHome}
            className="flex-1 py-3 border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Exit Terminal
          </button>
        </div>
      </div>
    </SceneWrap>
  );
}
