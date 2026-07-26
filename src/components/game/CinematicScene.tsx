import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VOICE_LINES = [
  {
    showAt: 1.0,
    text: "The Guardian stands vigil over the Shadow Realm.",
    sub: "\u201CThe Guardian stands vigil over the Shadow Realm...\u201D",
  },
  {
    showAt: 5.0,
    text: "Intelligence is your only shield. One mistake holds eternal penalty.",
    sub: "\u201CIntelligence is your only shield. One mistake holds eternal penalty.\u201D",
  },
  {
    showAt: 9.5,
    text: "Solve the word chambers. Survive, or be disqualified forever.",
    sub: "\u201CSolve the word chambers. Survive, or be disqualified forever.\u201D",
  },
];

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
  const [videoIndex, setVideoIndex] = useState(0);
  const speakRef = useRef(speak);
  const onCompleteRef = useRef(onComplete);
  const stoppedRef = useRef(false);
  const triggeredLinesRef = useRef<Set<number>>(new Set());
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    speakRef.current = speak;
    onCompleteRef.current = onComplete;
  });

  // Cleanup: stop all speech when leaving this scene
  useEffect(() => {
    return () => {
      stoppedRef.current = true;
      stop();
    };
  }, [stop]);

  // Sequential voice narration: fires lines one after another
  const runNarration = useCallback(async () => {
    // Small initial delay for speech synthesis engine warm-up
    await new Promise((r) => setTimeout(r, 400));
    if (stoppedRef.current) return;

    for (let i = 0; i < VOICE_LINES.length; i++) {
      if (stoppedRef.current) return;

      const line = VOICE_LINES[i];

      // Show subtitle first (subtitles lead the voice slightly)
      setSubtitle(line.sub);

      // Wait for the video to reach the right timestamp (poll every 100ms)
      const waitForTimestamp = async () => {
        while (!stoppedRef.current) {
          const vid = videoRef.current;
          if (vid && vid.currentTime >= line.showAt - 0.1) return;
          await new Promise((r) => setTimeout(r, 100));
        }
      };
      await waitForTimestamp();
      if (stoppedRef.current) return;

      // Speak the line (this is async - waits for speech to finish)
      await new Promise<void>((resolve) => {
        if (stoppedRef.current) {
          resolve();
          return;
        }
        speakRef.current(line.text);
        // Resolve after an estimated duration based on word count
        const wordCount = line.text.split(" ").length;
        const estimatedMs = Math.max(3000, wordCount * 400);
        setTimeout(resolve, estimatedMs);
      });
      if (stoppedRef.current) return;

      // Brief pause between lines
      await new Promise((r) => setTimeout(r, 600));
    }

    // All lines delivered - clear subtitle and proceed
    if (!stoppedRef.current) {
      setSubtitle("");
      setTimeout(() => {
        if (!stoppedRef.current) onCompleteRef.current();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (videoIndex === 1) {
      runNarration();
    }
  }, [videoIndex, runNarration]);

  const handleVideoEnd = () => {
    if (videoIndex === 0) {
      setVideoIndex(1);
    } else {
      onCompleteRef.current();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950 overflow-hidden select-none">
      <AnimatePresence mode="wait">
        <motion.video
          key={videoIndex}
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={
            videoIndex === 0
              ? "/videos/final 2222 workshop.mp4"
              : "/videos/Cosmic_guardian_with_green_energy_202607222222.mp4"
          }
          autoPlay
          muted={videoIndex !== 0}
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

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
