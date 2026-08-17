import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import bgImage from "../assets/Background.png";

interface MobileEntryGateProps {
  onUnlocked: () => void;
}

export function MobileEntryGate({ onUnlocked }: MobileEntryGateProps) {
  const [error, setError] = useState<string | null>(null);

  const handleRotateAndContinue = async () => {
    try {
      setError(null);

      // Request Fullscreen
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await ((document.documentElement as any).webkitRequestFullscreen());
        } else {
          // If the browser strictly doesn't support the API (some older iOS Safari), 
          // we can't throw here if we want them to enter. But the prompt says:
          // "IF EITHER FAILS DO NOT LOAD THE WEBSITE."
          throw new Error("Fullscreen API not supported.");
        }
      }

      // Small delay to let fullscreen settle before locking orientation
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Request Orientation Lock to Landscape
      if (screen.orientation && (screen.orientation as any).lock) {
        try {
          await (screen.orientation as any).lock("landscape");
        } catch (e) {
          // If browser doesn't support locking, check physical orientation fallback
          const isLandscape = window.innerWidth > window.innerHeight;
          if (!isLandscape) {
            throw new Error("Orientation lock not supported. Please physically rotate your device to landscape first.");
          }
        }
      } else {
        // Fallback for browsers that don't support lock API natively
        const isLandscape = window.innerWidth > window.innerHeight;
        if (!isLandscape) {
          throw new Error("Orientation lock not supported. Please physically rotate your device to landscape first.");
        }
      }

      // Final strict verification of landscape mode as requested
      const isLandscape = window.innerWidth > window.innerHeight;
      if (!isLandscape && (!screen.orientation || !screen.orientation.type.includes("landscape"))) {
        throw new Error("Device is not in landscape mode.");
      }

      // If we reach here, we are successfully unlocked!
      onUnlocked();

    } catch (err: any) {
      console.error("Entry gate unlock failed:", err);
      setError("FULL SCREEN AND LANDSCAPE MODE ARE REQUIRED TO CONTINUE.");
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-emerald-50 px-6 text-center select-none overflow-hidden h-[100dvh] w-[100dvw] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-lg bg-zinc-950/40 backdrop-blur-md border border-emerald-900/30 p-8 rounded-3xl shadow-2xl w-full mx-4"
      >
        <div className="space-y-1">
          <p className="font-mono text-[10px] text-emerald-400/60 uppercase tracking-widest">
            AI NEXT GEN RESEARCH WORKSHOP 2026
          </p>
          <h1 className="font-serif text-3xl tracking-widest text-emerald-300">
            AVERSE AGENT
          </h1>
        </div>

        <motion.div
          animate={{ rotate: 90 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 0.5,
          }}
          className="text-emerald-400 p-4 border border-emerald-900/50 rounded-full bg-emerald-950/30 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        >
          <Smartphone size={56} strokeWidth={1.5} />
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="font-mono text-sm tracking-[0.2em] text-emerald-400 font-bold uppercase">
            LANDSCAPE MODE REQUIRED
          </h2>
          <h2 className="font-mono text-sm tracking-[0.2em] text-emerald-400 font-bold uppercase">
            FULL SCREEN REQUIRED
          </h2>
        </div>

        {error && (
          <div className="font-mono text-xs text-red-400 uppercase tracking-widest leading-relaxed p-3 bg-red-950/30 rounded border border-red-900/50">
            {error}
          </div>
        )}

        <button
          onClick={handleRotateAndContinue}
          className="group relative px-8 py-4 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 overflow-hidden w-full rounded"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-500/10 to-emerald-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <span className="relative font-mono text-sm tracking-[0.2em] text-emerald-100 uppercase">
            ROTATE & CONTINUE
          </span>
        </button>

        <p className="font-mono text-[10px] text-emerald-500/50 uppercase tracking-[0.3em] animate-pulse mt-4">
          WAITING FOR USER ACTION
        </p>
      </motion.div>
    </div>
  );
}
