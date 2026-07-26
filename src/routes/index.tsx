import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Guardian } from "@/components/Guardian";
import { Atmosphere } from "@/components/Atmosphere";
import { useGuardianVoice } from "@/hooks/useGuardianVoice";
import { registerOrResumeStudent, submitGuess, adminGetDashboardData } from "@/lib/server-fns";
import { DBStudent, DBQuestion } from "@/lib/db";
import {
  BootScene,
  CinematicScene,
  IntroScene,
  RegisterScene,
  BriefingScene,
  ChamberScene,
  VerdictScene,
  FinalScene,
  GameOverScene,
  TopHud,
  LeaderboardModal,
  ProfileModal,
} from "@/components/game";
import type { Scene } from "@/components/game";
import bgImage from "@/assets/background.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guardian of Shadows — The Shadow Realm Trial" },
      {
        name: "description",
        content:
          "Solve the hidden words. Escape the Shadow Realm. One attempt. Zero margin for error.",
      },
    ],
  }),
  component: LastCandidate,
});

const LOCAL_EMAIL_KEY = "last-candidate:email:v4";

function LastCandidate() {
  const [hydrated, setHydrated] = useState(false);
  const [scene, setScene] = useState<Scene>("boot");
  const [student, setStudent] = useState<DBStudent | null>(null);
  const [assignedQuestions, setAssignedQuestions] = useState<DBQuestion[]>([]);
  const [verdictCorrect, setVerdictCorrect] = useState(true);

  const [deathTriggered, setDeathTriggered] = useState(false);
  const [deathPhase, setDeathPhase] = useState(0);

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<DBStudent[]>([]);

  const { voiceEnabled, toggleVoice, isSpeaking, speak, stop } = useGuardianVoice();

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
        if (res.student.wrongAnswersCount === 1) {
          speak("Your confidence exceeds your intelligence.", "warning");
        } else if (res.student.wrongAnswersCount === 2) {
          speak("You are not worthy of entering deeper into this realm.", "warning");
        } else if (res.student.wrongAnswersCount === 3) {
          speak("THE SHADOWS HAVE REJECTED YOU.", "wrong");
        }
      } else {
        if (
          res.student.currentLevel > prevLevel ||
          res.student.status === "Qualified" ||
          res.student.status === "Completed"
        ) {
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

    setTimeout(() => {
      setDeathPhase(2);
    }, 1500);

    setTimeout(() => {
      setDeathPhase(3);
    }, 3000);

    setTimeout(() => {
      setDeathTriggered(false);
      setDeathPhase(0);
      setScene("gameover");
    }, 5000);
  };

  return (
    <main
      className={`relative min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden text-emerald-50 font-sans antialiased transition-all duration-1000 ${deathTriggered && deathPhase >= 1 ? "animate-shake bg-red-950/20" : ""
        } ${student && student.wrongAnswersCount === 2 ? "bg-black/90 brightness-75" : ""} ${student && student.wrongAnswersCount >= 3 ? "bg-black brightness-50" : "bg-zinc-950"
        }`}
    >


      <Atmosphere speaking={isSpeaking} />

      <AnimatePresence>
        {scene === "boot" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        )}
      </AnimatePresence>

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
                className="space-y-4 px-4"
              >
                <div className="text-red-500 font-extrabold text-2xl sm:text-5xl md:text-7xl tracking-widest animate-pulse text-center">
                  ACCESS TERMINATED
                </div>
                <div className="h-1 bg-red-600 w-48 sm:w-64 mx-auto animate-width" />
              </motion.div>
            )}

            {deathPhase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 sm:space-y-6 px-4"
              >
                <h1 className="text-red-500 font-serif text-2xl sm:text-4xl md:text-6xl tracking-tight leading-none uppercase text-center">
                  YOU HAVE BEEN ELIMINATED
                </h1>
                <p className="text-red-400/70 font-mono text-[10px] sm:text-sm tracking-[0.2em] uppercase text-center">
                  FROM THE SHADOW REALM
                </p>
                {deathPhase >= 3 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-red-600 font-black text-4xl sm:text-6xl md:text-8xl tracking-widest mt-4 sm:mt-8 font-mono animate-ping text-center"
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

      <TopHud
        student={student}
        scene={scene}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenProfile={() => setShowProfile(true)}
        voiceEnabled={voiceEnabled}
        onToggleVoice={toggleVoice}
      />

      {!["boot", "cinematic"].includes(scene) && (
        <div className="fixed right-0 bottom-0 w-[35%] sm:w-[30%] md:w-[45%] h-[30vh] sm:h-[40vh] md:h-[75vh] pointer-events-none z-0 flex items-end justify-center select-none opacity-25 sm:opacity-40 md:opacity-100 transition-opacity duration-700">
          <Guardian
            scale={0.3}
            speaking={isSpeaking}
            state={
              scene === "gameover"
                ? "death"
                : scene === "final"
                  ? "selected"
                  : scene === "verdict"
                    ? "success"
                    : scene === "briefing"
                      ? "idle"
                      : scene === "chamber"
                        ? student && student.wrongAnswersCount >= 3
                          ? "angry"
                          : student && student.wrongAnswersCount >= 1
                            ? "warning"
                            : "floating"
                        : "idle"
            }
          />
        </div>
      )}

      <div
        className={`relative z-20 w-full min-h-[100dvh] flex items-center py-8 md:py-0 origin-top md:origin-center ${!["boot", "cinematic"].includes(scene)
          ? "w-full sm:w-[65%] md:w-[45%] lg:w-[40%] justify-start pl-4 sm:pl-8 md:pl-12 lg:pl-16"
          : "justify-center px-4"
          }`}
      >
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
            <CinematicScene key="cinematic" onComplete={() => setScene("intro")} speak={speak} stop={stop} />
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

      <AnimatePresence>
        {showLeaderboard && (
          <LeaderboardModal
            data={leaderboardData}
            currentEmail={student?.email}
            onClose={() => setShowLeaderboard(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProfile && student && (
          <ProfileModal student={student} onClose={() => setShowProfile(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
