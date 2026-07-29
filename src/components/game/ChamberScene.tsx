import { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { DBStudent, DBQuestion } from "@/lib/db";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";
import { Clock, HelpCircle } from "lucide-react";

export function ChamberScene({
  student,
  question,
  onGuessLetter,
  speak,
  isSpeaking,
  submitting = false,
}: {
  student: DBStudent;
  question: DBQuestion;
  onGuessLetter: (char: string) => void;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
  submitting?: boolean;
}) {
  const [seconds, setSeconds] = useState(45);
  const [hintOpen, setHintOpen] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [inactiveAlert20, setInactiveAlert20] = useState(false);
  const [inactiveAlert40, setInactiveAlert40] = useState(false);
  const [guardianEmotionOverride, setGuardianEmotionOverride] = useState<string | null>(null);

  const resetInactivity = () => {
    setLastActivity(Date.now());
    setInactiveAlert20(false);
    setInactiveAlert40(false);
    setGuardianEmotionOverride(null);
  };

  const handleGuess = (char: string) => {
    if (submitting) return;
    resetInactivity();
    onGuessLetter(char);
  };

  // Add event listeners for mousemove, keydown, click to reset inactivity
  useEffect(() => {
    const handleInteraction = () => {
      resetInactivity();
    };
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("click", handleInteraction);
    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  // Check inactivity every second
  useEffect(() => {
    const checkTimer = setInterval(() => {
      const elapsed = Date.now() - lastActivity;
      if (elapsed > 40000 && !inactiveAlert40) {
        setInactiveAlert40(true);
        speak("Time waits for no one.", "warning");
        setGuardianEmotionOverride("warning");
      } else if (elapsed > 20000 && !inactiveAlert20) {
        setInactiveAlert20(true);
        speak("Have the shadows frightened you?", "normal");
        setGuardianEmotionOverride("talking");
      }
    }, 1000);
    return () => clearInterval(checkTimer);
  }, [lastActivity, inactiveAlert20, inactiveAlert40, speak]);

  // Use a ref to store latest state without constantly rebinding the listener
  const stateRef = useRef({ guesses: student.currentGuesses, onGuessLetter, submitting });
  useEffect(() => {
    stateRef.current = { guesses: student.currentGuesses, onGuessLetter, submitting };
  }, [student.currentGuesses, onGuessLetter, submitting]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const { guesses, onGuessLetter: currentOnGuess, submitting: isSubmitting } = stateRef.current;
      if (isSubmitting) return;

      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        if (!guesses.includes(char)) {
          resetInactivity();
          currentOnGuess(char);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          handleGuess("-"); // Force wrong guess on timeout
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onGuessLetter, lastActivity]);

  useEffect(() => {
    if (hintOpen) {
      speak(question.hint, "warning");
    }
  }, [hintOpen, speak, question.hint]);

  // Word blanks
  const displayWord = useMemo(() => {
    return question.word.split("").map((c) => {
      if (student.currentGuesses.includes(c)) return c;
      if (c === " ") return " ";
      return "_";
    });
  }, [question.word, student.currentGuesses]);

  return (
    <SceneWrap>
      {/* Game Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-2xl sm:rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-black/80 to-zinc-950 p-4 sm:p-6 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-4 sm:space-y-6 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/10 pb-3 sm:pb-4">
          <div>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-emerald-400/80">
              Category
            </span>
            <h4 className="text-xs sm:text-sm font-extrabold text-emerald-200 tracking-wide">
              {question.category}
            </h4>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
            <Clock className="h-4 w-4 text-emerald-400" />
            <span className="font-bold text-emerald-100">{seconds}s</span>
          </div>
        </div>

        {/* Blanks */}
        <div className="flex justify-center flex-wrap gap-1.5 sm:gap-2 py-2 sm:py-4">
          {displayWord.map((c, i) => (
            <span
              key={i}
              className={`font-mono text-xl sm:text-3xl md:text-5xl font-black w-6 sm:w-8 md:w-12 text-center border-b-2 transition ${
                c === "_"
                  ? "border-emerald-500/40 text-transparent"
                  : "border-emerald-400 text-emerald-100"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Virtual Keyboard */}
        <div className="grid grid-cols-9 sm:grid-cols-10 gap-1 sm:gap-1.5 md:gap-2 justify-center max-w-xl mx-auto pt-2">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
            const guessed = student.currentGuesses.includes(letter);
            const correct = question.word.includes(letter);
            return (
              <button
                key={letter}
                disabled={guessed || submitting}
                onClick={() => handleGuess(letter)}
                className={`min-h-[38px] sm:min-h-[44px] h-8 sm:h-9 md:h-11 rounded-lg font-mono text-[10px] sm:text-xs md:text-sm font-bold border transition cursor-pointer select-none ${
                  guessed
                    ? correct
                      ? "bg-emerald-600/30 border-emerald-500/40 text-emerald-300"
                      : "bg-red-950/40 border-red-900/40 text-red-500/50"
                    : submitting
                      ? "bg-emerald-950/10 border-emerald-500/10 text-emerald-500/30 cursor-not-allowed opacity-50"
                      : "bg-black/50 border-emerald-500/20 text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-500/10"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Hint Trigger */}
        <div className="pt-3 sm:pt-4 flex items-center justify-between border-t border-emerald-500/10 gap-2">
          <button
            onClick={() => setHintOpen(!hintOpen)}
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300/80 hover:text-emerald-200 cursor-pointer flex items-center gap-1"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            {hintOpen ? "Hide Whisper" : "Request Guardian Clue"}
          </button>
          <span className="font-mono text-[9px] text-emerald-500/50 uppercase hidden sm:inline">
            {submitting ? "processing matrix..." : "keyboard inputs accepted"}
          </span>
        </div>

        <AnimatePresence>
          {hintOpen && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs italic text-emerald-300/80 border-l border-emerald-500/30 pl-3 leading-relaxed font-medium"
            >
              &ldquo;{question.hint}&rdquo;
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </SceneWrap>
  );
}
