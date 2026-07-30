import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { ActionButton } from "./ActionButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerOrResumeStudent } from "@/lib/server-fns";
import { DBStudent, DBQuestion } from "@/lib/db";
import { KeyRound, UserPlus, Clipboard, Check } from "lucide-react";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";

export function RegisterScene({
  onComplete,
  speak,
  isSpeaking,
}: {
  onComplete: (student: DBStudent, questions: DBQuestion[]) => void;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
}) {
  const [tab, setTab] = useState<"register" | "resume">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [pin, setPin] = useState("");
  
  // Registration complete phase
  const [phase, setPhase] = useState<"input" | "pin-display">("input");
  const [generatedPin, setGeneratedPin] = useState("");
  const [registeredStudent, setRegisteredStudent] = useState<DBStudent | null>(null);
  const [registeredQuestions, setRegisteredQuestions] = useState<DBQuestion[]>([]);
  
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(
        "Identify yourself. Bind your credentials or resume an existing ledger session.",
        "normal",
      );
      hasSpoken.current = true;
    }
  }, [speak]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (tab === "register") {
        if (!name.trim() || !email.includes("@") || !dept || !macAddress) {
          setError("All fields are required.");
          setSubmitting(false);
          return;
        }

        const res = await registerOrResumeStudent({
          data: {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            department: dept,
            macAddress: macAddress,
            action: "register"
          }
        });

        if (res.error) {
          setError(res.error);
        } else if (res.student) {
          setGeneratedPin(res.loginPin || "");
          setRegisteredStudent(res.student);
          setRegisteredQuestions(res.questions);
          setPhase("pin-display");
          speak("Your unique identity is bound. Secure your access key before entering the shadow realm.", "success");
        }
      } else {
        if (!email.includes("@") || pin.trim().length !== 6) {
          setError("Please enter a valid email and 6-character PIN.");
          setSubmitting(false);
          return;
        }

        const res = await registerOrResumeStudent({
          data: {
            email: email.trim().toLowerCase(),
            pin: pin.trim().toUpperCase(),
            action: "login"
          }
        });

        if (res.error) {
          setError(res.error);
          speak("Invalid credentials. The shadows do not recognize this binding.", "warning");
        } else if (res.student) {
          onComplete(res.student, res.questions);
        }
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (phase === "pin-display") {
    return (
      <SceneWrap>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-left backdrop-blur-md bg-black/50 border border-emerald-500/30 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.2)] p-6 sm:p-8"
        >
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold">
            Identity Ledger Saved
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-emerald-50 leading-tight">
            Identity Bound.
          </h2>
          <p className="mt-3 text-xs text-emerald-100/60 leading-relaxed font-sans">
            Here is your unique access PIN. You **must** save this PIN. If you refresh, log out, or switch devices, you will need this PIN to resume.
          </p>

          <div className="my-6 relative bg-emerald-950/20 border border-emerald-500/20 rounded-xl px-4 py-4 sm:py-5 flex flex-col items-center justify-center gap-2.5 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
            <span className="text-[10px] font-mono tracking-wider text-emerald-500/60 uppercase">Your Security Access Key</span>
            <div className="text-3xl sm:text-4xl font-mono font-black tracking-[0.2em] text-emerald-300 select-all drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">
              {generatedPin}
            </div>
            
            <button
              type="button"
              onClick={handleCopy}
              className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-[10px] font-bold text-emerald-300 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>PIN COPIED</span>
                </>
              ) : (
                <>
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>COPY ACCESS KEY</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <ActionButton
              onClick={() => {
                if (registeredStudent) {
                  onComplete(registeredStudent, registeredQuestions);
                }
              }}
            >
              Begin Shadow Trial →
            </ActionButton>
          </div>
        </motion.div>
      </SceneWrap>
    );
  }

  return (
    <SceneWrap>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md text-left backdrop-blur-md bg-black/45 border border-emerald-500/20 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] p-4 sm:p-6 md:p-8"
      >
        {/* Tab Selection */}
        <div className="flex gap-2 p-1 bg-zinc-950/60 border border-emerald-500/10 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              tab === "register"
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "text-emerald-500/50 hover:text-emerald-400 border border-transparent"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>NEW TRIAL</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("resume");
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              tab === "resume"
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                : "text-emerald-500/50 hover:text-emerald-400 border border-transparent"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>RESUME TRIAL</span>
          </button>
        </div>

        <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-400/80">
          {tab === "register" ? "Acknowledge Identity" : "Verify Session"}
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl leading-tight text-emerald-50">
          {tab === "register" ? "Input Credentials." : "Enter Security PIN."}
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs text-emerald-100/60 leading-relaxed font-sans">
          {tab === "register"
            ? "Your name, official email, department, and laptop MAC address will bind this single attempt. Retakes are locked."
            : "Provide your registered email and the unique 6-character PIN generated during registration."}
        </p>

        <form className="mt-4 sm:mt-6 space-y-3.5 w-full" onSubmit={handleSubmit}>
          {tab === "register" && (
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                required
                placeholder="Full Name"
                className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={50}
              required
              placeholder="Official Email Address"
              className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
            />
          </div>

          {tab === "register" ? (
            <>
              <div>
                <Select value={dept} onValueChange={setDept} required>
                  <SelectTrigger className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)] text-left flex justify-between items-center">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border border-emerald-500/20 text-emerald-50">
                    <SelectItem value="csda I A section">CSDA I A </SelectItem>
                    <SelectItem value="csda I B section">CSDA I B </SelectItem>
                    <SelectItem value="csda II">CSDA II</SelectItem>
                    <SelectItem value="csda III">CSDA III</SelectItem>
                    <SelectItem value="aids I A section">AIDS I A </SelectItem>
                    <SelectItem value="aids I B section">AIDS I B </SelectItem>
                    <SelectItem value="aids II A section">AIDS II A </SelectItem>
                    <SelectItem value="aids II B section">AIDS II B </SelectItem>
                    <SelectItem value="aids III">AIDS III</SelectItem>
                    <SelectItem value="aiml I">AIML I</SelectItem>
                    <SelectItem value="aiml II">AIML II</SelectItem>
                    <SelectItem value="aiml III">AIML III</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <input
                  type="text"
                  value={macAddress}
                  onChange={(e) => setMacAddress(e.target.value)}
                  maxLength={17}
                  required
                  placeholder="Laptop MAC Address (e.g. 00:1A:2B:3C:4D:5E)"
                  className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                />
              </div>
            </>
          ) : (
            <div>
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
                required
                placeholder="6-Digit Access PIN"
                className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-mono text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)] text-center tracking-[0.2em] placeholder:font-sans placeholder:tracking-normal"
              />
            </div>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-red-400 font-bold uppercase tracking-wider font-mono bg-red-950/20 p-2.5 rounded-lg border border-red-500/20 text-center"
            >
              {error}
            </motion.p>
          )}

          <div className="pt-2 flex items-center gap-4">
            <ActionButton
              disabled={submitting || (tab === "register" ? (name.trim().length < 2 || !email.includes("@") || !dept || !macAddress) : (!email.includes("@") || pin.trim().length !== 6))}
            >
              {submitting ? "Processing Ledger..." : (tab === "register" ? "Initiate Judgment →" : "Verify Token →")}
            </ActionButton>
          </div>
        </form>
      </motion.div>
    </SceneWrap>
  );
}
