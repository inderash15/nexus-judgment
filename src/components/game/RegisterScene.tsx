import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SceneWrap } from "./SceneWrap";
import { ActionButton } from "./ActionButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GuardianEmotion } from "@/hooks/useGuardianVoice";

export function RegisterScene({
  onComplete,
  speak,
  isSpeaking,
}: {
  onComplete: (name: string, email: string, department: string, year: string) => void;
  speak: (text: string, emotion?: GuardianEmotion) => void;
  isSpeaking: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [year, setYear] = useState("");
  const hasSpoken = useRef(false);

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(
        "Identify yourself. Write your credentials in the matrix to bind your singular attempt.",
        "normal",
      );
      hasSpoken.current = true;
    }
  }, [speak]);

  return (
    <SceneWrap>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md text-left backdrop-blur-md bg-black/40 border border-emerald-500/20 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] p-4 sm:p-6 md:p-8"
      >
        <div className="mb-2 sm:mb-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] text-emerald-400/80">
          Acknowledge Identity
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl leading-tight text-emerald-50">
          Input Credentials.
        </h2>
        <p className="mt-1.5 sm:mt-3 text-xs text-emerald-100/60 leading-relaxed">
          Your name, official email, department, and year will bind this single attempt to the global ledger. Retakes are strictly locked.
        </p>
        <form
          className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              name.trim().length >= 2 &&
              email.includes("@") &&
              dept.trim().length >= 2 &&
              year.trim().length >= 1
            ) {
              onComplete(name.trim(), email.trim(), dept.trim(), year.trim());
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
              className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
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
              className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
            />
          </div>
          <div>
            <input
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              maxLength={60}
              required
              placeholder="Department Name"
              className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
            />
          </div>
          <div>
            <Select value={year} onValueChange={setYear} required>
              <SelectTrigger className="w-full rounded-xl border border-emerald-500/30 bg-black/60 px-4 py-2.5 min-h-[40px] sm:min-h-[44px] font-sans text-sm sm:text-base text-emerald-50 outline-none backdrop-blur focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-1 sm:pt-2 flex items-center gap-4">
            <ActionButton
              disabled={name.trim().length < 2 || !email.includes("@") || dept.trim().length < 2 || year.trim().length < 1}
            >
              Initiate Judgment →
            </ActionButton>
          </div>
        </form>
      </motion.div>
    </SceneWrap>
  );
}
