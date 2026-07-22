import { motion } from "framer-motion";
import guardianAsset from "@/assets/guardian-hero.png";

type Props = {
  scale?: number;
  glow?: boolean;
  className?: string;
  speaking?: boolean;
};

export function Guardian({ scale = 1, glow = true, className = "", speaking = false }: Props) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      {glow && (
        <>
          <div className="absolute inset-0 -z-10 blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.55), rgba(6,78,59,0.35) 40%, transparent 70%)",
            }}
          />
          <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 blur-2xl opacity-40"
            style={{
              background:
                "radial-gradient(ellipse, rgba(52,211,153,0.4), transparent 60%)",
            }}
          />
        </>
      )}
      <motion.img
        src={guardianAsset}
        alt="The Guardian"
        draggable={false}
        style={{ transform: `scale(${scale})`, transformOrigin: "bottom center" }}
        initial={{ y: 20, opacity: 0 }}
        animate={
          speaking
            ? { y: [0, -6, 0], opacity: 1 }
            : { y: [0, -4, 0], opacity: 1 }
        }
        transition={{
          y: { duration: speaking ? 2.4 : 5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1.2, ease: "easeOut" },
        }}
        className="relative mx-auto drop-shadow-[0_25px_60px_rgba(16,185,129,0.35)]"
      />
      {/* Holographic Speaking Mouth Overlay */}
      {speaking && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute top-[19.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-4 w-8">
            {/* Pulsing Outer Energy Lip Ring */}
            <motion.div
              className="absolute rounded-full border border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
              animate={{
                width: [8, 18, 8],
                height: [2, 10, 2],
                borderRadius: ["40%", "50%", "40%"],
              }}
              transition={{
                duration: 0.22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Vibrating Central Audio Wave Line */}
            <motion.div
              className="w-3.5 h-[0.5px] bg-emerald-100 rounded-full shadow-[0_0_6px_rgba(167,243,208,1)]"
              animate={{
                scaleY: [1, 5, 1],
                scaleX: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 0.18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.03,
              }}
            />
          </div>
        </div>
      )}
      {speaking && (
        <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 h-8 bg-black/60 px-4 py-2 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(52,211,153,0.2)] backdrop-blur-md">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400 mr-1 animate-pulse">
            Vocalizing
          </div>
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-emerald-400"
              animate={{
                height: [6, i % 2 === 0 ? 20 : 14, 6],
              }}
              transition={{
                duration: 0.6 + i * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
