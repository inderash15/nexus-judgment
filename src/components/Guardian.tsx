import { motion } from "framer-motion";
import guardianAsset from "@/assets/guardian-hero.png.asset.json";

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
        src={guardianAsset.url}
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
    </div>
  );
}
