import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { ActionButton } from "./ActionButton";
import { ResourcePersonCard, type ResourcePerson } from "./ResourcePersonCard";
import { MissionTimeline } from "./MissionTimeline";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";

const RESOURCE_PERSONS: ResourcePerson[] = [
  {
    name: "Jeeththenthar LA",
    designation: "Full Stack Developer & Product Development Engineer",
    company: "Kovan Labs, Coimbatore",
    specialization: "Full Stack Development & Product Engineering",
    photoUrl: "",
  },
];

const OBJECTIVES = [
  "Learn Generative AI fundamentals",
  "Master Prompt Engineering techniques",
  "Build AI Automation pipelines",
  "Work on real-world Projects",
  "Gain hands-on Experience",
];

const REWARDS = [
  { icon: "\uD83C\uDFC6", label: "Certificate" },
  { icon: "\uD83C\uDFAF", label: "Challenge Completion" },
  { icon: "\uD83D\uDE80", label: "AI Skills" },
  { icon: "\uD83C\uDF81", label: "Surprise Rewards" },
];

const SCHEDULE = [
  {
    day: "Day 1",
    events: [
      { time: "09:00 AM", label: "Inauguration & Workshop Kickoff" },
      { time: "11:00 AM", label: "Generative AI Deep Dive" },
      { time: "02:00 PM", label: "Hands-on Lab Session" },
      { time: "04:00 PM", label: "Challenge Round — Nexus Judgment" },
      { time: "05:30 PM", label: "Networking & Wrap-up" },
    ],
  },
  {
    day: "Day 2",
    events: [
      { time: "09:00 AM", label: "Advanced AI Concepts" },
      { time: "11:00 AM", label: "Team Challenge & Collaboration" },
      { time: "02:00 PM", label: "Evaluation & Scoring" },
      { time: "04:00 PM", label: "Certificates & Closing Ceremony" },
    ],
  },
];

const DECRYPT_LINES = [
  "Decrypting Classified Archive...",
  "████████████████████████████",
  "ACCESS LEVEL VERIFIED",
  "LOADING MISSION DOSSIER...",
];

type Phase = "decrypt" | "content";

export function MissionDossierScene({
  onComplete,
  speak,
  isSpeaking,
}: {
  onComplete: () => void;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
}) {
  const [phase, setPhase] = useState<Phase>("decrypt");
  const [decryptLine, setDecryptLine] = useState(0);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [showCta, setShowCta] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "speaker" | "objectives" | "schedule">("info");
  const hasSpoken = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(
        "Agent... Before entering the Shadow Realm... Review your mission carefully.",
        "normal",
      );
      hasSpoken.current = true;
    }
  }, [speak]);

  useEffect(() => {
    if (phase !== "decrypt") return;
    if (decryptLine >= DECRYPT_LINES.length) {
      setTimeout(() => setPhase("content"), 600);
      return;
    }
    const t = setTimeout(() => setDecryptLine((p) => p + 1), 700);
    return () => clearTimeout(t);
  }, [phase, decryptLine]);

  useEffect(() => {
    if (phase !== "content") return;
    if (revealedCards.length >= 8) {
      setTimeout(() => setShowCta(true), 800);
      return;
    }
    const nextIdx = revealedCards.length;
    const delay = nextIdx === 0 ? 600 : 500;
    const t = setTimeout(() => {
      setRevealedCards((prev) => [...prev, nextIdx]);
    }, delay);
    return () => clearTimeout(t);
  }, [phase, revealedCards]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [revealedCards, showCta]);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <SceneWrap>
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {phase === "decrypt" && (
            <motion.div
              key="decrypt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "brightness(2)" }}
              className="w-full rounded-2xl border border-emerald-500/20 bg-black/70 backdrop-blur-md p-6 sm:p-8 font-mono text-center shadow-[0_0_60px_rgba(16,185,129,0.15)]"
            >
              <div className="space-y-3">
                {DECRYPT_LINES.slice(0, decryptLine + 1).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-xs sm:text-sm tracking-widest ${
                      i === DECRYPT_LINES.length - 1
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

          {phase === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-2xl border border-emerald-500/20 bg-black/60 backdrop-blur-md shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden"
            >
              {/* DESKTOP VIEW (hidden on mobile) */}
              <div
                ref={scrollRef}
                className="hidden md:block max-h-[80vh] overflow-y-auto overscroll-contain px-8 py-8 space-y-8"
              >
                {/* Header */}
                <div className="text-center relative">
                  <span className="inline-block rounded-full border border-red-500/50 bg-red-500/10 px-3 py-0.5 font-mono text-[10px] text-red-400 tracking-[0.3em] uppercase mb-3">
                    CLASSIFIED
                  </span>
                  <h1 className="font-serif text-3xl md:text-4xl text-emerald-50 tracking-tight">
                    MISSION DOSSIER
                  </h1>
                  <p className="font-mono text-xs text-emerald-400/60 tracking-[0.4em] uppercase mt-2">
                    Operation: Guardian's Judgment
                  </p>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
                </div>

                {/* Card 1 — Operation Name */}
                {revealedCards.includes(0) && (
                  <DossierCard title="Operation Name">
                    <p className="font-serif text-lg sm:text-xl md:text-2xl text-emerald-200">
                      GEN AI WORKSHOP
                    </p>
                    <p className="font-mono text-[9px] sm:text-[10px] text-emerald-400/50 tracking-[0.3em] uppercase mt-1">
                      2-Day Immersive Intelligence Program
                    </p>
                  </DossierCard>
                )}

                {/* Card 2 — Duration */}
                {revealedCards.includes(1) && (
                  <DossierCard title="Duration">
                    <p className="font-serif text-lg sm:text-xl text-emerald-200">
                      2 Days
                    </p>
                    <p className="font-mono text-[9px] sm:text-[10px] text-emerald-400/50 tracking-[0.3em] uppercase mt-1">
                      Intensive Training & Challenge
                    </p>
                  </DossierCard>
                )}

                {/* Card 3 — Date */}
                {revealedCards.includes(2) && (
                  <DossierCard title="Date">
                    <p className="font-serif text-base sm:text-lg text-emerald-200">
                      {dateStr}
                    </p>
                    <p className="font-mono text-[9px] sm:text-[10px] text-emerald-400/50 tracking-[0.3em] uppercase mt-1">
                      Scheduled Deployment Window
                    </p>
                  </DossierCard>
                )}

                {/* Card 4 — Venue */}
                {revealedCards.includes(3) && (
                  <DossierCard title="Venue">
                    <p className="font-serif text-base sm:text-lg text-emerald-200">
                      Workshop Hall — Sector 07
                    </p>
                    <p className="font-mono text-[9px] sm:text-[10px] text-emerald-400/50 tracking-[0.3em] uppercase mt-1">
                      Secure Intelligence Facility
                    </p>
                  </DossierCard>
                )}

                {/* Card 5 — Resource Persons */}
                {revealedCards.includes(4) && (
                  <DossierCard title="Resource Persons">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {RESOURCE_PERSONS.map((p, i) => (
                        <ResourcePersonCard key={i} person={p} index={i} />
                      ))}
                    </div>
                  </DossierCard>
                )}

                {/* Card 6 — Mission Objectives */}
                {revealedCards.includes(5) && (
                  <DossierCard title="Mission Objectives">
                    <ul className="space-y-2">
                      {OBJECTIVES.map((obj, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 * i, duration: 0.3 }}
                          className="flex items-center gap-2 text-xs sm:text-sm text-emerald-100/80"
                        >
                          <span className="text-emerald-400">&#10003;</span>
                          {obj}
                        </motion.li>
                      ))}
                    </ul>
                  </DossierCard>
                )}

                {/* Card 7 — Mission Rewards */}
                {revealedCards.includes(6) && (
                  <DossierCard title="Mission Rewards">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {REWARDS.map((r, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.4 }}
                          className="flex flex-col items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 sm:p-4"
                        >
                          <span className="text-2xl sm:text-3xl">{r.icon}</span>
                          <span className="font-mono text-[10px] sm:text-xs text-emerald-300 tracking-wider text-center">
                            {r.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </DossierCard>
                )}

                {/* Card 8 — Mission Schedule */}
                {revealedCards.includes(7) && (
                  <DossierCard title="Mission Schedule">
                    <MissionTimeline schedule={SCHEDULE} />
                  </DossierCard>
                )}

                {/* CTA */}
                {showCta && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center pt-2 pb-4"
                  >
                    <motion.div
                      animate={{ boxShadow: ["0 0 20px rgba(52,211,153,0.3)", "0 0 40px rgba(52,211,153,0.6)", "0 0 20px rgba(52,211,153,0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block rounded-xl"
                    >
                      <ActionButton onClick={onComplete}>
                        MISSION ACCEPTED
                      </ActionButton>
                    </motion.div>
                    <p className="mt-3 font-mono text-[9px] sm:text-[10px] text-emerald-400/40 tracking-widest">
                      INITIALIZING CINEMATIC SEQUENCE
                    </p>
                  </motion.div>
                )}
              </div>

              {/* MOBILE COMPACT VIEW (zero-scroll, zero-zoom layout) */}
              <div className="md:hidden flex flex-col p-4 space-y-4 max-h-[85vh] overflow-hidden">
                {/* Header */}
                <div className="text-center">
                  <span className="inline-block rounded-full border border-red-500/50 bg-red-500/10 px-2 py-0.5 font-mono text-[8px] text-red-400 tracking-[0.2em] uppercase mb-1">
                    CLASSIFIED
                  </span>
                  <h1 className="font-serif text-lg text-emerald-50 tracking-tight">
                    MISSION DOSSIER
                  </h1>
                </div>

                {/* Custom Tab Selector */}
                <div className="flex border-b border-emerald-500/20 pb-1.5 justify-between gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
                  {[
                    { id: "info", label: "Info" },
                    { id: "speaker", label: "Speaker" },
                    { id: "objectives", label: "Objectives" },
                    { id: "schedule", label: "Schedule" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as any)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all ${
                        activeTab === t.id
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "text-emerald-500/50 hover:text-emerald-300"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content Wrapper */}
                <div className="flex-1 overflow-y-auto max-h-[35dvh] pr-1 space-y-3">
                  {activeTab === "info" && (
                    <div className="grid grid-cols-1 gap-2.5">
                      <div className="rounded-lg border border-emerald-500/15 bg-emerald-950/10 p-3">
                        <p className="font-mono text-[9px] text-emerald-400/50 uppercase tracking-wider">Operation Name</p>
                        <p className="font-serif text-sm text-emerald-200 font-bold">GEN AI WORKSHOP</p>
                        <p className="font-mono text-[8px] text-emerald-400/40">2-Day Immersive Intelligence Program</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg border border-emerald-500/15 bg-emerald-950/10 p-3">
                          <p className="font-mono text-[9px] text-emerald-400/50 uppercase tracking-wider">Duration</p>
                          <p className="font-serif text-sm text-emerald-200 font-bold">2 Days</p>
                        </div>
                        <div className="rounded-lg border border-emerald-500/15 bg-emerald-950/10 p-3">
                          <p className="font-mono text-[9px] text-emerald-400/50 uppercase tracking-wider">Venue</p>
                          <p className="font-serif text-sm text-emerald-200 font-bold truncate">Sector 07 Hall</p>
                        </div>
                      </div>
                      <div className="rounded-lg border border-emerald-500/15 bg-emerald-950/10 p-3">
                        <p className="font-mono text-[9px] text-emerald-400/50 uppercase tracking-wider">Date</p>
                        <p className="font-serif text-sm text-emerald-200 font-bold">{dateStr}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === "speaker" && (
                    <div className="space-y-2">
                      {RESOURCE_PERSONS.map((p, i) => (
                        <div key={i} className="rounded-lg border border-emerald-500/15 bg-emerald-950/10 p-3 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full border border-emerald-400/30 bg-emerald-900/20 flex items-center justify-center font-serif text-emerald-300">
                            {p.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-xs text-emerald-50 truncate">{p.name}</h4>
                            <p className="font-mono text-[9px] text-emerald-300/70 truncate">{p.designation}</p>
                            <p className="font-mono text-[8px] text-emerald-400/40 truncate">{p.company}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "objectives" && (
                    <div className="space-y-3">
                      <div className="rounded-lg border border-emerald-500/15 bg-emerald-950/10 p-3">
                        <p className="font-mono text-[9px] text-emerald-400/50 uppercase tracking-wider mb-1.5">Objectives</p>
                        <ul className="space-y-1.5">
                          {OBJECTIVES.map((obj, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-[10px] text-emerald-100/80">
                              <span className="text-emerald-400 text-[8px]">&#10003;</span>
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg border border-emerald-500/15 bg-emerald-950/10 p-3">
                        <p className="font-mono text-[9px] text-emerald-400/50 uppercase tracking-wider mb-2">Rewards</p>
                        <div className="grid grid-cols-2 gap-2">
                          {REWARDS.map((r, i) => (
                            <div key={i} className="flex items-center gap-2 rounded border border-emerald-500/10 bg-emerald-500/5 p-1.5">
                              <span className="text-base">{r.icon}</span>
                              <span className="font-mono text-[9px] text-emerald-300 truncate">{r.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "schedule" && (
                    <div className="space-y-3">
                      {SCHEDULE.map((s, idx) => (
                        <div key={idx} className="rounded-lg border border-emerald-500/15 bg-emerald-950/10 p-3">
                          <p className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider font-bold mb-2">{s.day}</p>
                          <div className="space-y-2">
                            {s.events.map((e, i) => (
                              <div key={i} className="flex items-start gap-2 text-[10px]">
                                <span className="font-mono text-emerald-400 shrink-0">{e.time}</span>
                                <span className="text-emerald-100/80">{e.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Permanent CTA */}
                <div className="text-center pt-1 border-t border-emerald-500/15">
                  <div className="inline-block rounded-xl shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                    <ActionButton onClick={onComplete}>
                      ACCEPT MISSION
                    </ActionButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneWrap>
  );
}

function DossierCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 sm:p-5"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
      <p className="relative z-10 font-mono text-[9px] sm:text-[10px] text-emerald-400/60 tracking-[0.3em] uppercase mb-2 sm:mb-3">
        {title}
      </p>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
