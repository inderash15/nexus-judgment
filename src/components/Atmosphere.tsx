import { useEffect, useState } from "react";
import chamberBg from "@/assets/chamber-bg.jpg";

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

/** Ambient chamber backdrop with mist particles and vignette. */
export function Atmosphere({ intensity = 1 }: { intensity?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 34 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.35,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${chamberBg})`,
          opacity: 0.55 * intensity,
          filter: "saturate(1.1) contrast(1.05)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(6,78,59,0.35), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.9), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 mix-blend-screen opacity-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* mist particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-emerald-300/50 blur-[2px] animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      {/* scanlines */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}
