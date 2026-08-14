import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { InlineLeaderboard } from "./InlineLeaderboard";
import { DBStudent } from "@/lib/db";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";
import { CheckCircle2, XCircle, Award, Percent, Cpu, ScrollText } from "lucide-react";

export interface McqResultData {
  score: number;
  percentage: number;
  totalQuestions: number;
  promptStrength: number;
  promptTitle: string;
  promptText: string;
  fillBlankSolved: boolean;
}

export function McqResultScene({
  student,
  results,
  onContinue,
  onReturnHome,
  speak,
}: {
  student: DBStudent;
  results: McqResultData;
  onContinue: () => void;
  onReturnHome: () => void;
  speak: (text: string, emotion?: GuardianEmotion) => void;
}) {
  const hasSpoken = useRef(false);
  const [phase, setPhase] = useState<"guardian" | "note" | "details">("guardian");

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(
        `Assessment complete. You scored ${results.score} out of ${results.totalQuestions}. Your final result awaits.`,
        "success",
      );
      hasSpoken.current = true;
    }
  }, [speak, results.score, results.totalQuestions]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("note"), 2000);
    const t2 = setTimeout(() => setPhase("details"), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const strengthColor =
    results.promptStrength >= 70
      ? "bg-emerald-500"
      : results.promptStrength >= 40
        ? "bg-amber-500"
        : "bg-rose-500";

  const strengthLabel =
    results.promptStrength >= 70
      ? "Strong"
      : results.promptStrength >= 40
        ? "Moderate"
        : "Weak";

  return (
    <SceneWrap>
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(239,68,68,0.15),transparent_60%)]" />

      <div className="w-full max-w-lg mx-auto space-y-5">
        {/* Guardian silhouette + verdict sequence */}
        <AnimatePresence mode="wait">
          {phase === "guardian" && (
            <motion.div
              key="guardian"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col items-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute inset-0 bg-red-600/20 pointer-events-none rounded-2xl"
              />

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                className="relative"
              >
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
                  <span className="text-5xl sm:text-6xl font-serif text-red-400/80 select-none">
                    G
                  </span>
                </motion.div>

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
                The Guardian reviews your trial...
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
              <div className="relative bg-[#0a0b0e]/90 backdrop-blur-[24px] border border-red-500/40 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-[0_30px_80px_rgba(239,68,68,0.25)] text-center">
                <motion.div
                  initial={{ scale: 3, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 border-2 border-red-500 rounded px-2 py-0.5 pointer-events-none"
                >
                  <span className="font-mono text-[10px] sm:text-xs text-red-500 font-black tracking-widest uppercase">
                    COMPLETE
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-mono text-[9px] text-red-400/60 tracking-[0.4em] uppercase mb-2">
                    Official Trial Verdict
                  </p>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-3" />

                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-red-500 font-black uppercase tracking-wider">
                    ROUND 1
                  </h2>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-red-500 font-black uppercase tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.85)]">
                    TRIAL RESULTS
                  </h2>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent my-3" />

                  <p className="text-zinc-100 text-xs sm:text-sm leading-relaxed font-bold px-2">
                    {student.name}, your technical assessment has been recorded
                    and judged. Proceed to final evaluation.
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
                <ScrollText className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Trial Diagnostic Log</span>
              </div>

              <div className="grid grid-cols-2 gap-y-3.5 gap-x-5 text-[11px] text-zinc-200 font-bold leading-relaxed">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    Trial Score:{" "}
                    <strong className="text-red-300 font-black">
                      {results.score} / {results.totalQuestions}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    Percentage:{" "}
                    <strong className="text-red-300 font-black">
                      {results.percentage.toFixed(1)}%
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    Prompt Strength:{" "}
                    <strong className="text-red-300 font-black">
                      {results.promptStrength}/100
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {results.fillBlankSolved ? (
                    <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span>
                    Fill in the Blank:{" "}
                    <strong className="text-red-300 font-black uppercase">
                      {results.fillBlankSolved ? "Correct" : "Incorrect"}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-red-400/70">
                    Prompt Strength
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      results.promptStrength >= 70
                        ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
                        : results.promptStrength >= 40
                          ? "text-amber-400 border-amber-500/40 bg-amber-500/10"
                          : "text-rose-400 border-rose-500/40 bg-rose-500/10"
                    }`}
                  >
                    {strengthLabel}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColor} transition-all duration-1000`}
                    style={{ width: `${Math.max(0, Math.min(100, results.promptStrength))}%` }}
                  />
                </div>
                {results.promptTitle && (
                  <p className="text-[10px] text-zinc-400">
                    <span className="text-red-400/70 uppercase tracking-wider">Topic: </span>
                    {results.promptTitle}
                  </p>
                )}
                {results.promptText && (
                  <p className="text-[10px] text-zinc-400 leading-relaxed border-l-2 border-red-500/30 pl-2">
                    <span className="text-red-400/70 uppercase tracking-wider">Prompt: </span>
                    {results.promptText.trim() || "No prompt submitted."}
                  </p>
                )}
              </div>
            </div>

            <InlineLeaderboard currentEmail={student.email} />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full">
              <button
                onClick={onReturnHome}
                className="w-full py-3 border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
