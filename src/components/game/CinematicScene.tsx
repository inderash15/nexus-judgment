import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VOICE_LINES: { showAt: number; text: string; sub: string }[] = [];

export function CinematicScene({
  onComplete,
  speak,
  stop,
}: {
  onComplete: () => void;
  speak: (text: string) => void;
  stop: () => void;
}) {
  const [subtitle, setSubtitle] = useState("");
  const speakRef = useRef(speak);
  const onCompleteRef = useRef(onComplete);
  const stoppedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    speakRef.current = speak;
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    return () => {
      stoppedRef.current = true;
      stop();
    };
  }, [stop]);

  const runNarration = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 400));
    if (stoppedRef.current) return;

    for (let i = 0; i < VOICE_LINES.length; i++) {
      if (stoppedRef.current) return;

      const line = VOICE_LINES[i];
      setSubtitle(line.sub);

      const waitForTimestamp = async () => {
        while (!stoppedRef.current) {
          const vid = videoRef.current;
          if (vid && vid.currentTime >= line.showAt - 0.1) return;
          await new Promise((r) => setTimeout(r, 100));
        }
      };
      await waitForTimestamp();
      if (stoppedRef.current) return;

      await new Promise<void>((resolve) => {
        if (stoppedRef.current) {
          resolve();
          return;
        }
        speakRef.current(line.text);
        const wordCount = line.text.split(" ").length;
        const estimatedMs = Math.max(3000, wordCount * 400);
        setTimeout(resolve, estimatedMs);
      });
      if (stoppedRef.current) return;

      await new Promise((r) => setTimeout(r, 600));
    }

    if (!stoppedRef.current && VOICE_LINES.length > 0) {
      setSubtitle("");
      setTimeout(() => {
        if (!stoppedRef.current) onCompleteRef.current();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    runNarration();
  }, [runNarration]);

  const handleVideoEnd = () => {
    onCompleteRef.current();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950 overflow-hidden select-none">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/final.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950 pointer-events-none opacity-85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(2,44,34,0.65))] pointer-events-none" />

      <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 max-w-2xl w-full text-center px-4 pointer-events-none z-10">
        <AnimatePresence mode="wait">
          {subtitle && (
            <motion.p
              key={subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-sm sm:text-lg md:text-2xl leading-relaxed text-emerald-50 italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
            >
              {subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={onComplete}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 rounded-xl border border-emerald-500/25 bg-black/40 px-3 py-2 sm:px-3.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-300 backdrop-blur-md transition hover:border-emerald-400/50 hover:bg-emerald-500/10 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
      >
        Skip Cinematic
      </button>
    </div>
  );
}
