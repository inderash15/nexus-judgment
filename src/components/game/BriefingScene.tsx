import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { ActionButton } from "./ActionButton";
import { DBStudent } from "@/lib/db";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";

export function BriefingScene({
  student,
  onEnter,
  speak,
  isSpeaking,
}: {
  student: DBStudent;
  onEnter: () => void;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(
        `Level ${student.currentLevel}. Prepare your intellect. The gates are shifting.`,
        "success",
      );
      hasSpoken.current = true;
    }
  }, [speak, student.currentLevel]);

  return (
    <SceneWrap>
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full max-w-md space-y-3 sm:space-y-4 text-left"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
          Level {String(student.currentLevel).padStart(2, "0")} / 07
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl leading-tight text-emerald-50">
          Entering the Chamber of Code
        </h2>
        <p className="text-emerald-100/70 leading-relaxed">
          The shadows part. The Guardian watches with cold, analytical focus. A hidden word waits
          behind the seal. Fail to solve it, and the void will consume your attempt.
        </p>
        <div className="pt-4">
          <ActionButton onClick={onEnter}>Face the Guardian →</ActionButton>
        </div>
      </motion.div>
    </SceneWrap>
  );
}
