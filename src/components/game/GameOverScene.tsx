import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [phase, setPhase] = useState<"guardian" | "note" | "details">("guardian");

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("Account Terminated. You have been eliminated from the Shadow Realm.", "wrong");
      hasSpoken.current = true;
    }
  }, [speak]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("note"), 2000);
    const t2 = setTimeout(() => setPhase("details"), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const wrongLetter = student.currentGuesses[student.currentGuesses.length - 1] || "N/A";
  const accuracyRate =
    student.attempts > 0
      ? Math.round(((student.levelsCompleted || 1) / (student.attempts || 1)) * 100)
      : 0;

  return (
    <SceneWrap>
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(239,68,68,0.15),transparent_60%)]" />

      <div className="w-full max-w-lg mx-auto space-y-5">
        {/* Guardian silhouette + death note sequence */}
        <AnimatePresence mode="wait">
          {phase === "guardian" && (
            <motion.div
              key="guardian"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col items-center"
            >
              {/* Red flash effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute inset-0 bg-red-600/20 pointer-events-none rounded-2xl"
              />

              {/* Guardian figure */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                className="relative"
              >
                {/* menacing glow */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 40px rgba(239,68,68,0.4)",
                      "0 0 80px rgba(239,68,68,0.7)",
                      "0 0 40px rgba(239,68,68,0.4)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-2 border-red-500/60 bg-gradient-to-b from-red-900/40 to-black/80 flex items-center justify-center"
                >
                  {/* Guardian face/figure placeholder */}
                  <span className="text-5xl sm:text-6xl font-serif text-red-400/80 select-none">
                    G
                  </span>
                </motion.div>

                {/* Scanning red beam */}
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent pointer-events-none"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 font-mono text-xs text-red-400/70 tracking-[0.3em] uppercase text-center"
              >
                The Guardian has passed judgment...
              </motion.p>
            </motion.div>
          )}

          {phase === "note" && (
            <motion.div
              key="note"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="relative mx-auto max-w-sm"
            >
              {/* Death note paper */}
              <div className="relative bg-[#0a0b0e]/90 backdrop-blur-[24px] border border-red-500/40 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-[0_30px_80px_rgba(239,68,68,0.25)] text-center">
                {/* Red stamp effect */}
                <motion.div
                  initial={{ scale: 3, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 border-2 border-red-500 rounded px-2 py-0.5 pointer-events-none"
                >
                  <span className="font-mono text-[10px] sm:text-xs text-red-500 font-black tracking-widest uppercase">
                    TERMINATED
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-mono text-[9px] text-red-400/60 tracking-[0.4em] uppercase mb-2">
                    Official Death Note
                  </p>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-3" />

                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-red-500 font-black uppercase tracking-wider">
                    YOU HAVE BEEN
                  </h2>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-red-500 font-black uppercase tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.85)]">
                    ELIMINATED
                  </h2>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-3" />

                  <p className="text-zinc-100 text-xs sm:text-sm leading-relaxed font-bold px-2">
                    Your account has been locked. The Guardian has deemed you unworthy of proceeding.
                    No second chances or resets are permitted.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Details panel - fades in after note */}
        {phase === "details" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {/* Diagnostic log */}
            <div className="bg-[#121319]/80 backdrop-blur-md border border-red-500/35 rounded-xl sm:rounded-2xl p-4 sm:p-5 font-mono text-left w-full space-y-3 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]">
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full">
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
          </motion.div>
        )}
      </div>
    </SceneWrap>
  );
}
