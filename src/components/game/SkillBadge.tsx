import { motion } from "framer-motion";

export function SkillBadge({
  skill,
  index,
}: {
  skill: string;
  index: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.05 * index, duration: 0.3 }}
      className="inline-block rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] sm:text-xs text-emerald-300 tracking-wider"
    >
      {skill}
    </motion.span>
  );
}
