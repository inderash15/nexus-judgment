import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import guardianAsset from "@/assets/guardian-hero.png";
import { Guardian } from "@/components/Guardian";
import { Atmosphere } from "@/components/Atmosphere";
import { CHAMBERS } from "@/lib/chambers";
import { useGuardianVoice } from "@/hooks/useGuardianVoice";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Last Candidate — Enter the Chambers" },
      {
        name: "description",
        content:
          "Seven chambers. One Guardian. Only thirty will be chosen. A cinematic selection experience.",
      },
      { property: "og:title", content: "The Last Candidate" },
      {
        property: "og:description",
        content:
          "Seven chambers. One Guardian. Only thirty will be chosen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: guardianAsset },
      { name: "twitter:image", content: guardianAsset },
    ],
  }),
  component: LastCandidate,
});

type Scene =
  | "boot"
  | "intro"
  | "register"
  | "briefing"
  | "chamber"
  | "verdict"
  | "final";

type SaveState = {
  name: string;
  xp: number;
  correct: number;
  attempted: number;
  step: number; // next chamber index (0..7)
  streak: number;
  history: Array<{ id: number; correct: boolean; choice: number }>;
};

const STORAGE_KEY = "last-candidate:v1";

function loadState(): SaveState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SaveState) : null;
  } catch {
    return null;
  }
}

function saveState(state: SaveState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function LastCandidate() {
  const [hydrated, setHydrated] = useState(false);
  const [scene, setScene] = useState<Scene>("boot");
  const [state, setState] = useState<SaveState>({
    name: "",
    xp: 0,
    correct: 0,
    attempted: 0,
    step: 0,
    streak: 0,
    history: [],
  });
  const [verdict, setVerdict] = useState<null | {
    correct: boolean;
    choice: number;
    chamberId: number;
  }>(null);

  const { voiceEnabled, toggleVoice, isSpeaking, speak } = useGuardianVoice();

  useEffect(() => {
    setHydrated(true);
    const saved = loadState();
    if (saved) setState(saved);
    // brief boot pulse before intro
    const t = setTimeout(() => setScene("intro"), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-emerald-50 font-sans antialiased">
      <Atmosphere />
      
      {/* Floating Sound Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleVoice}
          className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-black/40 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-emerald-300 backdrop-blur-md transition hover:border-emerald-400/50 hover:bg-emerald-500/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-pointer"
        >
          <span>{voiceEnabled ? "🔊 Voice: ON" : "🔇 Voice: OFF"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {scene === "boot" && <BootScene key="boot" />}
        {scene === "intro" && (
          <IntroScene
            key="intro"
            onBegin={() =>
              setScene(state.name ? (state.step >= 7 ? "final" : "briefing") : "register")
            }
            hasSave={Boolean(state.name)}
            candidateName={state.name}
            speak={speak}
            isSpeaking={isSpeaking}
          />
        )}
        {scene === "register" && (
          <RegisterScene
            key="register"
            onComplete={(name) => {
              const next = { ...state, name };
              setState(next);
              setScene("briefing");
            }}
            speak={speak}
            isSpeaking={isSpeaking}
          />
        )}
        {scene === "briefing" && (
          <BriefingScene
            key="briefing"
            state={state}
            onEnter={() => setScene("chamber")}
            speak={speak}
            isSpeaking={isSpeaking}
          />
        )}
        {scene === "chamber" && (
          <ChamberScene
            key={`chamber-${state.step}`}
            chamberIndex={state.step}
            onAnswer={(choice) => {
              const chamber = CHAMBERS[state.step];
              const correct = choice === chamber.answer;
              const gained = correct ? 100 + Math.min(state.streak, 5) * 25 : 0;
              const next: SaveState = {
                ...state,
                xp: state.xp + gained,
                correct: state.correct + (correct ? 1 : 0),
                attempted: state.attempted + 1,
                streak: correct ? state.streak + 1 : 0,
                step: state.step + 1,
                history: [
                  ...state.history,
                  { id: chamber.id, correct, choice },
                ],
              };
              setState(next);
              setVerdict({ correct, choice, chamberId: chamber.id });
              setScene("verdict");
            }}
            speak={speak}
            isSpeaking={isSpeaking}
          />
        )}
        {scene === "verdict" && verdict && (
          <VerdictScene
            key={`verdict-${verdict.chamberId}`}
            correct={verdict.correct}
            chamberId={verdict.chamberId}
            state={state}
            onContinue={() => {
              setVerdict(null);
              if (state.step >= 7) setScene("final");
              else setScene("briefing");
            }}
            speak={speak}
            isSpeaking={isSpeaking}
          />
        )}
        {scene === "final" && (
          <FinalScene
            key="final"
            state={state}
            onRestart={() => {
              const fresh: SaveState = {
                name: state.name,
                xp: 0,
                correct: 0,
                attempted: 0,
                step: 0,
                streak: 0,
                history: [],
              };
              setState(fresh);
              setScene("briefing");
            }}
            speak={speak}
            isSpeaking={isSpeaking}
          />
        )}
      </AnimatePresence>
      <TopHud state={state} scene={scene} />
    </main>
  );
}

/* ---------- HUD ---------- */

function TopHud({ state, scene }: { state: SaveState; scene: Scene }) {
  if (scene === "boot" || scene === "intro" || scene === "register") return null;
  const pct = Math.min(100, (state.step / 7) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-none fixed top-0 left-0 right-0 z-40 px-4 pt-4 sm:px-8 sm:pt-6"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-black/40 px-4 py-2 backdrop-blur-xl sm:px-6 sm:py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300/80 sm:text-xs">
            Candidate
          </div>
          <div className="text-sm font-semibold tracking-wide text-emerald-50 sm:text-base">
            {state.name || "—"}
          </div>
        </div>
        <div className="hidden flex-1 items-center gap-3 sm:flex">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
            Trial
          </div>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-emerald-950/70">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.6)]"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <div className="font-mono text-xs text-emerald-200">
            {Math.min(state.step, 7)}/7
          </div>
        </div>
        <div className="flex items-center gap-4">
          <StatChip label="XP" value={state.xp} />
          <StatChip label="Streak" value={state.streak} accent />
        </div>
      </div>
    </motion.div>
  );
}

function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-end leading-none">
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-300/60">
        {label}
      </span>
      <span
        className={`font-mono text-sm sm:text-base ${
          accent ? "text-emerald-300" : "text-emerald-100"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ---------- Scenes ---------- */

function SceneWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-24 sm:px-6"
    >
      {children}
    </motion.section>
  );
}

function BootScene() {
  return (
    <SceneWrap>
      <div className="text-center font-mono text-xs uppercase tracking-[0.5em] text-emerald-400/70">
        <div className="mb-4 inline-flex h-8 w-8 items-center justify-center">
          <span className="absolute h-8 w-8 animate-ping rounded-full bg-emerald-500/40" />
          <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
        </div>
        <div>establishing signal…</div>
      </div>
    </SceneWrap>
  );
}

function IntroScene({
  onBegin,
  hasSave,
  candidateName,
  speak,
  isSpeaking,
}: {
  onBegin: () => void;
  hasSave: boolean;
  candidateName: string;
  speak: (text: string) => void;
  isSpeaking: boolean;
}) {
  useEffect(() => {
    speak("Welcome, candidate. Seven chambers stand between you and the thirty who remain. Identify yourself, and let us begin.");
  }, [speak]);

  return (
    <SceneWrap>
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-2 md:order-1"
        >
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
            Transmission // Sector 07
          </div>
          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-emerald-50 sm:text-5xl md:text-6xl">
            The Last{" "}
            <span className="italic text-emerald-300">Candidate.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-emerald-100/80 sm:text-lg">
            Ten thousand applied. Seven chambers stand between you and the
            thirty who remain. The Guardian is watching. Every answer is a
            step deeper into the seal.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ActionButton onClick={onBegin}>
              {hasSave
                ? `Resume, ${candidateName.split(" ")[0]}`
                : "Begin the selection"}
            </ActionButton>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300/60">
              7 trials · 30 chosen
            </div>
          </div>
          <ul className="mt-10 grid grid-cols-3 gap-3 text-center">
            {[
              ["10 000", "Applied"],
              ["7", "Chambers"],
              ["30", "Chosen"],
            ].map(([v, l]) => (
              <li
                key={l}
                className="rounded-xl border border-emerald-500/15 bg-black/40 px-2 py-3 backdrop-blur"
              >
                <div className="font-mono text-lg text-emerald-200">{v}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400/70">
                  {l}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="order-1 flex justify-center md:order-2"
        >
          <div className="relative w-full max-w-md">
            <RuneRing />
            <Guardian scale={1} speaking={isSpeaking} />
          </div>
        </motion.div>
      </div>
    </SceneWrap>
  );
}

function RegisterScene({
  onComplete,
  speak,
  isSpeaking,
}: {
  onComplete: (name: string) => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
}) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    speak("Identify yourself. Type the name you will be judged by. It will be etched into the seventh seal if you survive.");
    inputRef.current?.focus();
  }, [speak]);

  return (
    <SceneWrap>
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[1fr_360px]">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
            Identify yourself
          </div>
          <h2 className="font-serif text-3xl leading-tight text-emerald-50 sm:text-4xl md:text-5xl">
            The Guardian awaits a name.
          </h2>
          <p className="mt-4 max-w-md text-emerald-100/70">
            Type the name you will be judged by. It will be etched into the
            seventh seal if you survive.
          </p>
          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              const trimmed = name.trim();
              if (trimmed.length >= 2) onComplete(trimmed);
            }}
          >
            <div className="relative">
              <input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                placeholder="Your name"
                className="w-full rounded-xl border border-emerald-400/30 bg-black/50 px-5 py-4 font-serif text-2xl tracking-wide text-emerald-50 placeholder:text-emerald-500/40 outline-none backdrop-blur transition focus:border-emerald-300 focus:shadow-[0_0_30px_rgba(52,211,153,0.35)]"
              />
              <span className="pointer-events-none absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <ActionButton disabled={name.trim().length < 2}>
                Enter the chambers →
              </ActionButton>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300/50">
                No turning back
              </span>
            </div>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mx-auto w-full max-w-xs"
        >
          <RuneRing small />
          <Guardian scale={0.85} speaking={isSpeaking} />
        </motion.div>
      </div>
    </SceneWrap>
  );
}

function BriefingScene({
  state,
  onEnter,
  speak,
  isSpeaking,
}: {
  state: SaveState;
  onEnter: () => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
}) {
  const chamber = CHAMBERS[state.step];

  useEffect(() => {
    speak(`Chamber ${state.step + 1}. ${chamber.name}. The stone shifts, a new seal opens. Enter the chamber.`);
  }, [speak, state.step, chamber.name]);

  return (
    <SceneWrap>
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[320px_1fr]">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="mx-auto w-full max-w-xs"
        >
          <RuneRing small />
          <Guardian scale={0.9} speaking={isSpeaking} />
        </motion.div>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
            {chamber.title} · {String(state.step + 1).padStart(2, "0")} / 07
          </div>
          <div className="mb-2 flex items-baseline gap-3">
            <span className="text-4xl text-emerald-300">{chamber.sigil}</span>
            <h2 className="font-serif text-3xl leading-tight text-emerald-50 sm:text-4xl md:text-5xl">
              {chamber.name}
            </h2>
          </div>
          <p className="mt-4 max-w-xl text-emerald-100/75">
            The stone shifts. A new seal opens. The Guardian steps aside and
            gestures forward. Take one breath — and enter.
          </p>
          <ChamberDots step={state.step} history={state.history} />
          <div className="mt-8">
            <ActionButton onClick={onEnter}>Enter the chamber →</ActionButton>
          </div>
        </motion.div>
      </div>
    </SceneWrap>
  );
}

function ChamberScene({
  chamberIndex,
  onAnswer,
  speak,
  isSpeaking,
}: {
  chamberIndex: number;
  onAnswer: (choice: number) => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
}) {
  const chamber = CHAMBERS[chamberIndex];
  const [hover, setHover] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(45);
  const [hintOpen, setHintOpen] = useState(false);

  useEffect(() => {
    speak(chamber.question);
  }, [speak, chamber.question]);

  useEffect(() => {
    if (hintOpen) {
      speak(chamber.hint);
    }
  }, [hintOpen, speak, chamber.hint]);

  useEffect(() => {
    if (locked !== null) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [locked]);

  useEffect(() => {
    if (seconds === 0 && locked === null) {
      setLocked(-1);
      const t = setTimeout(() => onAnswer(-1), 700);
      return () => clearTimeout(t);
    }
  }, [seconds, locked, onAnswer]);

  const timePct = (seconds / 45) * 100;
  return (
    <SceneWrap>
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-[260px_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-[220px] md:max-w-none"
        >
          <Guardian scale={0.75} speaking={isSpeaking} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-black/70 via-black/60 to-emerald-950/50 p-6 shadow-[0_30px_120px_-20px_rgba(16,185,129,0.4)] backdrop-blur-xl sm:p-8"
        >
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
              {chamber.title}
            </div>
            <div className="font-mono text-xs text-emerald-200">
              {String(seconds).padStart(2, "0")}s
            </div>
          </div>
          <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-emerald-950/70">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-300"
              animate={{ width: `${timePct}%` }}
              transition={{ duration: 0.4, ease: "linear" }}
            />
          </div>
          <h3 className="mt-6 font-serif text-2xl leading-snug text-emerald-50 sm:text-3xl">
            {chamber.question}
          </h3>
          <ul className="mt-6 grid gap-3">
            {chamber.options.map((opt, i) => {
              const active = hover === i;
              const isLocked = locked === i;
              return (
                <li key={i}>
                  <button
                     disabled={locked !== null}
                     onMouseEnter={() => setHover(i)}
                     onMouseLeave={() => setHover(null)}
                     onClick={() => {
                       if (locked !== null) return;
                       setLocked(i);
                       setTimeout(() => onAnswer(i), 650);
                     }}
                     className={`group relative flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all ${
                       isLocked
                         ? "border-emerald-300 bg-emerald-500/20"
                         : active
                           ? "border-emerald-400/60 bg-emerald-500/10"
                           : "border-emerald-500/20 bg-black/40 hover:border-emerald-400/60 hover:bg-emerald-500/10"
                     }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border font-mono text-sm ${
                        isLocked
                          ? "border-emerald-200 bg-emerald-400/20 text-emerald-100"
                          : "border-emerald-500/40 bg-black/60 text-emerald-300 group-hover:border-emerald-300"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-base leading-snug text-emerald-50 sm:text-lg">
                      {opt}
                    </span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/50 opacity-0 transition group-hover:opacity-100">
                      select →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setHintOpen((v) => !v)}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300/70 hover:text-emerald-200 cursor-pointer"
            >
              {hintOpen ? "▾ Guardian whispers" : "▸ Ask the Guardian"}
            </button>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300/40">
              A hint costs no XP tonight
            </div>
          </div>
          <AnimatePresence>
            {hintOpen && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden text-sm italic text-emerald-200/80"
              >
                “{chamber.hint}”
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SceneWrap>
  );
}

function VerdictScene({
  correct,
  chamberId,
  state,
  onContinue,
  speak,
  isSpeaking,
}: {
  correct: boolean;
  chamberId: number;
  state: SaveState;
  onContinue: () => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
}) {
  const chamber = CHAMBERS.find((c) => c.id === chamberId)!;
  const done = state.step >= 7;

  useEffect(() => {
    if (correct) {
      speak("You passed the trial. The seal opens.");
    } else {
      speak(`The chamber holds its silence. The path continues, but the ${chamber.name.toLowerCase()} will remain unfinished.`);
    }
  }, [speak, correct, chamber.name]);

  return (
    <SceneWrap>
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[320px_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-[260px]"
        >
          <div
            className={`absolute inset-0 -z-10 blur-3xl ${
              correct ? "bg-emerald-500/30" : "bg-red-500/25"
            }`}
          />
          <Guardian scale={0.85} speaking={isSpeaking} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div
            className={`font-mono text-[10px] uppercase tracking-[0.5em] ${
              correct ? "text-emerald-300" : "text-red-300"
            }`}
          >
            {correct ? "The seal opens" : "The seal resists"}
          </div>
          <h2 className="mt-2 font-serif text-4xl leading-tight text-emerald-50 sm:text-5xl">
            {correct ? "You passed the trial." : "The chamber holds its silence."}
          </h2>
          <p className="mt-4 max-w-lg text-emerald-100/75">
            {correct
              ? "The Guardian inclines his head. A soft resonance moves through the stone. You move on."
              : `The Guardian does not turn away. The path continues, but the ${chamber.name.toLowerCase()} will remain unfinished.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ResultChip label="Passed" value={`${state.correct}/${state.attempted}`} />
            <ResultChip label="XP" value={state.xp} />
            <ResultChip label="Streak" value={state.streak} />
          </div>
          <div className="mt-8">
            <ActionButton onClick={onContinue}>
              {done ? "See the verdict →" : "Continue →"}
            </ActionButton>
          </div>
        </motion.div>
      </div>
    </SceneWrap>
  );
}

function FinalScene({
  state,
  onRestart,
  speak,
  isSpeaking,
}: {
  state: SaveState;
  onRestart: () => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
}) {
  const passed = state.correct >= 5; // among the thirty
  const rank = passed
    ? Math.max(1, 31 - Math.min(30, state.correct * 5 + Math.floor(state.xp / 60)))
    : null;

  useEffect(() => {
    if (passed) {
      speak(`You are one of the Thirty, ${state.name}. Your name is etched into the seventh seal at rank ${rank}. Return when the next signal comes.`);
    } else {
      speak(`You cleared ${state.correct} of seven trials. The Guardian holds your name in shadow. The chambers will reopen when you are ready.`);
    }
  }, [speak, passed, state.name, state.correct, rank]);

  return (
    <SceneWrap>
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="mx-auto w-full max-w-md"
        >
          <RuneRing />
          <Guardian scale={1} speaking={isSpeaking} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
            The Seventh Seal · Final Verdict
          </div>
          <h2 className="mt-2 font-serif text-5xl leading-[1.02] tracking-tight text-emerald-50 sm:text-6xl">
            {passed ? (
              <>
                You are one of{" "}
                <span className="italic text-emerald-300">the Thirty.</span>
              </>
            ) : (
              <>
                The chambers <span className="italic text-emerald-300">remember you.</span>
              </>
            )}
          </h2>
          <p className="mt-5 max-w-lg text-emerald-100/75">
            {passed
              ? `The Guardian steps aside. Your name — ${state.name} — is etched into the seventh seal at rank #${rank}. Return when the next signal comes.`
              : `You cleared ${state.correct} of 7 trials. The Guardian holds your name in shadow. The chambers will reopen when you are ready.`}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <FinalStat label="Trials passed" value={`${state.correct}/7`} />
            <FinalStat label="Total XP" value={state.xp} />
            <FinalStat label="Best streak" value={state.streak} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionButton onClick={onRestart}>Face the chambers again</ActionButton>
          </div>
        </motion.div>
      </div>
    </SceneWrap>
  );
}

/* ---------- Small parts ---------- */

function ActionButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-emerald-400/60 bg-gradient-to-b from-emerald-500/30 to-emerald-700/20 px-6 py-3 font-mono text-sm uppercase tracking-[0.25em] text-emerald-50 shadow-[0_10px_40px_-10px_rgba(52,211,153,0.6)] transition hover:from-emerald-400/40 hover:to-emerald-600/30 hover:shadow-[0_10px_60px_-5px_rgba(52,211,153,0.8)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent opacity-0 transition group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function ResultChip({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-black/40 px-4 py-2 backdrop-blur">
      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-300/60">
        {label}
      </div>
      <div className="font-mono text-lg text-emerald-100">{value}</div>
    </div>
  );
}

function FinalStat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border border-emerald-500/25 bg-black/50 p-3 text-center backdrop-blur">
      <div className="font-mono text-2xl text-emerald-200">{value}</div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400/70">
        {label}
      </div>
    </div>
  );
}

function ChamberDots({
  step,
  history,
}: {
  step: number;
  history: SaveState["history"];
}) {
  return (
    <ol className="mt-6 flex items-center gap-2">
      {CHAMBERS.map((c, i) => {
        const done = history.find((h) => h.id === c.id);
        const current = i === step;
        return (
          <li
            key={c.id}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 font-mono text-xs transition ${
              done
                ? done.correct
                  ? "border-emerald-300 bg-emerald-500/25 text-emerald-100"
                  : "border-red-400/60 bg-red-500/20 text-red-100"
                : current
                  ? "border-emerald-300 bg-black/60 text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
                  : "border-emerald-500/20 bg-black/40 text-emerald-500/50"
            }`}
          >
            {c.sigil}
          </li>
        );
      })}
    </ol>
  );
}

function RuneRing({ small = false }: { small?: boolean }) {
  const size = small ? 260 : 380;
  const runes = useMemo(
    () => Array.from({ length: 12 }).map((_, i) => i),
    []
  );
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-emerald-400/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-emerald-300/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-14 rounded-full border border-dashed border-emerald-500/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
      {runes.map((i) => {
        const angle = (i / runes.length) * Math.PI * 2;
        const r = size / 2 - 6;
        const x = Math.cos(angle) * r + size / 2;
        const y = Math.sin(angle) * r + size / 2;
        return (
          <span
            key={i}
            className="absolute font-mono text-[10px] text-emerald-300/60"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%,-50%)",
            }}
          >
            {["◈", "◊", "△", "⌘", "◉", "☾", "✦"][i % 7]}
          </span>
        );
      })}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.15), transparent 65%)",
        }}
      />
    </div>
  );
}
