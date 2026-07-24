import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { InlineLeaderboard } from "./InlineLeaderboard";
import { DBStudent } from "@/lib/db";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";
import { AlertOctagon, XCircle, Award, Zap, Clock, Percent, Heart } from "lucide-react";

export function GameOverScene({
  student,
  speak,
  isSpeaking,
  onTryAgain,
  onReturnHome,
}: {
  student: DBStudent;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
  onTryAgain: () => void;
  onReturnHome: () => void;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("Account Terminated. You have been eliminated from the Shadow Realm.", "wrong");
      hasSpoken.current = true;
    }
  }, [speak]);

  // Formulate metrics for the premium glass log
  const wrongLetter = student.currentGuesses[student.currentGuesses.length - 1] || "N/A";
  const accuracyRate =
    student.attempts > 0
      ? Math.round(((student.levelsCompleted || 1) / (student.attempts || 1)) * 100)
      : 0;

  return (
    <SceneWrap>
      {/* Background backing glow for the info panel to make it pop */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_20%_40%,rgba(239,68,68,0.12),transparent_50%)]" />

      <div className="w-full max-w-lg bg-[#0a0b0e]/90 backdrop-blur-[24px] border border-red-500/40 p-8 rounded-[24px] space-y-7 text-left shadow-[0_30px_80px_rgba(239,68,68,0.25)] shadow-[inset_0_0_30px_rgba(239,68,68,0.08)] animate-in fade-in duration-500">
        <div className="font-mono text-xs text-red-400 font-black uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
          disqualified
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-red-500 font-black uppercase tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.85)] animate-pulse">
          YOU HAVE BEEN ELIMINATED
        </h2>
        <p className="text-zinc-100 text-sm leading-relaxed font-bold">
          Your account has been locked. The Guardian has deemed you unworthy of proceeding. No
          second chances or resets are permitted.
        </p>

        {/* Premium Glass Panel Log */}
        <div className="bg-[#121319]/80 backdrop-blur-md border border-red-500/35 rounded-2xl p-5 font-mono text-left w-full space-y-3.5 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]">
          <div className="text-xs text-red-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5 border-b border-red-900/30 pb-2">
            <AlertOctagon className="w-4 h-4 text-red-400 animate-pulse" />
            <span>Elimination Diagnostic Log</span>
          </div>

          <div className="grid grid-cols-2 gap-y-3.5 gap-x-5 text-[11px] text-zinc-200 font-bold leading-relaxed">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                Wrong Guess:{" "}
                <strong className="text-red-300 font-black uppercase">{wrongLetter}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                Failed Level:{" "}
                <strong className="text-red-300 font-black">{student.currentLevel} / 7</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                XP Earned: <strong className="text-red-300 font-black">{student.score} XP</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                Total Time:{" "}
                <strong className="text-red-300 font-black">
                  {Math.floor(student.timeTaken / 60)}m {student.timeTaken % 60}s
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                Accuracy: <strong className="text-red-300 font-black">{accuracyRate}%</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
              <span>
                Remaining Lives: <strong className="text-red-300 font-black">0 / 4</strong>
              </span>
            </div>
          </div>
        </div>

        <InlineLeaderboard currentEmail={student.email} />

        <div className="flex gap-4 pt-2 w-full">
          <button
            onClick={onTryAgain}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={onReturnHome}
            className="flex-1 py-3 border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Return Home
          </button>
        </div>
      </div>
    </SceneWrap>
  );
}
