import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { ActionButton } from "./ActionButton";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";

export function IntroScene({
  onBegin,
  hasSave,
  candidateName,
  speak,
  isSpeaking,
}: {
  onBegin: () => void;
  hasSave: boolean;
  candidateName: string;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(
        "Many have entered this realm. Very few have survived. Intelligence is your only weapon. One mistake will have consequences.",
        "normal",
      );
      hasSpoken.current = true;
    }
  }, [speak]);

  return (
    <SceneWrap>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full max-w-md text-left backdrop-blur-md bg-black/40 border border-emerald-500/20 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] p-5 sm:p-6 md:p-8"
      >
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
          TRANSMISSION // SHADOW REALM
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-emerald-50">
          The Guardian's <span className="italic text-emerald-300">Judgment.</span>
        </h1>
        <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-emerald-100/80 sm:text-lg">
          A hangman trial of raw tech intelligence. Seven words stand between you and validation.
          Make four mistakes, and your account will be locked forever.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ActionButton onClick={onBegin}>
            {hasSave ? `Resume Trial, ${candidateName.split(" ")[0]}` : "Submit to Trial"}
          </ActionButton>
        </div>
      </motion.div>
    </SceneWrap>
  );
}
