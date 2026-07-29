import { motion } from "framer-motion";

interface TimelineEvent {
  time: string;
  label: string;
}

interface TimelineDay {
  day: string;
  events: TimelineEvent[];
}

export function MissionTimeline({ schedule }: { schedule: TimelineDay[] }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {schedule.map((day, di) => (
        <motion.div
          key={day.day}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * di, duration: 0.5 }}
        >
          <h4 className="font-mono text-xs sm:text-sm text-emerald-400 tracking-[0.3em] uppercase mb-3 sm:mb-4">
            {day.day}
          </h4>
          <div className="relative pl-8 sm:pl-10">
            {day.events.map((ev, ei) => (
              <motion.div
                key={ei}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * di + 0.06 * ei, duration: 0.4 }}
                className="relative mb-3 sm:mb-4 last:mb-0"
              >
                <div className="absolute -left-8 sm:-left-7 top-1 h-0 w-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <p className="font-mono text-[9px] sm:text-[10px] text-emerald-400/60 tracking-widest uppercase">
                  {ev.time}
                </p>
                <p className="text-xs sm:text-sm text-emerald-100/80 mt-0.5">{ev.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
