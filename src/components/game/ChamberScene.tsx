import { memo, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { DBStudent, DBQuestion } from "@/lib/db";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";
import { Clock, HelpCircle } from "lucide-react";

// Memoized key so the per-second timer re-render never rebuilds the 26 buttons
const LetterKey = memo(function LetterKey({
  letter,
  guessed,
  correct,
  disabled,
  onPress,
}: {
  letter: string;
  guessed: boolean;
  correct: boolean;
  disabled: boolean;
  onPress: (char: string) => void;
}) {
  return (
    <button
      disabled={guessed || disabled}
      onClick={() => onPress(letter)}
      className={`min-h-[38px] sm:min-h-[44px] h-8 sm:h-9 md:h-11 rounded-lg font-mono text-[10px] sm:text-xs md:text-sm font-bold border transition cursor-pointer select-none ${
        guessed
          ? correct
            ? "bg-emerald-600/30 border-emerald-500/40 text-emerald-300"
            : "bg-red-950/40 border-red-900/40 text-red-500/50"
          : disabled
            ? "bg-emerald-950/10 border-emerald-500/10 text-emerald-500/30 cursor-not-allowed opacity-50"
            : "bg-black/50 border-emerald-500/20 text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-500/10"
      }`}
    >
      {letter}
    </button>
  );
});

export const ChamberScene = memo(function ChamberScene({
  student,
  question,
  onGuessLetter,
  speak,
  isSpeaking,
  submitting = false,
  compact = false,
}: {
  student: DBStudent;
  question: DBQuestion;
  onGuessLetter: (char: string) => void;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
  submitting?: boolean;
  compact?: boolean;
}) {
  const [seconds, setSeconds] = useState(60);
  const [hintOpen, setHintOpen] = useState(false);
  const [inactiveAlert20, setInactiveAlert20] = useState(false);
  const [inactiveAlert40, setInactiveAlert40] = useState(false);
  const [guardianEmotionOverride, setGuardianEmotionOverride] = useState<string | null>(null);
  const [pendingGuess, setPendingGuess] = useState<string | null>(null);

  const lastActivityRef = useRef(Date.now());
  const inactiveAlert20Ref = useRef(false);
  const inactiveAlert40Ref = useRef(false);
  const timeoutFiredRef = useRef(false);

  const onGuessRef = useRef(onGuessLetter);
  useEffect(() => {
    onGuessRef.current = onGuessLetter;
  }, [onGuessLetter]);

  const speakRef = useRef(speak);
  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  const submittingRef = useRef(submitting);
  useEffect(() => {
    submittingRef.current = submitting;
  }, [submitting]);

  const resetInactivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    inactiveAlert20Ref.current = false;
    inactiveAlert40Ref.current = false;
    setInactiveAlert20((v) => (v ? false : v));
    setInactiveAlert40((v) => (v ? false : v));
    setGuardianEmotionOverride((v) => (v ? null : v));
  }, []);

  // Optimistic press: register the letter visually the instant it's clicked,
  // before the server round-trip resolves, so the keyboard never feels laggy.
  const handleGuess = useCallback(
    (char: string) => {
      if (submittingRef.current) return;
      if (char === "-TIMEOUT-") {
        onGuessRef.current(char);
        return;
      }
      setPendingGuess(char);
      resetInactivity();
      onGuessRef.current(char);
    },
    [resetInactivity],
  );

  // Clear the optimistic press once the server confirms the guess
  useEffect(() => {
    if (pendingGuess && student.currentGuesses.includes(pendingGuess)) {
      setPendingGuess(null);
    }
  }, [student.currentGuesses, pendingGuess]);

  // Add event listeners for mousemove, keydown, click to reset inactivity.
  // resetInactivity only writes refs + bails out on unchanged state, so normal
  // mouse movement never triggers a re-render here.
  useEffect(() => {
    const handleInteraction = () => resetInactivity();
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("click", handleInteraction);
    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, [resetInactivity]);

  // Check inactivity every second (ref-backed, stable interval)
  useEffect(() => {
    const checkTimer = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed > 45000) {
        if (!inactiveAlert40Ref.current) {
          inactiveAlert40Ref.current = true;
          setInactiveAlert40(true);
          setGuardianEmotionOverride("warning");
          speakRef.current("Time waits for no one.", "warning");
        }
      } else if (elapsed > 30000) {
        if (!inactiveAlert20Ref.current) {
          inactiveAlert20Ref.current = true;
          setInactiveAlert20(true);
          setGuardianEmotionOverride("talking");
          speakRef.current("Have the shadows frightened you?", "normal");
        }
      }
    }, 1000);
    return () => clearInterval(checkTimer);
  }, []);

  const handleGuessRef = useRef(handleGuess);
  useEffect(() => {
    handleGuessRef.current = handleGuess;
  }, [handleGuess]);

  // Use a ref to store latest state without constantly rebinding the listener
  const stateRef = useRef({ guesses: student.currentGuesses, submitting });
  useEffect(() => {
    stateRef.current = { guesses: student.currentGuesses, submitting };
  }, [student.currentGuesses, submitting]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const { guesses, submitting: isSubmitting } = stateRef.current;
      if (isSubmitting) return;

      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char) && !guesses.includes(char)) {
        handleGuessRef.current(char);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGuess]);

  // Stable 1s countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fire the timeout once when the counter reaches zero
  useEffect(() => {
    if (seconds === 0 && !timeoutFiredRef.current) {
      timeoutFiredRef.current = true;
      handleGuess("-TIMEOUT-");
    }
  }, [seconds]);

  useEffect(() => {
    if (hintOpen) {
      speak(question.hint, "warning");
    }
  }, [hintOpen, speak, question.hint]);

  // Word blanks
  const displayWord = useMemo(() => {
    return question.word.split("").map((c) => {
      if (student.currentGuesses.includes(c) || pendingGuess === c) return c;
      if (c === " ") return " ";
      return "_";
    });
  }, [question.word, student.currentGuesses, pendingGuess]);

  // Keyboard keys memoized so the per-second timer tick never rebuilds them
  const keyboardKeys = useMemo(() => {
    const guessedSet = new Set(student.currentGuesses);
    if (pendingGuess) guessedSet.add(pendingGuess);
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
      letter,
      guessed: guessedSet.has(letter),
      correct: question.word.includes(letter),
    }));
  }, [student.currentGuesses, pendingGuess, question.word]);

  const card = (
    // Game Box
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
        {keyboardKeys.map(({ letter, guessed, correct }) => (
          <LetterKey
            key={letter}
            letter={letter}
            guessed={guessed}
            correct={correct}
            disabled={guessed}
            onPress={handleGuess}
          />
        ))}
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
  );

  if (compact) return card;
  return <SceneWrap>{card}</SceneWrap>;
});
