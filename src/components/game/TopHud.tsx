"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { DBStudent } from "@/lib/db";
import { Scene } from "./types";
import { Trophy, User, Heart, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import logo from "@/assets/images.png";

export function TopHud({
  student,
  scene,
  onOpenLeaderboard,
  onOpenProfile,
  voiceEnabled,
  onToggleVoice,
}: {
  student: DBStudent | null;
  scene: Scene;
  onOpenLeaderboard: () => void;
  onOpenProfile: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (scene === "boot" || scene === "intro" || scene === "register" || scene === "cinematic")
    return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 sm:px-8 sm:pt-6 pointer-events-none"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 sm:gap-4 rounded-2xl border border-emerald-500/20 bg-black/70 px-3 sm:px-4 py-2 backdrop-blur-xl pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img src={logo} alt="NexusPro" className="h-5 w-5 rounded object-contain shrink-0" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] shrink-0" />
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400/80 sm:text-xs shrink-0">
            Guardian Trial
          </div>
          {student && (
            <div className="text-xs font-semibold tracking-wide text-emerald-100 hidden sm:block truncate">
              {student.name}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {student && (
            <>
              {/* Level Progress */}
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.1em] text-emerald-400/60">
                  Lv
                </span>
                <span className="font-mono text-[10px] sm:text-xs font-bold text-emerald-300">
                  {student.status === "Completed" || student.status === "Qualified"
                    ? "7/7"
                    : `${student.currentLevel}/7`}
                </span>
              </div>

              {/* XP */}
              <div className="flex flex-col items-end leading-none">
                <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.1em] text-emerald-400/50">
                  XP
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-emerald-100 font-bold">
                  {student.score}
                </span>
              </div>

              {/* Lives / Wrong Guesses Skulls */}
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`h-3 w-3 ${
                      i < 4 - student.wrongAnswersCount
                        ? "text-emerald-400 fill-emerald-500/20"
                        : "text-red-600 fill-red-800/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 border-l border-emerald-500/20 pl-2 sm:pl-3">
            <button
              onClick={toggleFullScreen}
              className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-300 transition"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
            <button
              onClick={onOpenLeaderboard}
              className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-300 transition"
              title="Leaderboard"
            >
              <Trophy className="h-4 w-4" />
            </button>
            <button
              onClick={onOpenProfile}
              className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-300 transition"
              title="Profile"
            >
              <User className="h-4 w-4" />
            </button>
            <button
              onClick={onToggleVoice}
              className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-300 transition"
              title={voiceEnabled ? "Mute Voice" : "Unmute Voice"}
            >
              {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
