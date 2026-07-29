import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import guardianAsset from "@/assets/guardian-hero.png";

type Props = {
  glow?: boolean;
  className?: string;
  speaking?: boolean;
  state?: string;
};

export function GuardianMobile({
  glow = true,
  className = "",
  speaking = false,
  state = "idle",
}: Props) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let active = true;
    const triggerBlink = () => {
      if (!active) return;
      setIsBlinking(true);
      setTimeout(() => {
        if (!active) return;
        setIsBlinking(false);
        if (active) {
          const nextBlink = 4000 + Math.random() * 3000;
          setTimeout(triggerBlink, nextBlink);
        }
      }, 180);
    };

    const initialTimeout = setTimeout(triggerBlink, 4000);
    return () => {
      active = false;
      clearTimeout(initialTimeout);
    };
  }, []);

  const isApocalypse = ["angry", "punishment", "death", "rejected"].includes(state.toLowerCase());
  const activeImage = guardianAsset;
  const eyeColor = isApocalypse ? "bg-red-400" : "bg-emerald-300";

  return (
    <div
      className={`relative w-full h-full flex items-end justify-center select-none overflow-visible ${className}`}
    >
      {/* Background glow effects with high-performance CSS radial-gradients */}
      {glow && (
        <div
          className="absolute inset-0 -z-30 pointer-events-none transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${isApocalypse ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.3)"}, transparent 70%)`,
          }}
        />
      )}

      {/* Main floating wrapper */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mx-auto h-[95%] flex items-end justify-center overflow-visible"
      >
        <img
          src={activeImage}
          alt="The Guardian"
          draggable={false}
          loading="lazy"
          className={`relative mx-auto h-full object-contain ${
            isApocalypse
              ? "drop-shadow-[0_0_35px_rgba(239,68,68,0.5)]"
              : "drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]"
          }`}
          style={{
            maskImage: "radial-gradient(circle at 50% 45%, black 50%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 50%, transparent 80%)",
          }}
        />

        {/* Glowing & Blinking Eye Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Left Eye */}
          <motion.div
            className={`absolute top-[14.8%] left-[44.5%] -translate-x-1/2 -translate-y-1/2 h-1 w-1.5 rounded-full ${eyeColor}`}
            animate={{
              scaleY: isBlinking ? 0.05 : 1,
              opacity: isBlinking ? 0.1 : 0.9,
            }}
            transition={{
              duration: 0.1,
            }}
          />
          {/* Right Eye */}
          <motion.div
            className={`absolute top-[14.8%] left-[55.5%] -translate-x-1/2 -translate-y-1/2 h-1 w-1.5 rounded-full ${eyeColor}`}
            animate={{
              scaleY: isBlinking ? 0.05 : 1,
              opacity: isBlinking ? 0.1 : 0.9,
            }}
            transition={{
              duration: 0.1,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
