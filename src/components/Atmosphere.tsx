import { useEffect, useState, useRef } from "react";
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

const bgVideo = "/videos/Ancient_Gothic_shadow_temple_loop_202607231856.mp4";

/** Ambient chamber backdrop with a looping MP4 video, mist particles and vignette. */
export function Atmosphere({
  intensity = 1,
  speaking = false,
}: {
  intensity?: number;
  speaking?: boolean;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setParticles(
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 11,
        opacity: 0.12 + Math.random() * 0.3,
      })),
    );
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden bg-black"
      style={{ zIndex: -10 }}
    >
      {/* LAYER 1: Fullscreen Video & Fallback Static Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${chamberBg})`,
          opacity: 0.35 * intensity,
          zIndex: -30,
        }}
      />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => {
          if (videoRef.current) {
            console.log("Video Loaded:", {
              readyState: videoRef.current.readyState,
              currentTime: videoRef.current.currentTime,
              paused: videoRef.current.paused,
              autoplay: videoRef.current.autoplay,
              videoWidth: videoRef.current.videoWidth,
              videoHeight: videoRef.current.videoHeight,
              currentSrc: videoRef.current.currentSrc,
              error: videoRef.current.error,
            });
          }
        }}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{
          opacity: (speaking ? 0.75 : 0.6) * intensity,
          filter: speaking
            ? "saturate(1.2) contrast(1.15) brightness(1.05)"
            : "saturate(1.05) contrast(1.05)",
          transition: "opacity 1.5s ease, filter 1.5s ease",
          zIndex: -30,
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* LAYER 2: Dark cinematic overlay (45% opacity) */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" style={{ zIndex: -25 }} />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
          zIndex: -25,
        }}
      />

      {/* LAYER 3: Dynamic Ambient Radial Lighting Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: speaking
            ? "radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.35), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.85), transparent 75%)"
            : "radial-gradient(ellipse at 50% 40%, rgba(6,78,59,0.25), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.85), transparent 75%)",
          transition: "background 1.5s ease",
          zIndex: -20,
        }}
      />

      {/* LAYER 3: Fog / Smoke Overlay */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-35"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%)",
          zIndex: -20,
        }}
      />

      {/* LAYER 3: Mist Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-emerald-300/40 blur-[1px] animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: speaking ? p.size * 1.5 : p.size,
            height: speaking ? p.size * 1.5 : p.size,
            opacity: speaking ? Math.min(1, p.opacity * 2.2) : p.opacity,
            boxShadow: speaking ? "0 0 10px rgba(52,211,153,0.75)" : "none",
            animationDelay: `${p.delay}s`,
            animationDuration: `${speaking ? p.duration * 0.8 : p.duration}s`,
            transition:
              "width 1.2s ease, height 1.2s ease, opacity 1.2s ease, box-shadow 1.2s ease",
            zIndex: -10,
          }}
        />
      ))}

      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
          zIndex: -10,
        }}
      />
    </div>
  );
}
