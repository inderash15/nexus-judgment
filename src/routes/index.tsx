import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import guardianAsset from "@/assets/guardian-hero.png";
import guardianApocalypse from "@/assets/guardian-apocalypse.png";
import candidatesBattlefield from "@/assets/candidates-battlefield.png";
import introVideo from "@/assets/Cosmic_guardian_with_green_energy_202607222222.mp4";
import { Guardian } from "@/components/Guardian";
import { Atmosphere } from "@/components/Atmosphere";
import { useGuardianVoice } from "@/hooks/useGuardianVoice";
import { registerOrResumeStudent, submitGuess, adminGetDashboardData } from "@/lib/server-fns";
import { DBStudent, DBQuestion } from "@/lib/db";
import { Trophy, Shield, User, Clock, AlertOctagon, Heart, HelpCircle, Volume2, VolumeX, XCircle, Award, Percent, Hourglass, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guardian of Shadows — The Shadow Realm Trial" },
      {
        name: "description",
        content: "Solve the hidden words. Escape the Shadow Realm. One attempt. Zero margin for error.",
      },
    ],
  }),
  component: LastCandidate,
});

type Scene =
  | "boot"
  | "cinematic"
  | "intro"
  | "register"
  | "briefing"
  | "chamber"
  | "verdict"
  | "final"
  | "gameover";

const LOCAL_EMAIL_KEY = "last-candidate:email:v4";

function LastCandidate() {
  const [hydrated, setHydrated] = useState(false);
  const [scene, setScene] = useState<Scene>("boot");
  const [student, setStudent] = useState<DBStudent | null>(null);
  const [assignedQuestions, setAssignedQuestions] = useState<DBQuestion[]>([]);
  const [verdictCorrect, setVerdictCorrect] = useState(true);
  
  // Cinematic Death State
  const [deathTriggered, setDeathTriggered] = useState(false);
  const [deathPhase, setDeathPhase] = useState(0); // 0: none, 1: shaking & glow, 2: dark overlay, 3: disqualified text

  // Modal Views
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<DBStudent[]>([]);

  const { voiceEnabled, toggleVoice, isSpeaking, speak, stop } = useGuardianVoice();

  // Load state on mount
  useEffect(() => {
    setHydrated(true);
    const email = localStorage.getItem(LOCAL_EMAIL_KEY);
    if (email) {
      resumeSession(email);
    }
  }, []);

  const resumeSession = async (email: string) => {
    try {
      const res = await registerOrResumeStudent({ data: { name: "", email, department: "" } });
      if (res.error) {
        console.warn("Session resume bypassed:", res.error);
        localStorage.removeItem(LOCAL_EMAIL_KEY);
        return;
      }
      if (res.student) {
        setStudent(res.student);
        setAssignedQuestions(res.questions);
        
        if (res.student.locked) {
          if (res.student.status === "Eliminated" || res.student.status === "Disqualified") {
            setScene("gameover");
          } else {
            setScene("final");
          }
        } else {
          setScene("briefing");
        }
      }
    } catch (err) {
      console.error("Session resume failed", err);
      localStorage.removeItem(LOCAL_EMAIL_KEY);
    }
  };

  const handleRegister = async (name: string, email: string, department: string) => {
    try {
      const res = await registerOrResumeStudent({ data: { name, email, department } });
      if (res.error) {
        alert("Registration failed: " + res.error);
        return;
      }
      if (res.student) {
        setStudent(res.student);
        setAssignedQuestions(res.questions);
        localStorage.setItem(LOCAL_EMAIL_KEY, res.student.email);
        
        if (res.student.locked) {
          if (res.student.status === "Eliminated" || res.student.status === "Disqualified") {
            setScene("gameover");
          } else {
            setScene("final");
          }
        } else {
          setScene("briefing");
        }
      }
    } catch (err) {
      alert("Registration failed: " + err);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const res = await adminGetDashboardData();
      setLeaderboardData(res.students);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (showLeaderboard) {
      loadLeaderboard();
    }
  }, [showLeaderboard]);

  const currentQuestion = useMemo(() => {
    if (!student || assignedQuestions.length === 0) return null;
    return assignedQuestions[student.currentLevel - 1] || null;
  }, [student, assignedQuestions]);

  const handleGuessLetter = async (char: string) => {
    if (!student) return;
    try {
      const res = await submitGuess({ data: { email: student.email, guess: char } });
      const prevWrong = student.wrongAnswersCount;
      const prevLevel = student.currentLevel;
      
      setStudent(res.student);
      setAssignedQuestions(res.questions);

      const isIncorrect = res.student.wrongAnswersCount > prevWrong;

      if (res.student.status === "Eliminated") {
        triggerDeathSequence();
      } else if (isIncorrect) {
        // Play punishment voice depending on wrong count
        if (res.student.wrongAnswersCount === 1) {
          speak("Your confidence exceeds your intelligence.", "warning");
        } else if (res.student.wrongAnswersCount === 2) {
          speak("You are not worthy of entering deeper into this realm.", "warning");
        } else if (res.student.wrongAnswersCount === 3) {
          speak("THE SHADOWS HAVE REJECTED YOU.", "wrong");
        }
      } else {
        // Correct letter guess, check if level advanced
        if (res.student.currentLevel > prevLevel || res.student.status === "Qualified" || res.student.status === "Completed") {
          setVerdictCorrect(true);
          setScene("verdict");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const triggerDeathSequence = () => {
    setDeathTriggered(true);
    setDeathPhase(1);
    speak("ACCESS TERMINATED. YOU HAVE BEEN ELIMINATED FROM THE SHADOW REALM.", "wrong");

    // Phase 1: Shaking, glowing eyes (0 - 1.5s)
    setTimeout(() => {
      setDeathPhase(2);
    }, 1500);

    // Phase 2: Fade to dark black (1.5s - 3s)
    setTimeout(() => {
      setDeathPhase(3);
    }, 3000);

    // Phase 3: Transition to GameOver Screen
    setTimeout(() => {
      setDeathTriggered(false);
      setDeathPhase(0);
      setScene("gameover");
    }, 5000);
  };

  return (
    <main className={`relative min-h-screen w-full overflow-hidden text-emerald-50 font-sans antialiased transition-all duration-1000 ${
      deathTriggered && deathPhase >= 1 ? "animate-shake bg-red-950/20" : ""
    } ${student && student.wrongAnswersCount === 2 ? "bg-black/90 brightness-75" : ""} ${
      student && student.wrongAnswersCount >= 3 ? "bg-black brightness-50" : "bg-zinc-950"
    }`}>
      <Atmosphere speaking={isSpeaking} />

      {/* Cinematic Death Overlay */}
      <AnimatePresence>
        {deathTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-center px-4"
          >
            {deathPhase === 1 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
              >
                <div className="text-red-500 font-extrabold text-7xl tracking-widest animate-pulse">ACCESS TERMINATED</div>
                <div className="h-1 bg-red-600 w-64 mx-auto animate-width" />
              </motion.div>
            )}

            {deathPhase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h1 className="text-red-500 font-serif text-4xl sm:text-6xl tracking-tight leading-none uppercase">
                  YOU HAVE BEEN ELIMINATED
                </h1>
                <p className="text-red-400/70 font-mono text-sm tracking-[0.2em] uppercase">
                  FROM THE SHADOW REALM
                </p>
                {deathPhase >= 3 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-red-600 font-black text-8xl tracking-widest mt-8 font-mono animate-ping"
                    style={{ animationDuration: "2s" }}
                  >
                    DISQUALIFIED
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global HUD Header */}
      <TopHud
        student={student}
        scene={scene}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenProfile={() => setShowProfile(true)}
        voiceEnabled={voiceEnabled}
        onToggleVoice={toggleVoice}
      />

      {/* Global Imposing Guardian standing physically in the Shadow Realm */}
      {!["boot", "cinematic"].includes(scene) && (
        <div className="fixed right-[1%] bottom-0 w-[95%] md:w-[58%] h-[60vh] md:h-[90vh] pointer-events-none z-0 md:z-10 flex items-end justify-center select-none opacity-20 md:opacity-100 transition-opacity duration-700">
          <Guardian
            scale={1.05}
            speaking={isSpeaking}
            state={
              scene === "gameover" ? "death" :
              scene === "final" ? "selected" :
              scene === "verdict" ? "success" :
              scene === "briefing" ? "idle" :
              scene === "chamber" ? (
                student && student.wrongAnswersCount >= 3 ? "angry" :
                student && student.wrongAnswersCount >= 1 ? "warning" : "floating"
              ) : "idle"
            }
          />
        </div>
      )}

      <div className={`relative z-20 w-full min-h-screen flex items-center ${
        !["boot", "cinematic"].includes(scene) 
          ? "md:w-[42%] lg:w-[38%] justify-start md:pl-12 lg:pl-16 px-6" 
          : "justify-center px-4"
      }`}>
        <AnimatePresence mode="wait">
          {scene === "boot" && (
            <BootScene
              key="boot"
              onComplete={() => setScene("cinematic")}
              speak={speak}
              voiceEnabled={voiceEnabled}
              toggleVoice={toggleVoice}
            />
          )}
          {scene === "cinematic" && (
            <CinematicScene
              key="cinematic"
              onComplete={() => setScene("intro")}
              speak={speak}
            />
          )}
          {scene === "intro" && (
            <IntroScene
              key="intro"
              onBegin={() => setScene(student ? "briefing" : "register")}
              hasSave={Boolean(student)}
              candidateName={student?.name || ""}
              speak={speak}
              isSpeaking={isSpeaking}
            />
          )}
          {scene === "register" && (
            <RegisterScene
              key="register"
              onComplete={handleRegister}
              speak={speak}
              isSpeaking={isSpeaking}
            />
          )}
          {scene === "briefing" && student && (
            <BriefingScene
              key="briefing"
              student={student}
              onEnter={() => setScene("chamber")}
              speak={speak}
              isSpeaking={isSpeaking}
            />
          )}
          {scene === "chamber" && student && currentQuestion && (
            <ChamberScene
              key={`chamber-${student.currentLevel}`}
              student={student}
              question={currentQuestion}
              onGuessLetter={handleGuessLetter}
              speak={speak}
              isSpeaking={isSpeaking}
            />
          )}
          {scene === "verdict" && student && (
            <VerdictScene
              key={`verdict-${student.levelsCompleted}`}
              student={student}
              onContinue={() => {
                if (student.locked) {
                  setScene("final");
                } else {
                  setScene("briefing");
                }
              }}
              speak={speak}
              isSpeaking={isSpeaking}
            />
          )}
          {scene === "final" && student && (
            <FinalScene
              key="final"
              student={student}
              speak={speak}
              isSpeaking={isSpeaking}
              onRestart={() => {
                localStorage.removeItem("student_email");
                setStudent(null);
                setScene("register");
              }}
              onReturnHome={() => {
                localStorage.removeItem("student_email");
                setStudent(null);
                setScene("intro");
              }}
            />
          )}
          {scene === "gameover" && student && (
            <GameOverScene
              key="gameover"
              student={student}
              speak={speak}
              isSpeaking={isSpeaking}
              onTryAgain={() => {
                localStorage.removeItem("student_email");
                setStudent(null);
                setScene("register");
              }}
              onReturnHome={() => {
                localStorage.removeItem("student_email");
                setStudent(null);
                setScene("intro");
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Leaderboard Modal */}
      <AnimatePresence>
        {showLeaderboard && (
          <LeaderboardModal
            data={leaderboardData}
            currentEmail={student?.email}
            onClose={() => setShowLeaderboard(false)}
          />
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && student && (
          <ProfileModal
            student={student}
            onClose={() => setShowProfile(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ---------- HUD ---------- */

function TopHud({
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
  if (scene === "boot" || scene === "intro" || scene === "register" || scene === "cinematic") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 sm:px-8 sm:pt-6 pointer-events-none"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-black/70 px-4 py-2 backdrop-blur-xl pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400/80 sm:text-xs">
            Guardian Trial
          </div>
          {student && (
            <div className="text-xs font-semibold tracking-wide text-emerald-100 hidden sm:block">
              {student.name}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {student && (
            <>
              {/* Level Progress */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-emerald-400/60">Level</span>
                <span className="font-mono text-xs font-bold text-emerald-300">
                  {student.status === "Completed" || student.status === "Qualified" ? "7/7" : `${student.currentLevel}/7`}
                </span>
              </div>

              {/* XP */}
              <div className="flex flex-col items-end leading-none">
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-emerald-400/50">XP Score</span>
                <span className="font-mono text-xs text-emerald-100 font-bold">{student.score}</span>
              </div>

              {/* Lives / Wrong Guesses Skulls */}
              <div className="flex items-center gap-1">
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
          <div className="flex items-center gap-1.5 border-l border-emerald-500/20 pl-3">
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

function BootScene({
  onComplete,
  speak,
  voiceEnabled,
  toggleVoice,
}: {
  onComplete: () => void;
  speak: (text: string) => void;
  voiceEnabled: boolean;
  toggleVoice: () => void;
}) {
  const [stage, setStage] = useState<"click-to-start" | "loading" | "ready">("click-to-start");
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const startBoot = () => {
    setStage("loading");
    if (!voiceEnabled) {
      toggleVoice();
    }

    setTimeout(() => {
      speak("Establishing link with Sector 0 7. Decrypting seals. Standing by for selection.");
    }, 100);
    
    const logTimeline = [
      { delay: 300, text: "> CONNECTING TO SHADOW REALM CONTROLLER..." },
      { delay: 800, text: "> INITIALIZING GUARDIAN DIALOGUE MATRIX... OK" },
      { delay: 1400, text: "> LOADING DYNAMIC CIPHER LIBRARIES..." },
      { delay: 2000, text: "> ESTABLISHING ONE-RETRIAL ACCOUNT INTEGRITY SEALS..." },
      { delay: 2700, text: "> RANDOMIZING INTEL WORKSPACE QUESTIONS... READY" },
      { delay: 3400, text: "> SECURITY VIGILANCE MODULE: ACTIVE" },
      { delay: 4000, text: "> SECTOR SYSTEM FULLY INJECTED. ENTER THE TRIAL NOW." },
    ];

    logTimeline.forEach((item) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, item.text]);
      }, item.delay);
    });

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 80);

    setTimeout(() => {
      setStage("ready");
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 4800);
  };

  return (
    <SceneWrap>
      {stage === "click-to-start" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="relative mx-auto mb-8 h-24 w-24 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-emerald-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-emerald-400/25"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <div className="h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.9)] animate-pulse" />
          </div>

          <h2 className="mb-2 font-serif text-3xl sm:text-4xl tracking-widest text-emerald-100">
            GUARDIAN OF SHADOWS
          </h2>
          <p className="mb-8 font-mono text-[10px] sm:text-xs text-emerald-400/70 tracking-[0.4em] uppercase">
            Sector 07 // Intelligence Vault
          </p>
          <button
            onClick={startBoot}
            className="group relative overflow-hidden rounded-xl border border-emerald-400/60 bg-gradient-to-b from-emerald-500/20 to-emerald-700/10 px-8 py-4 font-mono text-sm uppercase tracking-[0.3em] text-emerald-100 shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:shadow-[0_0_50px_rgba(52,211,153,0.6)] hover:from-emerald-400/30 hover:to-emerald-600/20 transition cursor-pointer"
          >
            Enter the Shadow Realm
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "brightness(2)" }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg rounded-2xl border border-emerald-500/20 bg-black/80 p-6 font-mono text-xs backdrop-blur-md shadow-[0_0_60px_rgba(16,185,129,0.15)] text-left"
        >
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4">
            <span className="text-emerald-400/80 uppercase tracking-widest text-[10px] sm:text-xs">System Boot Sequence</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
              <span className="text-[10px] text-emerald-300">ONLINE</span>
            </div>
          </div>

          <div className="h-44 overflow-y-auto space-y-2 text-emerald-300/80 text-[11px] sm:text-xs">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {log}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 border-t border-emerald-500/10 pt-4">
            <div className="flex justify-between text-[10px] text-emerald-400/70 mb-1.5">
              <span>DECRYPTING SECURE MATRIX</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-emerald-950/70 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </SceneWrap>
  );
}

function CinematicScene({
  onComplete,
  speak,
}: {
  onComplete: () => void;
  speak: (text: string) => void;
}) {
  const [subtitle, setSubtitle] = useState("");
  const speakRef = useRef(speak);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    speakRef.current = speak;
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const timelines = [
      {
        delay: 500,
        text: "The Guardian stands vigil over the Shadow Realm.",
        sub: "“The Guardian stands vigil over the Shadow Realm...”",
      },
      {
        delay: 4500,
        text: "Intelligence is your only shield. One mistake holds eternal penalty.",
        sub: "“Intelligence is your only shield. One mistake holds eternal penalty.”",
      },
      {
        delay: 9000,
        text: "Solve the word chambers. Survive, or be disqualified forever.",
        sub: "“Solve the word chambers. Survive, or be disqualified forever.”",
      },
    ];

    const timeouts = timelines.flatMap((item) => [
      setTimeout(() => {
        speakRef.current(item.text);
      }, item.delay),
      setTimeout(() => {
        setSubtitle(item.sub);
      }, item.delay),
    ]);

    const fallbackTimeout = setTimeout(() => {
      onCompleteRef.current();
    }, 14000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none">
      <video
        src={introVideo}
        autoPlay
        muted
        playsInline
        onEnded={() => onCompleteRef.current()}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-85" />
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.65)) pointer-events-none" />

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-2xl w-full text-center px-4 pointer-events-none z-10">
        <AnimatePresence mode="wait">
          {subtitle && (
            <motion.p
              key={subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-lg sm:text-2xl leading-relaxed text-emerald-50 italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
            >
              {subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={onComplete}
        className="absolute top-4 right-4 z-50 flex items-center gap-1.5 rounded-xl border border-emerald-500/25 bg-black/40 px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider text-emerald-300 backdrop-blur-md transition hover:border-emerald-400/50 hover:bg-emerald-500/10 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
      >
        Skip Cinematic
      </button>
    </div>
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
  speak: (text: string, emotion?: any) => void;
  isSpeaking: boolean;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("Many have entered this realm. Very few have survived. Intelligence is your only weapon. One mistake will have consequences.", "normal");
      hasSpoken.current = true;
    }
  }, [speak]);

  return (
    <SceneWrap>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full max-w-md text-left"
      >
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
          TRANSMISSION // SHADOW REALM
        </div>
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-emerald-50 sm:text-5xl md:text-6xl">
          The Guardian's{" "}
          <span className="italic text-emerald-300">Judgment.</span>
        </h1>
        <p className="mt-6 text-base leading-relaxed text-emerald-100/80 sm:text-lg">
          A hangman trial of raw tech intelligence. Seven words stand between you and validation. Make four mistakes, and your account will be locked forever.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ActionButton onClick={onBegin}>
            {hasSave
              ? `Resume Trial, ${candidateName.split(" ")[0]}`
              : "Submit to Trial"}
          </ActionButton>
        </div>
      </motion.div>
    </SceneWrap>
  );
}

function RegisterScene({
  onComplete,
  speak,
  isSpeaking,
}: {
  onComplete: (name: string, email: string, department: string) => void;
  speak: (text: string, emotion?: any) => void;
  isSpeaking: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("Identify yourself. Write your credentials in the matrix to bind your singular attempt.", "normal");
      hasSpoken.current = true;
    }
  }, [speak]);

  return (
    <SceneWrap>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md text-left"
      >
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
          Acknowledge Identity
        </div>
        <h2 className="font-serif text-3xl leading-tight text-emerald-50 sm:text-4xl">
          Input Credentials.
        </h2>
        <p className="mt-3 text-sm text-emerald-100/60">
          Your name, official email, and department will bind this single attempt to the global ledger. Retakes are strictly locked.
        </p>
        <form
          className="mt-6 space-y-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim().length >= 2 && email.includes("@") && dept.trim().length >= 2) {
              onComplete(name.trim(), email.trim(), dept.trim());
            }
          }}
        >
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              required
              placeholder="Full Name"
              className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-3 font-sans text-sm text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={50}
              required
              placeholder="Official Email Address"
              className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-3 font-sans text-sm text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
            />
          </div>
          <div>
            <input
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              maxLength={40}
              required
              placeholder="Department"
              className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-3 font-sans text-sm text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
            />
          </div>
          <div className="pt-2 flex items-center gap-4">
            <ActionButton disabled={name.trim().length < 2 || !email.includes("@") || dept.trim().length < 2}>
              Initiate Judgment →
            </ActionButton>
          </div>
        </form>
      </motion.div>
    </SceneWrap>
  );
}

function BriefingScene({
  student,
  onEnter,
  speak,
  isSpeaking,
}: {
  student: DBStudent;
  onEnter: () => void;
  speak: (text: string, emotion?: any) => void;
  isSpeaking: boolean;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(`Level ${student.currentLevel}. Prepare your intellect. The gates are shifting.`, "success");
      hasSpoken.current = true;
    }
  }, [speak, student.currentLevel]);

  return (
    <SceneWrap>
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full max-w-md space-y-4 text-left"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/80">
          Level {String(student.currentLevel).padStart(2, "0")} / 07
        </div>
        <h2 className="font-serif text-3xl leading-tight text-emerald-50 sm:text-5xl">
          Entering the Chamber of Code
        </h2>
        <p className="text-emerald-100/70 leading-relaxed">
          The shadows part. The Guardian watches with cold, analytical focus. A hidden word waits behind the seal. Fail to solve it, and the void will consume your attempt.
        </p>
        <div className="pt-4">
          <ActionButton onClick={onEnter}>Face the Guardian →</ActionButton>
        </div>
      </motion.div>
    </SceneWrap>
  );
}

function ChamberScene({
  student,
  question,
  onGuessLetter,
  speak,
  isSpeaking,
}: {
  student: DBStudent;
  question: DBQuestion;
  onGuessLetter: (char: string) => void;
  speak: (text: string, emotion?: any) => void;
  isSpeaking: boolean;
}) {
  const [seconds, setSeconds] = useState(45);
  const [hintOpen, setHintOpen] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [inactiveAlert20, setInactiveAlert20] = useState(false);
  const [inactiveAlert40, setInactiveAlert40] = useState(false);
  const [guardianEmotionOverride, setGuardianEmotionOverride] = useState<string | null>(null);

  const resetInactivity = () => {
    setLastActivity(Date.now());
    setInactiveAlert20(false);
    setInactiveAlert40(false);
    setGuardianEmotionOverride(null);
  };

  const handleGuess = (char: string) => {
    resetInactivity();
    onGuessLetter(char);
  };

  // Add event listeners for mousemove, keydown, click to reset inactivity
  useEffect(() => {
    const handleInteraction = () => {
      resetInactivity();
    };
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("click", handleInteraction);
    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  // Check inactivity every second
  useEffect(() => {
    const checkTimer = setInterval(() => {
      const elapsed = Date.now() - lastActivity;
      if (elapsed > 40000 && !inactiveAlert40) {
        setInactiveAlert40(true);
        speak("Time waits for no one.", "warning");
        setGuardianEmotionOverride("warning");
      } else if (elapsed > 20000 && !inactiveAlert20) {
        setInactiveAlert20(true);
        speak("Have the shadows frightened you?", "normal");
        setGuardianEmotionOverride("talking");
      }
    }, 1000);
    return () => clearInterval(checkTimer);
  }, [lastActivity, inactiveAlert20, inactiveAlert40, speak]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        if (!student.currentGuesses.includes(char)) {
          handleGuess(char);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [student.currentGuesses, onGuessLetter, lastActivity]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          handleGuess("-"); // Force wrong guess on timeout
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onGuessLetter, lastActivity]);

  useEffect(() => {
    if (hintOpen) {
      speak(question.hint, "warning");
    }
  }, [hintOpen, speak, question.hint]);

  // Word blanks
  const displayWord = useMemo(() => {
    return question.word.split("").map((c) => {
      if (student.currentGuesses.includes(c)) return c;
      if (c === " ") return " ";
      return "_";
    });
  }, [question.word, student.currentGuesses]);

  return (
    <SceneWrap>
      {/* Game Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-black/80 to-zinc-950 p-6 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-6 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/10 pb-4">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400/80">Category</span>
            <h4 className="text-sm font-extrabold text-emerald-200 tracking-wide">{question.category}</h4>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <Clock className="h-4.5 w-4.5 text-emerald-400" />
            <span className="font-bold text-emerald-100">{seconds}s</span>
          </div>
        </div>

        {/* Blanks */}
        <div className="flex justify-center flex-wrap gap-2 py-4">
          {displayWord.map((c, i) => (
            <span
              key={i}
              className={`font-mono text-3xl sm:text-5xl font-black w-8 sm:w-12 text-center border-b-2 transition ${
                c === "_" ? "border-emerald-500/40 text-transparent" : "border-emerald-400 text-emerald-100"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Virtual Keyboard */}
        <div className="grid grid-cols-7 sm:grid-cols-10 gap-1.5 sm:gap-2 justify-center max-w-xl mx-auto pt-2">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
            const guessed = student.currentGuesses.includes(letter);
            const correct = question.word.includes(letter);
            return (
              <button
                key={letter}
                disabled={guessed}
                onClick={() => handleGuess(letter)}
                className={`h-9 sm:h-11 rounded-lg font-mono text-xs sm:text-sm font-bold border transition cursor-pointer select-none ${
                  guessed
                    ? correct
                      ? "bg-emerald-600/30 border-emerald-500/40 text-emerald-300"
                      : "bg-red-950/40 border-red-900/40 text-red-500/50"
                    : "bg-black/50 border-emerald-500/20 text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-500/10"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Hint Trigger */}
        <div className="pt-4 flex items-center justify-between border-t border-emerald-500/10">
          <button
            onClick={() => setHintOpen(!hintOpen)}
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300/80 hover:text-emerald-200 cursor-pointer flex items-center gap-1"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            {hintOpen ? "Hide Whisper" : "Request Guardian Clue"}
          </button>
          <span className="font-mono text-[9px] text-emerald-500/50 uppercase">keyboard inputs accepted</span>
        </div>

        <AnimatePresence>
          {hintOpen && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs italic text-emerald-300/80 border-l border-emerald-500/30 pl-3 leading-relaxed font-medium"
            >
              “{question.hint}”
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </SceneWrap>
  );
}

function VerdictScene({
  student,
  onContinue,
  speak,
  isSpeaking,
}: {
  student: DBStudent;
  onContinue: () => void;
  speak: (text: string, emotion?: any) => void;
  isSpeaking: boolean;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("You solved the seal. You move deeper into the dark.", "success");
      hasSpoken.current = true;
    }
  }, [speak]);

  return (
    <SceneWrap>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md space-y-4 text-left"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400">
          Seal Solved
        </div>
        <h2 className="font-serif text-3xl leading-tight text-emerald-100 sm:text-5xl">
          You solved the code.
        </h2>
        <p className="text-emerald-100/70 leading-relaxed">
          The code resonates. The Guardian nods slightly, allowing you passage deeper into the Sector 07 chambers.
        </p>

        <div className="flex gap-4 pt-2">
          <div className="bg-black/60 border border-emerald-500/20 rounded-xl px-4 py-2 font-mono text-center">
            <div className="text-[9px] uppercase tracking-wider text-emerald-400/60">Current XP</div>
            <div className="text-lg font-bold text-emerald-100">{student.score} XP</div>
          </div>
          <div className="bg-black/60 border border-emerald-500/20 rounded-xl px-4 py-2 font-mono text-center">
            <div className="text-[9px] uppercase tracking-wider text-emerald-400/60">Level Finished</div>
            <div className="text-lg font-bold text-emerald-100">{student.levelsCompleted} / 7</div>
          </div>
        </div>

        {student.levelsCompleted === 7 && (
          <InlineLeaderboard currentEmail={student.email} />
        )}

        <div className="pt-4">
          <ActionButton onClick={onContinue}>
            {student.locked ? "Final Evaluation →" : "Proceed to next level →"}
          </ActionButton>
        </div>
      </motion.div>
    </SceneWrap>
  );
}

function FinalScene({
  student,
  speak,
  isSpeaking,
  onRestart,
  onReturnHome,
}: {
  student: DBStudent;
  speak: (text: string, emotion?: any) => void;
  isSpeaking: boolean;
  onRestart: () => void;
  onReturnHome: () => void;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(`You have finished all chambers. Your final score is ${student.score}. Your attempt is locked.`, "final");
      hasSpoken.current = true;
    }
  }, [speak, student.score]);

  return (
    <SceneWrap>
      <div className="w-full max-w-lg bg-black/75 border border-emerald-950/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl space-y-6 text-left shadow-[0_20px_50px_rgba(16,185,129,0.15)] animate-in fade-in duration-500">
        <div className="font-mono text-xs text-emerald-400 font-extrabold uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
          Trial Complete
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-emerald-100 font-bold uppercase drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
          Judgment Rendered
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed">
          Your credentials and final score have been submitted and locked to the system database. Retesting or resetting questions is disabled.
        </p>

        <div className="grid grid-cols-3 gap-3 w-full pt-2 font-mono">
          <div className="bg-black/70 border border-emerald-500/25 rounded-xl p-3">
            <div className="text-[9px] uppercase tracking-wider text-emerald-400/60">Total Score</div>
            <div className="text-lg font-black text-emerald-100">{student.score}</div>
          </div>
          <div className="bg-black/70 border border-emerald-500/25 rounded-xl p-3">
            <div className="text-[9px] uppercase tracking-wider text-emerald-400/60">Time Elapsed</div>
            <div className="text-sm font-black text-emerald-100 mt-1">{Math.floor(student.timeTaken / 60)}m {student.timeTaken % 60}s</div>
          </div>
          <div className="bg-black/70 border border-emerald-500/25 rounded-xl p-3">
            <div className="text-[9px] uppercase tracking-wider text-emerald-400/60">Status</div>
            <div className="text-xs font-black text-emerald-300 mt-1.5 uppercase">{student.status}</div>
          </div>
        </div>

        <InlineLeaderboard currentEmail={student.email} />

        <div className="flex gap-4 pt-4 w-full">
          <button
            onClick={onRestart}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            New Trial
          </button>
          <button
            onClick={onReturnHome}
            className="flex-1 py-3 border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Exit Terminal
          </button>
        </div>
      </div>
    </SceneWrap>
  );
}

function GameOverScene({
  student,
  speak,
  isSpeaking,
  onTryAgain,
  onReturnHome,
}: {
  student: DBStudent;
  speak: (text: string, emotion?: any) => void;
  isSpeaking: boolean;
  onTryAgain: () => void;
  onReturnHome: () => void;
}) {
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak("Account Terminated. You have been eliminated from the Shadow Realm.", "wrong");
      hasSpoken.current = true;
    }
  }, [speak]);

  // Formulate metrics for the premium glass log
  const wrongLetter = student.currentGuesses[student.currentGuesses.length - 1] || "N/A";
  const accuracyRate = student.attempts > 0 
    ? Math.round(((student.levelsCompleted || 1) / (student.attempts || 1)) * 100) 
    : 0;

  return (
    <SceneWrap>
      {/* Background backing glow for the info panel to make it pop */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_20%_40%,rgba(239,68,68,0.12),transparent_50%)]" />

      <div className="w-full max-w-lg bg-[#0a0b0e]/90 backdrop-blur-[24px] border border-red-500/40 p-8 rounded-[24px] space-y-7 text-left shadow-[0_30px_80px_rgba(239,68,68,0.25)] shadow-[inset_0_0_30px_rgba(239,68,68,0.08)] animate-in fade-in duration-500">
        <div className="font-mono text-xs text-red-400 font-black uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
          disqualified
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-red-500 font-black uppercase tracking-wider drop-shadow-[0_0_15px_rgba(239,68,68,0.85)] animate-pulse">
          YOU HAVE BEEN ELIMINATED
        </h2>
        <p className="text-zinc-100 text-sm leading-relaxed font-bold">
          Your account has been locked. The Guardian has deemed you unworthy of proceeding. No second chances or resets are permitted.
        </p>

        {/* Premium Glass Panel Log */}
        <div className="bg-[#121319]/80 backdrop-blur-md border border-red-500/35 rounded-2xl p-5 font-mono text-left w-full space-y-3.5 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]">
          <div className="text-xs text-red-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5 border-b border-red-900/30 pb-2">
            <AlertOctagon className="w-4 h-4 text-red-400 animate-pulse" />
            <span>Elimination Diagnostic Log</span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3.5 gap-x-5 text-[11px] text-zinc-200 font-bold leading-relaxed">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>Wrong Guess: <strong className="text-red-300 font-black uppercase">{wrongLetter}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-red-400 shrink-0" />
              <span>Failed Level: <strong className="text-red-300 font-black">{student.currentLevel} / 7</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-400 shrink-0" />
              <span>XP Earned: <strong className="text-red-300 font-black">{student.score} XP</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400 shrink-0" />
              <span>Total Time: <strong className="text-red-300 font-black">{Math.floor(student.timeTaken / 60)}m {student.timeTaken % 60}s</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-red-400 shrink-0" />
              <span>Accuracy: <strong className="text-red-300 font-black">{accuracyRate}%</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
              <span>Remaining Lives: <strong className="text-red-300 font-black">0 / 4</strong></span>
            </div>
          </div>
        </div>

        <InlineLeaderboard currentEmail={student.email} />

        <div className="flex gap-4 pt-2 w-full">
          <button
            onClick={onTryAgain}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={onReturnHome}
            className="flex-1 py-3 border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Return Home
          </button>
        </div>
      </div>
    </SceneWrap>
  );
}

/* ---------- Modals ---------- */

function LeaderboardModal({
  data,
  currentEmail,
  onClose,
}: {
  data: DBStudent[];
  currentEmail?: string;
  onClose: () => void;
}) {
  const sorted = useMemo(() => {
    return [...data].sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);
  }, [data]);

  const top3 = sorted.slice(0, 3);
  const top10 = sorted.slice(3, 10);
  const rest = sorted.slice(10);

  const stats = useMemo(() => {
    const userIdx = sorted.findIndex((s) => s.email === currentEmail);
    const userRank = userIdx !== -1 ? userIdx + 1 : null;
    const highest = sorted.length > 0 ? sorted[0].score : 0;
    return {
      total: sorted.length,
      userRank,
      highest,
    };
  }, [sorted, currentEmail]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-zinc-950 border border-emerald-500/20 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col font-mono text-xs shadow-2xl shadow-emerald-500/5"
      >
        <div className="p-4 border-b border-emerald-500/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-4.5 w-4.5 text-emerald-400" />
            <span className="font-bold text-emerald-200 uppercase tracking-widest">Global Standings</span>
          </div>
          <button onClick={onClose} className="text-emerald-400 hover:text-emerald-200 cursor-pointer">✕</button>
        </div>

        {/* Global summary chips */}
        <div className="grid grid-cols-3 border-b border-emerald-500/10 bg-black/40 text-center py-3 text-[10px] text-emerald-400/70">
          <div>TOTAL PARTICIPANTS: <span className="text-emerald-100 font-bold">{stats.total}</span></div>
          <div>YOUR RANK: <span className="text-emerald-100 font-bold">{stats.userRank ? `#${stats.userRank}` : "N/A"}</span></div>
          <div>HIGHEST SCORE: <span className="text-emerald-100 font-bold">{stats.highest} XP</span></div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Top 3 podium cards */}
          {top3.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {top3.map((student, idx) => {
                const colors = [
                  "border-amber-400/50 bg-amber-500/5 text-amber-300",
                  "border-slate-300/40 bg-slate-400/5 text-slate-300",
                  "border-amber-700/40 bg-amber-800/5 text-amber-600",
                ];
                return (
                  <div key={student.email} className={`border rounded-xl p-3 text-center flex flex-col items-center justify-between ${colors[idx] || ""}`}>
                    {idx === 0 && <span className="text-lg">👑</span>}
                    <div className="font-bold text-[10px] uppercase tracking-wider mt-1 mb-2 max-w-full truncate">{student.name}</div>
                    <div className="text-xs font-black">{student.score} XP</div>
                    <div className="text-[8px] opacity-60 mt-1">{student.department}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Top 10 cards */}
          {top10.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest mb-1.5">Top Contenders</div>
              {top10.map((student, idx) => (
                <div key={student.email} className="bg-black/50 border border-emerald-500/10 rounded-xl px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-emerald-400">#{idx + 4}</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-emerald-100">{student.name}</span>
                      <span className="text-[9px] text-emerald-500/60">{student.department}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-200">{student.score} XP</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Remaining ranks */}
          {rest.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <div className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest mb-1.5">Global Rankings</div>
              {rest.map((student, idx) => (
                <div key={student.email} className="bg-black/30 border border-emerald-500/5 rounded-lg px-4 py-2 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400/50 font-bold">#{idx + 11}</span>
                    <span className="text-emerald-300/80">{student.name}</span>
                  </div>
                  <span className="text-emerald-400/70">{student.score} XP</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ProfileModal({
  student,
  onClose,
}: {
  student: DBStudent;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-zinc-950 border border-emerald-500/20 rounded-2xl w-full max-w-sm overflow-hidden flex flex-col font-mono text-xs shadow-2xl"
      >
        <div className="p-4 border-b border-emerald-500/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4.5 w-4.5 text-emerald-400" />
            <span className="font-bold text-emerald-200 uppercase tracking-widest">Candidate Profile</span>
          </div>
          <button onClick={onClose} className="text-emerald-400 hover:text-emerald-200 cursor-pointer">✕</button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-emerald-500/60">Candidate Name</div>
            <div className="text-sm font-bold text-emerald-100">{student.name}</div>
          </div>

          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-emerald-500/60">Department</div>
            <div className="text-sm font-bold text-emerald-100">{student.department}</div>
          </div>

          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-emerald-500/60">Registered Email</div>
            <div className="text-xs text-emerald-200/80">{student.email}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-emerald-500/10">
            <div className="space-y-0.5">
              <div className="text-[8px] uppercase tracking-wider text-emerald-500/60">Completed Levels</div>
              <div className="text-sm font-bold text-emerald-100">{student.levelsCompleted} / 7</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[8px] uppercase tracking-wider text-emerald-500/60">Status Tag</div>
              <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-black uppercase mt-1 border ${
                student.status === "Qualified" ? "bg-emerald-500/10 border-emerald-400 text-emerald-300" :
                student.status === "Completed" ? "bg-purple-500/10 border-purple-400 text-purple-300" :
                student.status === "Eliminated" ? "bg-red-500/10 border-red-400 text-red-400" :
                "bg-blue-500/10 border-blue-400 text-blue-300"
              }`}>
                {student.status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Common Components ---------- */

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
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-emerald-400/60 bg-gradient-to-b from-emerald-500/30 to-emerald-700/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-emerald-50 shadow-[0_10px_40px_-10px_rgba(52,211,153,0.6)] transition hover:from-emerald-400/40 hover:to-emerald-600/30 hover:shadow-[0_10px_60px_-5px_rgba(52,211,153,0.8)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent opacity-0 transition group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function InlineLeaderboard({ currentEmail }: { currentEmail: string }) {
  const [leaderboard, setLeaderboard] = useState<DBStudent[]>([]);

  useEffect(() => {
    adminGetDashboardData()
      .then((res) => {
        setLeaderboard(res.students.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="pt-2 space-y-3.5 font-mono text-xs w-full">
      <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold flex items-center justify-between border-b border-emerald-500/20 pb-2 drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-emerald-400" />
          <span>Global Leadership Standings</span>
        </span>
        <span className="text-emerald-500/60 text-[9px] uppercase tracking-wider">Top 5</span>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {leaderboard.length === 0 ? (
          <div className="text-[10px] text-emerald-500/40 italic py-2.5 text-center border border-dashed border-emerald-500/10 rounded-xl">
            Connecting to ledger matrix...
          </div>
        ) : (
          leaderboard.slice(0, 5).map((s, idx) => {
            const isUser = s.email === currentEmail;
            
            // Gold, Silver, Bronze badges for top 3
            const rankStyles = 
              idx === 0 ? "border-[#FFD700]/30 text-yellow-300 bg-yellow-500/5 shadow-[0_0_12px_rgba(251,191,36,0.1)]" :
              idx === 1 ? "border-[#C0C0C0]/30 text-slate-350 bg-slate-300/5 shadow-[0_0_12px_rgba(203,213,225,0.1)]" :
              idx === 2 ? "border-[#CD7F32]/30 text-amber-600 bg-amber-800/5 shadow-[0_0_12px_rgba(180,83,9,0.1)]" :
              isUser ? "border-emerald-400/60 bg-emerald-500/5 shadow-[0_0_15px_rgba(52,211,153,0.15)]" : "border-emerald-500/10 bg-black/40";

            const rankBadgeColor =
              idx === 0 ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40" :
              idx === 1 ? "bg-slate-300/20 text-slate-300 border-slate-300/40" :
              idx === 2 ? "bg-amber-700/20 text-amber-500 border-amber-800/40" :
              "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";

            return (
              <div
                key={s.email}
                className={`px-3 py-2.5 border rounded-xl flex items-center justify-between transition-all hover:scale-[1.01] hover:border-emerald-500/35 hover:bg-black/50 ${rankStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded border text-[9px] font-black flex items-center justify-center ${rankBadgeColor}`}>
                    #{idx + 1}
                  </span>
                  
                  {/* Initials Avatar */}
                  <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[9px] font-black uppercase text-emerald-100">
                    {s.name.slice(0, 2)}
                  </div>

                  <div className="flex flex-col leading-tight">
                    <span className={`text-[11px] ${isUser ? "text-emerald-300 font-bold" : "text-emerald-150"}`}>
                      {s.name}
                    </span>
                    <span className="text-[8px] text-emerald-500/50 uppercase tracking-wide">
                      {s.department}
                    </span>
                  </div>
                </div>
                
                <span className="font-bold text-[11px] text-emerald-300">
                  {s.score} XP
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
