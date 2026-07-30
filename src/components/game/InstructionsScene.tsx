import { motion } from "framer-motion";

export function InstructionsScene({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      className="flex flex-col h-full w-full bg-zinc-950 text-emerald-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex-none p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md">
        <h1 className="text-xl font-serif text-emerald-400">Trial Instructions</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl shadow-xl max-w-2xl mx-auto w-full">
          <ul className="space-y-4 text-zinc-300 list-disc list-inside">
            <li>You will face 40 questions testing your knowledge in AI, ML, and Reasoning.</li>
            <li>You have 60 minutes to complete the trial.</li>
            <li>You can mark questions for review and skip them to answer later.</li>
            <li>Do not close this window. Your session will be saved automatically.</li>
            <li>Full screen is required for the assessment.</li>
          </ul>
        </div>
      </main>

      <footer className="flex-none p-4 border-t border-white/10 bg-zinc-950 pb-safe">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            Acknowledge & Begin
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
