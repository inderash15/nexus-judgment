import { motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";

export function InstructionsScene({ onStart }: { onStart: () => void }) {
  return (
    <SceneWrap>
      <motion.div
        className="
          relative z-10
          w-full max-w-2xl
          max-h-[80vh]
          overflow-y-auto
          bg-zinc-950
          text-white
          rounded-2xl
          border border-white/10
          shadow-2xl
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        {/* HEADER */}
        <header
          className="
            p-4 sm:p-6
            border-b border-white/10
            bg-zinc-900
            text-center
          "
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-emerald-400">
            Trial Instructions
          </h1>
        </header>

        {/* CONTENT */}
        <main className="p-5 sm:p-7 bg-zinc-900">
          <ul
            className="
              space-y-4
              text-sm sm:text-base
              leading-relaxed
              text-zinc-200
              list-disc
              list-inside
            "
          >
            <li>
              You will face a 3-question technical trial: two MCQ questions and
              one technical logo joining image puzzle.
            </li>

            <li>
              You have 5 minutes to complete the trial (30 seconds per question).
            </li>

            <li>
              In the logo puzzle, tap the shuffled tiles in the correct order
              (top-left to bottom-right) to join them back into the complete logo.
            </li>

            <li>
              You can mark questions for review and skip them to answer later.
            </li>

            <li>
              Do not close this window. Your session will be saved automatically.
            </li>

            <li>
              Full screen is required for the assessment.
            </li>

            <li>
              Read each question carefully before selecting your answer.
            </li>

            <li>
              Your progress will be saved automatically during the assessment.
            </li>

            <li>
              Make sure you have a stable internet connection before beginning.
            </li>
          </ul>
        </main>

        {/* FOOTER */}
        <footer
          className="
            p-5 sm:p-6
            border-t border-white/10
            bg-zinc-950
            text-center
          "
        >
          <button
            onClick={onStart}
            className="
              w-full sm:w-auto
              px-8 py-3 sm:py-4
              rounded-xl
              font-mono
              text-xs sm:text-sm
              uppercase
              tracking-wider
              bg-emerald-600
              hover:bg-emerald-500
              text-white
              transition-colors
            "
          >
            Acknowledge & Begin
          </button>
        </footer>
      </motion.div>
    </SceneWrap>
  );
}