import { motion } from "framer-motion";
import { useMCQAssessment, Question } from "@/hooks/useMCQAssessment";
import { SceneWrap } from "./SceneWrap";

interface MCQAssessmentProps {
  questions: Question[];
  onComplete: (answers: Record<string, number>, timeRemaining: number) => void;
}

const DEFAULT_TIME = 60 * 60; // 60 minutes

export function MCQAssessment({ questions, onComplete }: MCQAssessmentProps) {
  const {
    state,
    answerQuestion,
    markQuestion,
    skipQuestion,
    goToNext,
    goToPrevious,
    currentQuestion
  } = useMCQAssessment(questions);

  const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = state.currentQuestionIndex === 0;

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
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentQuestion) return null;

  return (
    <SceneWrap>
      <motion.div 
        className="flex flex-col w-full max-w-2xl bg-zinc-950 text-emerald-50 rounded-2xl overflow-hidden border border-white/5 shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <header className="p-3 sm:p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2 px-2">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-emerald-400">
              Question {state.currentQuestionIndex + 1} / {questions.length}
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

        <main className="w-full p-4 sm:p-6 bg-zinc-900 flex flex-col gap-4">
          <div className="flex items-center">
             <h2 className="text-sm sm:text-base md:text-lg font-serif text-white leading-tight">
               {currentQuestion.text}
             </h2>
          </div>
          
          <div className="flex flex-col gap-2 sm:gap-3 overflow-y-auto">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = state.answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => answerQuestion(currentQuestion.id, idx)}
                  className={`text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 flex items-center min-h-[44px] sm:min-h-[60px] ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' 
                      : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-emerald-500' : 'border-white/20'
                    }`}>
                      {isSelected && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full" />}
                    </div>
                    <span className="text-xs sm:text-sm leading-snug">
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </main>

        <footer className="p-3 sm:p-4 border-t border-white/10 bg-zinc-950">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goToPrevious}
              disabled={isFirstQuestion}
              className={`flex-1 py-2 sm:py-3 rounded-xl font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors ${
                isFirstQuestion 
                  ? 'opacity-30 cursor-not-allowed text-zinc-500 bg-white/5' 
                  : 'text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={() => markQuestion(currentQuestion.id)}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:text-yellow-400 hover:bg-white/10 transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-2 sm:py-3 rounded-xl font-mono text-[10px] sm:text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              {isLastQuestion ? 'Submit' : 'Next'}
            </button>
          </div>
        </footer>
      </motion.div>
    </SceneWrap>
  );
}
