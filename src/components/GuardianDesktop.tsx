import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import guardianAsset from "@/assets/guardian-hero.png";

type Props = {
  scale?: number;
  glow?: boolean;
  className?: string;
  speaking?: boolean;
  state?: string;
};

export function GuardianDesktop({
  glow = true,
  className = "",
  speaking = false,
  state = "idle",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const clickAnim = useAnimation();
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      setMousePos({
        x: Math.max(-1, Math.min(1, dx)) * 24,
        y: Math.max(-1, Math.min(1, dy)) * 18,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  useEffect(() => {
    const handleMouseDown = () => {
      clickAnim
        .start({
          scaleY: 0.93,
          scaleX: 1.03,
          y: 8,
          transition: { duration: 0.08, ease: "easeOut" },
        })
        .then(() => {
          clickAnim.start({
            scaleY: 1,
            scaleX: 1,
            y: 0,
            transition: { type: "spring", stiffness: 160, damping: 9 },
          });
        });
    };

    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [clickAnim]);

  useEffect(() => {
    const handleKeyDown = () => {
      setIsTyping(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1200);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const triggerBlink = () => {
      if (!active) return;
      setIsBlinking(true);
      setTimeout(() => {
        if (!active) return;
        setIsBlinking(false);
        if (active) {
          const nextBlink = 3000 + Math.random() * 3000;
          setTimeout(triggerBlink, nextBlink);
        }
      }, 160);
    };

    const initialTimeout = setTimeout(triggerBlink, 3000);
    return () => {
      active = false;
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center text-emerald-400 font-mono text-xs animate-pulse">
        Establishing Link...
      </div>
    );
  }

  const isApocalypse = ["angry", "punishment", "death", "rejected"].includes(state.toLowerCase());
  const activeImage = guardianAsset;
  const eyeColor = isApocalypse
    ? "bg-red-400 shadow-[0_0_15px_rgba(239,68,68,1)]"
    : "bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,1)]";

  const particles = [
    { left: "8%", delay: 0, duration: 9 },
    { left: "22%", delay: 2.5, duration: 7 },
    { left: "38%", delay: 1.2, duration: 10 },
    { left: "55%", delay: 3.8, duration: 8 },
    { left: "72%", delay: 0.6, duration: 11 },
    { left: "88%", delay: 2.9, duration: 9 },
  ];

  const typingLookX = isTyping ? -38 : 0;
  const typingRotateY = isTyping ? -15 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-end justify-center select-none overflow-visible ${className}`}
    >
      {glow && (
        <motion.div
          className="absolute inset-0 -z-30 pointer-events-none"
          animate={{
            x: (mousePos.x + typingLookX) * -0.5,
            y: mousePos.y * -0.5,
          }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
        >
          <div
            className="absolute inset-[-80px] blur-[100px] opacity-85 transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${isApocalypse ? "rgba(239,68,68,0.85)" : "rgba(16,185,129,0.85)"}, transparent 65%)`,
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="absolute inset-0 -z-20 pointer-events-none opacity-45 mix-blend-screen"
        animate={{
          x: (mousePos.x + typingLookX) * -0.25,
          y: mousePos.y * -0.25,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
      >
        <div className="absolute top-[10%] left-[-10%] w-[120%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.1),transparent_50%)] blur-[40px] animate-pulse" />
      </motion.div>

      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            className={`absolute bottom-[-10px] w-2.5 h-2.5 rounded-full ${
              isApocalypse ? "bg-red-500/25" : "bg-emerald-500/25"
            }`}
            style={{ left: p.left }}
            animate={{
              y: -600,
              x: [0, Math.sin(idx) * 25, 0],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        animate={clickAnim}
        className="relative mx-auto h-[95%] w-full flex items-end justify-center overflow-visible"
        style={{ transformOrigin: "bottom center" }}
      >
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-48 h-5 bg-black/80 rounded-full blur-[8px] -z-10 pointer-events-none" />

        <div
          className="absolute bottom-[-160px] left-1/2 -translate-x-1/2 w-full h-[150px] opacity-25 scale-y-[-0.65] pointer-events-none blur-[4px] select-none -z-20"
          style={{
            transformOrigin: "top center",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 70%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 70%)",
          }}
        >
          <img
            src={activeImage}
            alt="Floor Reflection"
            className="w-full h-full object-contain filter brightness-50"
          />
        </div>

        <motion.div
          style={{ transformOrigin: "bottom center" }}
          animate={{
            x: mousePos.x + typingLookX,
            y: mousePos.y + (speaking ? Math.sin(Date.now() / 150) * 1.5 : 0) + (isTyping ? 12 : 0),
            scale: isTyping ? 1.05 : 1,
            rotateX: isTyping ? 5 : 0,
            rotateY: typingRotateY,
          }}
          transition={{
            type: "spring",
            stiffness: isTyping ? 80 : 120,
            damping: isTyping ? 12 : 14,
          }}
          className="relative max-h-full flex items-end justify-center w-full"
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: speaking ? 3.0 : 6.0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative max-h-full w-full flex items-end justify-center"
          >
            <img
              src={activeImage}
              alt="The Guardian"
              draggable={false}
              className={`relative mx-auto h-full object-contain transition-all duration-500 ${
                isApocalypse
                  ? "drop-shadow-[0_0_80px_rgba(239,68,68,0.7)] filter saturate-[1.15] brightness-[1.08] contrast-[1.05]"
                  : "drop-shadow-[0_0_80px_rgba(16,185,129,0.55)] filter saturate-[1.1] brightness-[1.05]"
              }`}
              style={{
                maskImage: "radial-gradient(circle at 50% 45%, black 45%, transparent 78%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 45%, transparent 78%)",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className={`absolute top-[14.8%] left-[44.5%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-2 rounded-full blur-[1px] ${eyeColor}`}
                animate={{
                  scaleY: isBlinking ? 0.05 : speaking ? [1, 1.25, 1] : [1, 1.05, 1],
                  scaleX: isBlinking ? 1.2 : 1,
                  opacity: isBlinking ? 0.1 : speaking ? [0.7, 1, 0.7] : [0.5, 0.8, 0.5],
                }}
                transition={{
                  scaleY: {
                    duration: isBlinking ? 0.08 : speaking ? 1.2 : 2.5,
                    repeat: isBlinking ? 0 : Infinity,
                  },
                  opacity: {
                    duration: isBlinking ? 0.08 : speaking ? 1.2 : 2.5,
                    repeat: isBlinking ? 0 : Infinity,
                  },
                }}
              />
              <motion.div
                className={`absolute top-[14.8%] left-[55.5%] -translate-x-1/2 -translate-y-1/2 h-1.5 w-2 rounded-full blur-[1px] ${eyeColor}`}
                animate={{
                  scaleY: isBlinking ? 0.05 : speaking ? [1, 1.25, 1] : [1, 1.05, 1],
                  scaleX: isBlinking ? 1.2 : 1,
                  opacity: isBlinking ? 0.1 : speaking ? [0.7, 1, 0.7] : [0.5, 0.8, 0.5],
                }}
                transition={{
                  scaleY: {
                    duration: isBlinking ? 0.08 : speaking ? 1.2 : 2.5,
                    repeat: isBlinking ? 0 : Infinity,
                  },
                  opacity: {
                    duration: isBlinking ? 0.08 : speaking ? 1.2 : 2.5,
                    repeat: isBlinking ? 0 : Infinity,
                  },
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {speaking && (
        <div
          className={`absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 h-8 bg-black/60 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md z-20 ${
            isApocalypse
              ? "border-red-500/30 shadow-red-500/10"
              : "border-emerald-500/30 shadow-emerald-500/10"
          }`}
        >
          <div
            className={`font-mono text-[9px] uppercase tracking-[0.2em] mr-1 animate-pulse ${
              isApocalypse ? "text-red-400" : "text-emerald-400"
            }`}
          >
            Vocalizing
          </div>
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className={`w-1 rounded-full ${isApocalypse ? "bg-red-400" : "bg-emerald-400"}`}
              animate={{ height: [6, i % 2 === 0 ? 20 : 14, 6] }}
              transition={{ duration: 0.6 + i * 0.12, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
