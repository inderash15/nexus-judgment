import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { ActionButton } from "./ActionButton";
import { AgentCard, type Agent } from "./AgentCard";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";

const AGENTS: Agent[] = [
  {
    name: "Sanjay Patel",
    role: "Event Coordinator",
    department: "Mission Logistics",
    bio: "Orchestrates every moving piece behind the scenes. Ensures every agent has what they need, exactly when they need it.",
    skills: ["Project Management", "Logistics", "Communication", "Problem Solving"],
    quote: "Every great mission succeeds because of flawless coordination.",
    initials: "SP",
  },
  {
    name: "Pughalvanan",
    role: "Lead Frontend Engineer",
    department: "User Experience Division",
    bio: "Architect of immersive digital experiences. Specializes in transforming abstract concepts into living, breathing interfaces that blur the line between fiction and reality.",
    skills: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    quote: "Immersion begins where ordinary interfaces end.",
    initials: "PV",
  },
  {
    name: "Kavitha Devi",
    role: "UI/UX Designer",
    department: "Visual Intelligence",
    bio: "Crafts visual languages that speak directly to human intuition. Every pixel is placed with purpose, every animation tells a story.",
    skills: ["Figma", "Motion Design", "Design Systems", "Accessibility"],
    quote: "Design is not what it looks like — it's what it makes you feel.",
    initials: "KD",
  },
  {
    name: "Arjun Reddy",
    role: "Backend Engineer",
    department: "Core Systems",
    bio: "The invisible backbone of every operation. Builds infrastructure that scales under pressure and never breaks when it matters most.",
    skills: ["Node.js", "MongoDB", "API Design", "Cloud Architecture"],
    quote: "A system is only as strong as its weakest endpoint.",
    initials: "AR",
  },
  {
    name: "Meera Nair",
    role: "AI Engineer",
    department: "Cognitive Operations",
    bio: "Trains machines to think, reason, and create. Bridges the gap between raw data and intelligent behavior.",
    skills: ["Python", "LLMs", "Prompt Engineering", "MLOps"],
    quote: "Intelligence without wisdom is just computation.",
    initials: "MN",
  },
];

const SEARCH_LINES = [
  "Searching Personnel Database...",
  "████████████████████████",
  "5 AGENTS FOUND",
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
      <div className="w-full max-w-lg sm:max-w-xl mx-auto">
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
                    className={`text-xs sm:text-sm tracking-widest ${
                      i === SEARCH_LINES.length - 1
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
                className="text-center mb-6 sm:mb-8"
              >
                <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-emerald-50 tracking-tight">
                  MEET THE AGENTS
                </h1>
                <p className="font-mono text-[9px] sm:text-[10px] text-emerald-400/60 tracking-[0.4em] uppercase mt-1.5">
                  Guardian Technical Division
                </p>
              </motion.div>

              {/* Agent card area */}
              <div
                className="relative min-h-[480px] sm:min-h-[520px]"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <AgentCard key={agentIndex} agent={AGENTS[agentIndex]} />
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-6"
              >
                <button
                  onClick={goPrev}
                  disabled={agentIndex === 0}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-[10px] sm:text-xs text-emerald-300 tracking-wider uppercase hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  Previous
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

                {isLast ? (
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(52,211,153,0.3)",
                        "0 0 30px rgba(52,211,153,0.6)",
                        "0 0 15px rgba(52,211,153,0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ActionButton onClick={onComplete}>JOIN THE MISSION</ActionButton>
                  </motion.div>
                ) : (
                  <button
                    onClick={goNext}
                    className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-[10px] sm:text-xs text-emerald-300 tracking-wider uppercase hover:bg-emerald-500/20 transition cursor-pointer"
                  >
                    Next
                  </button>
                )}
              </motion.div>

              {/* Counter */}
              <p className="mt-3 text-center font-mono text-[9px] sm:text-[10px] text-emerald-400/40 tracking-widest">
                {String(agentIndex + 1).padStart(2, "0")} / {String(AGENTS.length).padStart(2, "0")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneWrap>
  );
}
