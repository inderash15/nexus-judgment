import { motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";

export function InstructionsScene({ onStart }: { onStart: () => void }) {
  return (
    <SceneWrap>
      <motion.div 
        className="flex flex-col w-full max-w-2xl bg-zinc-950 text-emerald-50 rounded-2xl overflow-hidden border border-white/5 shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <header className="p-4 sm:p-6 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-emerald-400">Trial Instructions</h1>
        </header>

        <main className="w-full flex items-center justify-center p-4 sm:p-6 bg-zinc-900">
          <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-zinc-300 list-disc list-inside">
            <li>You will face 40 questions testing your knowledge in AI, ML, and Reasoning.</li>
            <li>You have 60 minutes to complete the trial.</li>
            <li>You can mark questions for review and skip them to answer later.</li>
            <li>Do not close this window. Your session will be saved automatically.</li>
            <li>Full screen is required for the assessment.</li>
          </ul>
        </main>

        <footer className="p-4 sm:p-6 border-t border-white/10 bg-zinc-950 text-center">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3 sm:py-4 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            Acknowledge & Begin
          </button>
        </footer>
      </motion.div>
    </SceneWrap>
  );
}
