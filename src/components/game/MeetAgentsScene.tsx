import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { ActionButton } from "./ActionButton";
import { AgentCard, type Agent } from "./AgentCard";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";
import { ChevronLeft, ChevronRight } from "lucide-react";

import manojImg from "@/assets/manoj.jpeg";
import indrashImg from "@/assets/inderash.jpeg";
import pughalImg from "@/assets/pughal.jpeg";
import lavanyaImg from "@/assets/Lavanya.jpg";

const AGENTS: Agent[] = [
  {
    name: "Dr. S.R.Lavanya",
    role: "Associate Professor",
    department: "Department of Artificial Intelligence and Machine Learning",
    bio: "Key driver in AI research and shaping the curriculum. A vital member of the Guardian Network.",
    skills: ["AI Research", "Machine Learning", "Curriculum Design", "Mentorship"],
    quote: "True intelligence lies in the capacity for continuous learning.",
    initials: "SL",
    photoUrl: lavanyaImg,
  },
  {
    name: "Dr. Manoj M",
    role: "Event Coordinator",
    department: "Department of Computer Science with Data Analytics, KPR College Of Arts Science and Research",
    bio: "Assistant Professor. Orchestrates and guides every moving piece behind the scenes to ensure the smooth execution of the trial.",
    skills: ["Logistics", "Coordination", "Data Analytics", "Problem Solving"],
    quote: "Every great trial succeeds because of flawless organization.",
    initials: "MM",
    photoUrl: manojImg,
  },
  {
    name: "Inderash.M",
    role: "Full Stack Developer",
    department: "Department of Computer Science with Data Analytics, KPR College Of Arts Science and Research",
    bio: "Orchestrates the client architecture and the backend servers. The core architect behind the digital system.",
    skills: ["React", "Node.js", "MongoDB", "TanStack Start"],
    quote: "A digital ledger should record the truth without compromise.",
    initials: "IM",
    photoUrl: indrashImg,
  },
  {
    name: "Pughal Vanan C",
    role: "UI/UX & Graphic Designer",
    department: "Department of Computer Science with Data Analytics, KPR College Of Arts Science and Research",
    bio: "Crafts high-fidelity visuals, animations, and design layouts. Builds a dark, immersive atmosphere for candidates.",
    skills: ["UI/UX Design", "Figma", "Framer Motion", "Tailwind CSS"],
    quote: "Visual immersion is the bridge to human focus.",
    initials: "PV",
    photoUrl: pughalImg,
  },
];

const SEARCH_LINES = [
  "Searching Personnel Database...",
  "████████████████████████",
  "3 AGENTS FOUND",
  "Loading Personnel...",
];

type Phase = "search" | "showcase";

export function MeetAgentsScene({
  onComplete,
  speak,
  isSpeaking,
}: {
  onComplete: () => void;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
}) {
  const [phase, setPhase] = useState<Phase>("search");
  const [searchLine, setSearchLine] = useState(0);
  const [agentIndex, setAgentIndex] = useState(0);
  const hasSpoken = useRef(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("Agent... Prepare to meet the technical division. These are your allies.", "normal");
      hasSpoken.current = true;
    }
  }, [speak]);

  useEffect(() => {
    if (phase !== "search") return;
    if (searchLine >= SEARCH_LINES.length) {
      setTimeout(() => setPhase("showcase"), 500);
      return;
    }
    const t = setTimeout(() => setSearchLine((p) => p + 1), 650);
    return () => clearTimeout(t);
  }, [phase, searchLine]);

  useEffect(() => {
    if (phase !== "showcase") return;
    const agent = AGENTS[agentIndex];
    speak(
      `Agent ${String(agentIndex + 1).padStart(2, "0")}. ${agent.role}. ${agent.department}.`,
      "normal",
    );
  }, [phase, agentIndex, speak]);

  const goNext = () => {
    if (agentIndex < AGENTS.length - 1) {
      setAgentIndex((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (agentIndex > 0) {
      setAgentIndex((p) => p - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const isLast = agentIndex === AGENTS.length - 1;

  return (
    <SceneWrap>
      <div className="w-full max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4">
        <AnimatePresence mode="wait">
          {phase === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "brightness(2)" }}
              className="w-full rounded-2xl border border-emerald-500/20 bg-black/70 backdrop-blur-md p-6 sm:p-8 font-mono text-center shadow-[0_0_60px_rgba(16,185,129,0.15)]"
            >
              <div className="space-y-3">
                {SEARCH_LINES.slice(0, searchLine + 1).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-xs sm:text-sm tracking-widest ${i === SEARCH_LINES.length - 1
                        ? "text-emerald-300 font-bold"
                        : "text-emerald-400/70"
                      }`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "showcase" && (
            <motion.div
              key="showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-1 sm:mb-2"
              >
                <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-emerald-50 tracking-tight">
                  MEET THE AGENTS
                </h1>
                <p className="font-mono text-[9px] sm:text-[10px] text-emerald-400/60 tracking-[0.4em] uppercase mt-1">
                  Guardian Technical Division
                </p>
              </motion.div>

              {/* Main Content Area with Side Buttons */}
              <div className="flex items-start justify-between w-full gap-2 sm:gap-6 relative mt-4">
                {/* Left Button */}
                <button
                  onClick={goPrev}
                  disabled={agentIndex === 0}
                  className="hidden sm:flex self-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 sm:p-3 items-center justify-center text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-0 transition cursor-pointer z-10 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>

                {/* Agent card area */}
                <div
                  className="relative flex-1 flex items-start justify-center pt-4 sm:pt-6"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <AgentCard key={agentIndex} agent={AGENTS[agentIndex]} />
                  </AnimatePresence>
                </div>

                {/* Right Button */}
                <button
                  onClick={isLast ? onComplete : goNext}
                  className={`hidden sm:flex self-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 sm:p-3 items-center justify-center text-emerald-300 hover:bg-emerald-500/20 transition cursor-pointer z-10 shrink-0 ${isLast ? 'shadow-[0_0_20px_rgba(52,211,153,0.5)] animate-pulse' : 'shadow-[0_0_15px_rgba(16,185,129,0.15)]'}`}
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </div>

              {/* Bottom Navigation & Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 sm:mt-4 flex flex-col items-center justify-center gap-3 sm:gap-4"
              >
                {/* Mobile Navigation Buttons (Visible only on small screens) */}
                <div className="flex sm:hidden items-center justify-between w-full px-4 mb-2">
                  <button
                    onClick={goPrev}
                    disabled={agentIndex === 0}
                    className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-300 disabled:opacity-0 transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    {AGENTS.map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          width: i === agentIndex ? 20 : 6,
                          opacity: i === agentIndex ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1.5 rounded-full bg-emerald-400"
                      />
                    ))}
                  </div>
                  <button
                    onClick={isLast ? onComplete : goNext}
                    className={`rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-300 transition ${isLast ? 'shadow-[0_0_15px_rgba(52,211,153,0.4)] animate-pulse' : ''}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Desktop Dots (Hidden on mobile) */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {AGENTS.map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        width: i === agentIndex ? 20 : 6,
                        opacity: i === agentIndex ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-1.5 rounded-full bg-emerald-400"
                    />
                  ))}
                </div>



              </motion.div>

              {/* Counter */}
              <p className="mt-2 text-center font-mono text-[9px] sm:text-[10px] text-emerald-400/40 tracking-widest">
                {String(agentIndex + 1).padStart(2, "0")} / {String(AGENTS.length).padStart(2, "0")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneWrap>
  );
}
