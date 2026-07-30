import { motion } from "framer-motion";
import { SkillBadge } from "./SkillBadge";
import { useResponsive } from "@/hooks/useResponsive";

export interface Agent {
  name: string;
  role: string;
  department: string;
  bio: string;
  skills: string[];
  quote: string;
  initials: string;
}

export function AgentCard({ agent }: { agent: Agent }) {
  const { isMobile } = useResponsive();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="w-full max-w-lg sm:max-w-xl mx-auto flex flex-col items-center text-center px-4 sm:px-6"
    >
      <div 
        className="w-full flex flex-col items-center origin-top transition-transform duration-300"
        style={{ transform: isMobile ? "scale(0.85)" : "scale(1)" }}
      >
      {/* Holographic portrait frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.6, type: "spring", stiffness: 120 }}
        className="relative mb-5 sm:mb-6"
      >
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 -m-3 sm:-m-4 rounded-full border border-dashed border-emerald-400/30"
        />

        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 -m-2 rounded-full border border-emerald-400/50"
        />

        {/* Portrait container */}
        <div className="relative h-20 w-20 xs:h-28 xs:w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full border-2 border-emerald-400/50 bg-gradient-to-b from-emerald-900/60 to-black/60 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.3)] overflow-hidden">
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(52,211,153,0.4) 0px, rgba(52,211,153,0.4) 1px, transparent 1px, transparent 3px)",
            }}
          />
          {/* Scanning beam */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent pointer-events-none"
          />
          <span className="text-xl xs:text-3xl sm:text-4xl font-serif text-emerald-300/80 select-none">
            {agent.initials}
          </span>
        </div>

        {/* Status indicator */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/70 px-2.5 py-0.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span className="font-mono text-[8px] sm:text-[9px] text-emerald-300 tracking-widest uppercase">
            ONLINE
          </span>
        </motion.div>
      </motion.div>

      {/* Name */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-serif text-xl sm:text-2xl md:text-3xl text-emerald-50"
      >
        {agent.name}
      </motion.h2>

      {/* Role */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="font-mono text-[10px] sm:text-xs text-emerald-400 tracking-[0.25em] uppercase mt-1"
      >
        {agent.role}
      </motion.p>

      {/* Department */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="font-mono text-[min(2vw,0.6rem)] sm:text-[10px] text-emerald-400/50 tracking-[0.1em] sm:tracking-[0.2em] uppercase mt-0.5 max-w-[90%] sm:max-w-md mx-auto overflow-hidden text-ellipsis line-clamp-2 leading-snug"
      >
        {agent.department}
      </motion.p>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-3 sm:mt-4 text-xs sm:text-sm text-emerald-100/70 leading-relaxed max-w-md"
      >
        {agent.bio}
      </motion.p>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2"
      >
        {agent.skills.map((skill, i) => (
          <SkillBadge key={skill} skill={skill} index={i} />
        ))}
      </motion.div>

      {/* Quote */}
      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-4 sm:mt-5 relative px-4 py-3 rounded-lg border-l-2 border-emerald-400/30 bg-emerald-500/5"
      >
        <p className="text-xs sm:text-sm italic text-emerald-200/60">"{agent.quote}"</p>
      </motion.blockquote>
      </div>
    </motion.div>
  );
}
