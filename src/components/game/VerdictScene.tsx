import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { ActionButton } from "./ActionButton";
import { InlineLeaderboard } from "./InlineLeaderboard";
import { DBStudent } from "@/lib/db";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";

export function VerdictScene({
  student,
  onContinue,
  speak,
  isSpeaking,
}: {
  student: DBStudent;
  onContinue: () => void;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("You solved the seal. You move deeper into the dark.", "success");
      hasSpoken.current = true;
    }
  }, [speak]);

  return (
    <SceneWrap>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md space-y-3 sm:space-y-4 text-left"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400">
          Seal Solved
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl leading-tight text-emerald-100">
          You solved the code.
        </h2>
        <p className="text-emerald-100/70 leading-relaxed">
          The code resonates. The Guardian nods slightly, allowing you passage deeper into the
          Sector 07 chambers.
        </p>

        <div className="flex gap-3 sm:gap-4 pt-2">
          <div className="bg-black/60 border border-emerald-500/20 rounded-xl px-3 sm:px-4 py-2 font-mono text-center flex-1">
            <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-emerald-400/60">
              Current XP
            </div>
            <div className="text-base sm:text-lg font-bold text-emerald-100">
              {student.score} XP
            </div>
          </div>
          <div className="bg-black/60 border border-emerald-500/20 rounded-xl px-3 sm:px-4 py-2 font-mono text-center flex-1">
            <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-emerald-400/60">
              Level Finished
            </div>
            <div className="text-base sm:text-lg font-bold text-emerald-100">
              {student.levelsCompleted} / 3
            </div>
          </div>
        </div>

        {student.levelsCompleted === 3 && <InlineLeaderboard currentEmail={student.email} />}

        <div className="pt-4">
          <ActionButton onClick={onContinue}>
            {student.locked ? "Final Evaluation →" : "Proceed to next level →"}
          </ActionButton>
        </div>
      </motion.div>
    </SceneWrap>
  );
}
