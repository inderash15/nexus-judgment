import { motion } from "framer-motion";

export function InstructionsScene({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      className="flex flex-col h-full w-full bg-zinc-950 text-emerald-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 15% Top Safe Area & Header */}
      <header className="flex-none h-[15%] p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md flex flex-col justify-end pb-4">
        <h1 className="text-[min(6vw,1.5rem)] font-serif text-emerald-400">Trial Instructions</h1>
      </header>

      {/* 65% Main Content Area */}
      <main className="flex-none h-[65%] w-full flex items-center justify-center p-4 sm:p-6">
        <div className="bg-zinc-900 border border-white/5 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto h-full flex flex-col overflow-y-auto">
          <ul className="space-y-4 text-[min(4vw,1rem)] text-zinc-300 list-disc list-inside h-full flex flex-col justify-center">
            <li>You will face 40 questions testing your knowledge in AI, ML, and Reasoning.</li>
            <li>You have 60 minutes to complete the trial.</li>
            <li>You can mark questions for review and skip them to answer later.</li>
            <li>Do not close this window. Your session will be saved automatically.</li>
            <li>Full screen is required for the assessment.</li>
          </ul>
        </div>
      </main>

      {/* 20% Fixed Footer Navigation Area */}
      <footer className="flex-none h-[20%] p-4 border-t border-white/10 bg-zinc-950 flex flex-col justify-start pt-6 pb-safe">
        <div className="max-w-2xl mx-auto w-full flex items-center justify-center">
          <button
            onClick={onStart}
            className="w-full h-14 sm:h-16 rounded-xl font-mono text-[min(3.5vw,1rem)] uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            Acknowledge & Begin
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
