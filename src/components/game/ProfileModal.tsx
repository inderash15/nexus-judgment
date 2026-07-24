import { motion } from "framer-motion";
import { DBStudent } from "@/lib/db";
import { User } from "lucide-react";

export function ProfileModal({ student, onClose }: { student: DBStudent; onClose: () => void }) {
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
            <span className="font-bold text-emerald-200 uppercase tracking-widest">
              Candidate Profile
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-400 hover:text-emerald-200 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-emerald-500/60">
              Candidate Name
            </div>
            <div className="text-sm font-bold text-emerald-100">{student.name}</div>
          </div>

          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-emerald-500/60">
              Department
            </div>
            <div className="text-sm font-bold text-emerald-100">{student.department}</div>
          </div>

          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-emerald-500/60">
              Registered Email
            </div>
            <div className="text-xs text-emerald-200/80">{student.email}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-emerald-500/10">
            <div className="space-y-0.5">
              <div className="text-[8px] uppercase tracking-wider text-emerald-500/60">
                Completed Levels
              </div>
              <div className="text-sm font-bold text-emerald-100">
                {student.levelsCompleted} / 7
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[8px] uppercase tracking-wider text-emerald-500/60">
                Status Tag
              </div>
              <span
                className={`inline-flex px-2 py-0.5 rounded text-[9px] font-black uppercase mt-1 border ${
                  student.status === "Qualified"
                    ? "bg-emerald-500/10 border-emerald-400 text-emerald-300"
                    : student.status === "Completed"
                      ? "bg-purple-500/10 border-purple-400 text-purple-300"
                      : student.status === "Eliminated"
                        ? "bg-red-500/10 border-red-400 text-red-400"
                        : "bg-blue-500/10 border-blue-400 text-blue-300"
                }`}
              >
                {student.status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
