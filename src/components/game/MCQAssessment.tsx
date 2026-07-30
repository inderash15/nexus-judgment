import { motion } from "framer-motion";
import { useMCQAssessment, Question } from "@/hooks/useMCQAssessment";

interface MCQAssessmentProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

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
      // Calculate score and complete
      let score = 0;
      questions.forEach((q) => {
        if (state.answers[q.id] === q.correctAnswer) {
          score++;
        }
      });
      onComplete(score);
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
    <motion.div 
      className="flex flex-col h-full w-full bg-zinc-950 text-emerald-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 15% Top Safe Area & Header Indicator */}
      <header className="flex-none h-[15%] p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md flex flex-col justify-end pb-4">
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="font-mono text-[min(3.5vw,0.85rem)] uppercase tracking-widest text-emerald-400">
            Question {state.currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className="font-mono text-[min(4vw,1rem)] font-bold text-red-400">
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

      {/* 65% Main Content Area (Fixed Container, Scrollable Internally ONLY if needed) */}
      <main className="flex-none h-[65%] w-full flex items-center justify-center p-4 sm:p-6 relative">
        <div className="bg-zinc-900 border border-white/5 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto h-full flex flex-col">
          {/* Question Title (Fixed 30% height of card) */}
          <div className="h-[30%] flex items-center mb-4">
             <h2 className="text-[min(5vw,1.5rem)] font-serif text-white leading-tight overflow-hidden text-ellipsis line-clamp-3">
               {currentQuestion.text}
             </h2>
          </div>
          
          {/* Options (Fixed 70% height of card) */}
          <div className="h-[70%] flex flex-col gap-2 sm:gap-3 overflow-y-auto pr-2 pb-2">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = state.answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => answerQuestion(currentQuestion.id, idx)}
                  className={`text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 flex-1 flex items-center min-h-[60px] ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' 
                      : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-emerald-500' : 'border-white/20'
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full" />}
                    </div>
                    <span className="text-[min(3.5vw,1rem)] sm:text-base leading-snug overflow-hidden text-ellipsis line-clamp-2">
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* 20% Fixed Footer Navigation Area */}
      <footer className="flex-none h-[20%] p-4 border-t border-white/10 bg-zinc-950 flex flex-col justify-start pt-6">
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between gap-4">
          <button
            onClick={goToPrevious}
            disabled={isFirstQuestion}
            className={`flex-1 h-14 sm:h-16 rounded-xl font-mono text-[min(3vw,0.85rem)] uppercase tracking-wider transition-colors ${
              isFirstQuestion 
                ? 'opacity-30 cursor-not-allowed text-zinc-500 bg-white/5' 
                : 'text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={() => markQuestion(currentQuestion.id)}
            className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:text-yellow-400 hover:bg-white/10 transition-colors shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </button>

          <button
            onClick={handleNext}
            className="flex-1 h-14 sm:h-16 rounded-xl font-mono text-[min(3vw,0.85rem)] uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            {isLastQuestion ? 'Submit' : 'Next'}
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
