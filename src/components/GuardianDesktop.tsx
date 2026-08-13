import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import guardianAsset from "@/assets/guardian-hero.png";

export interface GuardianProps {
  scale?: number;
  glow?: boolean;
  className?: string;
  speaking?: boolean;
  state?: string;
}

export function GuardianDesktop({
  scale = 1,
  glow = true,
  className = "",
  speaking = false,
  state = "idle",
}: GuardianProps) {
  const [mounted, setMounted] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 16, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 16, mass: 0.3 });

  const glowX = useTransform(() => springX.get() * -0.5);
  const glowY = useTransform(() => springY.get() * -0.5);
  const auroraX = useTransform(() => springX.get() * -0.25);
  const auroraY = useTransform(() => springY.get() * -0.25);
  const bodyX = useTransform(() => springX.get());
  const bodyY = useTransform(() => springY.get());

  useEffect(() => {
    setMounted(true);
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
      <div className="h-96 flex items-center justify-center text-emerald-400 font-mono text-xs animate-pulse">
        Establishing Link...
      </div>
    );
  }

  const isApocalypse = ["angry", "punishment", "death", "rejected"].includes(state.toLowerCase());
  const activeImage = guardianAsset;
  const eyeColor = isApocalypse
    ? "bg-red-400 shadow-[0_0_15px_rgba(239,68,68,1)]"
    : "bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,1)]";



  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[250px] sm:h-[340px] md:h-[400px] lg:h-[530px] flex items-center justify-center select-none overflow-visible ${className}`}
    >
      {glow && (
        <motion.div
          className="absolute inset-0 -z-30 pointer-events-none"
          style={{ x: glowX, y: glowY }}
        >
          <div
            className="absolute inset-[-80px] blur-[100px] opacity-80 transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${isApocalypse ? "rgba(239,68,68,0.8)" : "rgba(16,185,129,0.8)"}, transparent 65%)`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[150%] w-[110%] -translate-x-1/2 -translate-y-1/2 blur-[80px] opacity-60 transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle, ${isApocalypse ? "rgba(185,28,28,0.7)" : "rgba(4,120,87,0.7)"}, transparent 60%)`,
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="absolute inset-0 -z-20 pointer-events-none opacity-45 mix-blend-screen"
        style={{ x: auroraX, y: auroraY }}
      >
        <div className="absolute top-[10%] left-[-10%] w-[120%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.1),transparent_50%)] blur-[40px] animate-pulse" />
        <div
          className="absolute bottom-[5%] right-[-10%] w-[120%] h-[80%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,78,59,0.15),transparent_50%)] blur-[40px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </motion.div>



      <motion.div
        className="relative mx-auto h-[95%] flex items-end justify-center overflow-visible"
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
          style={{ x: bodyX, y: bodyY, transformOrigin: "bottom center" }}
          className="relative max-h-full flex items-end justify-center"
        >
          <motion.div
            className="relative max-h-full"
          >
            <img
              src={activeImage}
              alt="The Guardian"
              draggable={false}
              className={`relative mx-auto max-h-[150px] sm:max-h-[300px] md:max-h-[360px] lg:max-h-[480px] object-contain transition-all duration-500 translate-y-4 sm:translate-y-0 ${
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
