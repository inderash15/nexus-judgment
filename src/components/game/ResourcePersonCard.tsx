import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ResourcePerson {
  name: string;
  designation: string;
  company: string;
  specialization: string;
  photoUrl: string;
  details?: string[];
  inlineExpansion?: boolean;
}

function ExpandedContent({ person }: { person: ResourcePerson }) {
  return (
    <>
      <p className="font-mono text-[9px] sm:text-[10px] text-emerald-300 tracking-widest uppercase mb-1">
        {person.company}
      </p>
      <p className="text-[10px] sm:text-xs text-emerald-100 font-medium mb-2">
        {person.specialization}
      </p>
      {person.details && person.details.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {person.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-emerald-200">
              <span className="text-emerald-400 mt-[3px] text-[8px]">▶</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function ResourcePersonCard({ person, index }: { person: ResourcePerson; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`relative ${expanded ? 'z-[100]' : 'z-10'}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 * index, duration: 0.5, ease: "easeOut" }}
        className="group relative rounded-xl border border-emerald-500/30 bg-black p-4 sm:p-5 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-400/50 hover:shadow-[0_0_40px_rgba(52,211,153,0.3)] transition-all duration-500"
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex-shrink-0 relative">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-2 border-emerald-400/40 bg-emerald-900/40 flex items-center justify-center overflow-hidden">
              {person.photoUrl ? (
                <img
                  src={person.photoUrl}
                  alt={person.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl sm:text-2xl font-serif text-emerald-300">
                  {person.name.charAt(0)}
                </span>
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border border-emerald-400/50 bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-serif text-sm sm:text-base text-emerald-50 truncate">
              {person.name}
            </h4>
            <p className="font-mono text-[10px] sm:text-xs text-emerald-300/70 tracking-wider">
              {person.designation}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-3 text-center">
          <button
            onClick={() => setExpanded((p) => !p)}
            className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] text-emerald-400 tracking-wider uppercase hover:text-emerald-300 transition cursor-pointer"
          >
            {expanded ? "Less" : "Learn More"}
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              &#8594;
            </motion.span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={person.inlineExpansion ? { height: 0, opacity: 0, marginTop: 0 } : { opacity: 0, y: -5 }}
            animate={person.inlineExpansion ? { height: "auto", opacity: 1, marginTop: 8 } : { opacity: 1, y: 0 }}
            exit={person.inlineExpansion ? { height: 0, opacity: 0, marginTop: 0 } : { opacity: 0, y: -5 }}
            transition={{ duration: person.inlineExpansion ? 0.3 : 0.25 }}
            className={person.inlineExpansion ? "overflow-hidden" : "absolute left-0 right-0 z-[100] mt-1 rounded-xl border border-emerald-500/40 bg-emerald-950 p-4 shadow-[0_0_40px_rgba(0,0,0,0.9)]"}
          >
            {person.inlineExpansion ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950 p-4 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]">
                <ExpandedContent person={person} />
              </div>
            ) : (
              <ExpandedContent person={person} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
