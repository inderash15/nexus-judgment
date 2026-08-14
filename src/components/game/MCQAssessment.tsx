import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMCQAssessment, Question } from "@/hooks/useMCQAssessment";
import { SceneWrap } from "./SceneWrap";
import { ChamberScene } from "./ChamberScene";
import { DBStudent, DBQuestion } from "@/lib/db";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";
import { VirtualKeyboard } from "./VirtualKeyboard";

interface MCQAssessmentProps {
  email: string;
  questions: Question[];
  onComplete: (answers: Record<string, number | string>, timeRemaining: number) => void;
  chamberRound?: boolean;
  chamberStudent?: DBStudent | null;
  chamberQuestion?: DBQuestion | null;
  onGuessLetter?: (char: string) => void;
  chamberSubmitting?: boolean;
  speak?: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking?: boolean;
}

const DEFAULT_TIME = 60; // 60 seconds per question

export function MCQAssessment({
  email,
  questions,
  onComplete,
  chamberRound = false,
  chamberStudent = null,
  chamberQuestion = null,
  onGuessLetter,
  chamberSubmitting = false,
  speak,
  isSpeaking = false,
}: MCQAssessmentProps) {
  const {
    state,
    answerQuestion,
    setAnswer,
    markQuestion,
    skipQuestion,
    goToNext,
    goToPrevious,
    currentQuestion,
  } = useMCQAssessment(questions, email);

  const [activeField, setActiveField] = useState<"fillblank" | "prompt" | null>(null);

  const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = state.currentQuestionIndex === 0;

  const isPrompt = (q: Question): q is Extract<Question, { type: "prompt" }> =>
    (q as { type?: string }).type === "prompt";

  const isFillBlank = (q: Question): q is Extract<Question, { type: "fillblank" }> =>
    (q as { type?: string }).type === "fillblank";

  // Auto-submit or auto-advance if time runs out
  useEffect(() => {
    if (state.timeRemaining <= 0) {
      if (isLastQuestion) {
        onComplete(state.answers, 0);
      } else {
        goToNext();
      }
    }
  }, [state.timeRemaining, onComplete, state.answers, isLastQuestion, goToNext]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(state.answers, DEFAULT_TIME - state.timeRemaining);
    } else {
      goToNext();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Chamber trial is the final round of the test page (no separate scene)
  if (chamberRound) {
    return (
      <SceneWrap>
        <motion.div
          className="flex flex-col w-full max-w-2xl bg-zinc-950 text-emerald-50 rounded-2xl overflow-hidden border border-white/5 shadow-xl max-h-[90vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <header className="p-3 sm:p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2 px-2">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-emerald-400">
                Round 2 / 2 · Chamber Trial
              </div>
              <div className="font-mono text-xs sm:text-sm font-bold text-emerald-400">
                Final Round
              </div>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mx-2">
              <div className="h-full bg-emerald-500" style={{ width: "100%" }} />
            </div>
          </header>

          <main className="w-full p-4 sm:p-6 bg-zinc-900 flex flex-col gap-4 overflow-y-auto flex-1">
            {chamberStudent && chamberQuestion && onGuessLetter && speak ? (
              <ChamberScene
                compact
                student={chamberStudent}
                question={chamberQuestion}
                onGuessLetter={onGuessLetter}
                speak={speak}
                isSpeaking={isSpeaking}
                submitting={chamberSubmitting}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <h2 className="text-red-500 font-mono text-xl sm:text-2xl tracking-widest uppercase">
                  Loading Chamber...
                </h2>
                <p className="text-red-400/80 font-mono text-xs sm:text-sm">
                  SUMMONING THE GUARDIAN.
                </p>
              </div>
            )}
          </main>
        </motion.div>
      </SceneWrap>
    );
  }

  if (!currentQuestion) return null;

  const promptValue =
    typeof state.answers[currentQuestion.id] === "string"
      ? (state.answers[currentQuestion.id] as string)
      : "";

  const fillValue =
    typeof state.answers[currentQuestion.id] === "string"
      ? (state.answers[currentQuestion.id] as string)
      : "";

  const fillBlankParts = isFillBlank(currentQuestion) ? currentQuestion.text.split("___") : [];

  return (
    <SceneWrap>
      <motion.div
        className="flex flex-col w-full max-w-2xl bg-zinc-950 text-emerald-50 rounded-2xl overflow-hidden border border-white/5 shadow-xl max-h-[90vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <header className="p-3 sm:p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2 px-2">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-emerald-400">
              Question {state.currentQuestionIndex + 1} / {questions.length} ·{" "}
              {currentQuestion.category}
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold text-red-400">
              {formatTime(state.timeRemaining)}
            </div>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mx-2">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${((state.currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </header>

        <main className="w-full p-4 sm:p-6 bg-zinc-900 flex flex-col gap-4 overflow-y-auto flex-1">
          <div className="flex items-center">
            <h2 className="text-sm sm:text-base md:text-lg font-serif text-white leading-tight">
              {currentQuestion.text}
            </h2>
          </div>

          {isPrompt(currentQuestion) ? (
            <div className="flex flex-col gap-3 shrink-0">
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3 sm:p-4">
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 mb-1">
                  AI Topic
                </div>
                <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
                  {currentQuestion.title}
                </p>
              </div>

              <textarea
                value={promptValue}
                onFocus={() => setActiveField("prompt")}
                onChange={(e) => setAnswer(currentQuestion.id, e.target.value)}
                placeholder="Write your AI prompt here..."
                rows={7}
                className="w-full resize-y rounded-xl border border-white/10 bg-black/40 text-sm sm:text-base text-white placeholder-zinc-500 p-3 sm:p-4 leading-relaxed focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-colors"
              />

              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-xs text-zinc-500 italic">
                  Be specific — a role, context and clear output expectations make a prompt
                  stronger.
                </p>
                <span className="font-mono text-[10px] text-zinc-500 shrink-0">
                  {promptValue.trim().length} chars
                </span>
              </div>
            </div>
          ) : isFillBlank(currentQuestion) ? (
            <div className="flex flex-col gap-3 shrink-0">
              <p className="text-sm sm:text-base md:text-lg font-serif text-zinc-100 leading-relaxed">
                {fillBlankParts.map((part, idx, arr) => (
                  <Fragment key={idx}>
                    {part}
                    {idx < arr.length - 1 && (
                      <input
                        type="text"
                        value={fillValue}
                        onFocus={() => setActiveField("fillblank")}
                        onChange={(e) => setAnswer(currentQuestion.id, e.target.value)}
                        placeholder="type your answer"
                        autoComplete="off"
                        className="mx-1 inline-block w-40 sm:w-52 max-w-[60%] px-2 py-0.5 rounded-md border-b-2 border-emerald-500/60 bg-black/40 text-sm sm:text-base text-emerald-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-400 focus:bg-emerald-500/5 transition-colors"
                      />
                    )}
                  </Fragment>
                ))}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-xs text-zinc-500 italic">
                  Fill in the blank with the correct term.
                </p>
                <span className="font-mono text-[10px] text-zinc-500 shrink-0">
                  {fillValue.trim().length} chars
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:gap-3 shrink-0">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = state.answers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => answerQuestion(currentQuestion.id, idx)}
                    className={`text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 flex items-center min-h-[44px] sm:min-h-[60px] ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-emerald-500" : "border-white/20"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm leading-snug">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </main>

        <footer className="p-3 sm:p-4 border-t border-white/10 bg-zinc-950">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goToPrevious}
              disabled={isFirstQuestion}
              className={`flex-1 py-2 sm:py-3 rounded-xl font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors ${
                isFirstQuestion
                  ? "opacity-30 cursor-not-allowed text-zinc-500 bg-white/5"
                  : "text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10"
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => markQuestion(currentQuestion.id)}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:text-yellow-400 hover:bg-white/10 transition-colors shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-2 sm:py-3 rounded-xl font-mono text-[10px] sm:text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              {isLastQuestion ? "Submit" : "Next"}
            </button>
          </div>
        </footer>
      </motion.div>
      <VirtualKeyboard
        isOpen={activeField !== null}
        onClose={() => setActiveField(null)}
        type="text"
        value={activeField === "prompt" ? promptValue : fillValue}
        onChange={(val) => setAnswer(currentQuestion.id, val)}
      />
    </SceneWrap>
  );
}
