import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import introVideo from "@/assets/Cosmic_guardian_with_green_energy_202607222222.mp4";
import newIntroVideo from "@/assets/final 2222 workshop.mp4";

export function CinematicScene({
  onComplete,
  speak,
}: {
  onComplete: () => void;
  speak: (text: string) => void;
}) {
  const [subtitle, setSubtitle] = useState("");
  const [videoIndex, setVideoIndex] = useState(0);
  const speakRef = useRef(speak);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    speakRef.current = speak;
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (videoIndex !== 1) return;

    const timelines = [
      {
        delay: 500,
        text: "The Guardian stands vigil over the Shadow Realm.",
        sub: "\u201CThe Guardian stands vigil over the Shadow Realm...\u201D",
      },
      {
        delay: 4500,
        text: "Intelligence is your only shield. One mistake holds eternal penalty.",
        sub: "\u201CIntelligence is your only shield. One mistake holds eternal penalty.\u201D",
      },
      {
        delay: 9000,
        text: "Solve the word chambers. Survive, or be disqualified forever.",
        sub: "\u201CSolve the word chambers. Survive, or be disqualified forever.\u201D",
      },
    ];

    const timeouts = timelines.flatMap((item) => [
      setTimeout(() => {
        speakRef.current(item.text);
      }, item.delay),
      setTimeout(() => {
        setSubtitle(item.sub);
      }, item.delay),
    ]);

    const fallbackTimeout = setTimeout(() => {
      onCompleteRef.current();
    }, 14000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(fallbackTimeout);
    };
  }, [videoIndex]);

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={videoIndex === 0 ? newIntroVideo : introVideo}
          autoPlay
          muted={videoIndex !== 0}
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950 pointer-events-none opacity-85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(2,44,34,0.65))] pointer-events-none" />

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-2xl w-full text-center px-4 pointer-events-none z-10">
        <AnimatePresence mode="wait">
          {subtitle && (
            <motion.p
              key={subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-lg sm:text-2xl leading-relaxed text-emerald-50 italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
            >
              {subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={onComplete}
        className="absolute top-4 right-4 z-50 flex items-center gap-1.5 rounded-xl border border-emerald-500/25 bg-black/40 px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider text-emerald-300 backdrop-blur-md transition hover:border-emerald-400/50 hover:bg-emerald-500/10 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
      >
        Skip Cinematic
      </button>
    </div>
  );
}
