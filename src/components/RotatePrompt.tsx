import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RotatePrompt({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const check = () => {
      // Mobile devices are determined by small screens
      const isPortrait = window.innerHeight > window.innerWidth;
      // Consider a device mobile if its shorter dimension is < 768
      const minDim = Math.min(window.innerWidth, window.innerHeight);
      const isMobile = minDim < 768;

      if (isPortrait && isMobile) {
        setShow(true);
      } else {
        setShow(false);
      }
      setInitialized(true);
    };

    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  if (!initialized) return null;

  // STRICT RULE: If mobile portrait, DO NOT render the application at all.
  if (show) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090D16] text-center p-6 select-none overflow-hidden h-[100dvh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center max-w-sm w-full space-y-6"
        >
          <div className="space-y-1">
            <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-emerald-500/70">
              AI NEXT GEN RESEARCH WORKSHOP 2026
            </h3>
            <h1 className="text-2xl font-serif text-white tracking-wide">
              NEXUS JUDGMENT
            </h1>
          </div>

          <motion.div
            animate={{ rotate: [0, -90, -90, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
              times: [0, 0.35, 0.65, 1],
            }}
            className="my-8 text-emerald-400 opacity-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </motion.div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold tracking-widest text-rose-500 uppercase">
              LANDSCAPE MODE REQUIRED
            </h2>
            <p className="text-base font-medium text-emerald-50">
              PLEASE ROTATE YOUR DEVICE<br />TO CONTINUE.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mt-2">
              THIS PLATFORM HAS BEEN<br />OPTIMIZED FOR LANDSCAPE MODE.
            </p>
          </div>

          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8 text-[10px] font-mono tracking-[0.3em] text-emerald-500 uppercase"
          >
            WAITING FOR LANDSCAPE MODE.....
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Allow application to load normally if not mobile portrait
  return <>{children}</>;
}
