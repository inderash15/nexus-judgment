import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RotatePrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      // Check if the device is likely a mobile phone in portrait mode
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobile = window.innerWidth < 768 || window.innerHeight < 768;

      if (isPortrait && isMobile) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090D16]"
        >
          <motion.div
            animate={{ rotate: [0, 90, 90, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
              times: [0, 0.35, 0.65, 1],
            }}
            className="mb-8 text-indigo-400"
          >
            <svg
              width="80"
              height="80"
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

          <p className="text-lg font-semibold tracking-wide text-white">Rotate your device</p>
          <p className="mt-2 text-sm text-slate-400">Landscape mode for the best experience</p>
          <button
            type="button"
            onClick={async () => {
              try {
                const docEl = document.documentElement;
                if (docEl.requestFullscreen) {
                  await docEl.requestFullscreen();
                } else if ((docEl as any).webkitRequestFullscreen) {
                  await (docEl as any).webkitRequestFullscreen();
                }
                
                if (window.screen.orientation && window.screen.orientation.lock) {
                  await window.screen.orientation.lock("landscape");
                } else if ((window.screen as any).lockOrientation) {
                  await (window.screen as any).lockOrientation("landscape");
                }
              } catch (err) {
                console.warn("Fullscreen/orientation lock failed:", err);
              }
            }}
            className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-6 py-3 font-mono text-xs font-bold text-emerald-400 shadow-lg shadow-emerald-950/20 backdrop-blur transition-all hover:bg-emerald-500 hover:text-white active:scale-95 cursor-pointer"
          >
            Force Landscape Fullscreen
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
