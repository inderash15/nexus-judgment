import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import loadingVideo from "@/assets/0724 (1).mp4";
import fullLogo from "@/assets/full logo.png";
import bgImage from "@/assets/background.png";

export function BootScene({
  onComplete,
  speak,
  voiceEnabled,
  toggleVoice,
}: {
  onComplete: () => void;
  speak: (text: string) => void;
  voiceEnabled: boolean;
  toggleVoice: () => void;
}) {
  const [stage, setStage] = useState<"click-to-start" | "loading" | "ready">("click-to-start");
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const startBoot = () => {
    setStage("loading");
    if (!voiceEnabled) {
      toggleVoice();
    }

    setTimeout(() => {
      speak("Establishing link with Sector 0 7. Decrypting seals. Standing by for selection.");
    }, 100);

    const logTimeline = [
      { delay: 300, text: "> CONNECTING TO SHADOW REALM CONTROLLER..." },
      { delay: 800, text: "> INITIALIZING GUARDIAN DIALOGUE MATRIX... OK" },
      { delay: 1400, text: "> LOADING DYNAMIC CIPHER LIBRARIES..." },
      { delay: 2000, text: "> ESTABLISHING ONE-RETRIAL ACCOUNT INTEGRITY SEALS..." },
      { delay: 2700, text: "> RANDOMIZING INTEL WORKSPACE QUESTIONS... READY" },
      { delay: 3400, text: "> SECURITY VIGILANCE MODULE: ACTIVE" },
      { delay: 4000, text: "> SECTOR SYSTEM FULLY INJECTED. ENTER THE TRIAL NOW." },
    ];

    logTimeline.forEach((item) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, item.text]);
      }, item.delay);
    });

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 80);

    setTimeout(() => {
      setStage("ready");
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 4800);
  };

  return (
    <SceneWrap>
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-[-1] bg-black/60 pointer-events-none" />
      <AnimatePresence>
        {(stage === "loading" || stage === "ready") && (
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            src={loadingVideo}
            autoPlay
            muted
            playsInline
            loop
            className="fixed inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
          />
        )}
      </AnimatePresence>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {stage === "click-to-start" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center w-full max-w-lg mx-auto px-6 sm:px-8 pt-0 pb-6 sm:pb-8 backdrop-blur-md bg-black/40 border border-emerald-500/20 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] m-auto flex flex-col items-center gap-0"
          >
            <div className="relative z-10 w-full flex justify-center z-20 pointer-events-none -mt-4">
              <img
                src={fullLogo}
                alt="Logo"
                className="w-56 sm:w-64 md:w-80 h-auto object-contain drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]"
              />
            </div>

            <div className="flex flex-col items-center gap-0 mb-4 z-10 relative -mt-12 sm:-mt-16 md:-mt-20">
              <h2 className="relative z-20 m-0 font-serif text-xl sm:text-2xl md:text-3xl tracking-wider sm:tracking-widest text-emerald-100 uppercase leading-snug">
                2 Days GEN AI WORKSHOP
              </h2>
              <p className="m-0 font-mono text-[9px] sm:text-[10px] md:text-xs text-emerald-400/70 tracking-[0.2em] sm:tracking-[0.4em] uppercase">
                Sector 07 // Intelligence Vault
              </p>
            </div>
            <button
              onClick={startBoot}
              className="group relative w-full sm:w-auto overflow-hidden rounded-xl border border-emerald-400/60 bg-gradient-to-b from-emerald-500/20 to-emerald-700/10 px-4 sm:px-8 py-3 sm:py-4 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-emerald-100 shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:shadow-[0_0_50px_rgba(52,211,153,0.6)] hover:from-emerald-400/30 hover:to-emerald-600/20 transition cursor-pointer"
            >
              Enter the Shadow Realm
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "brightness(2)" }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg rounded-2xl border border-emerald-500/20 bg-black/80 p-6 font-mono text-xs backdrop-blur-md shadow-[0_0_60px_rgba(16,185,129,0.15)] text-left"
          >
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4">
              <span className="text-emerald-400/80 uppercase tracking-widest text-[10px] sm:text-xs">
                System Boot Sequence
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                <span className="text-[10px] text-emerald-300">ONLINE</span>
              </div>
            </div>

            <div className="h-44 overflow-y-auto space-y-2 text-emerald-300/80 text-[11px] sm:text-xs">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {log}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 border-t border-emerald-500/10 pt-4">
              <div className="flex justify-between text-[10px] text-emerald-400/70 mb-1.5">
                <span>DECRYPTING SECURE MATRIX</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-emerald-950/70 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </SceneWrap>
  );
}
