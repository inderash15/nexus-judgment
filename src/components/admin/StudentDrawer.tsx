import { Lock, Unlock } from "lucide-react";
import { DBStudent } from "@/lib/db";
import { DataState } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";

type StudentDrawerProps = {
  selectedStudent: DBStudent;
  setSelectedStudent: (student: DBStudent | null) => void;
  data: DataState;
  handleToggleLock: (student: DBStudent) => void;
};

export function StudentDrawer({
  selectedStudent,
  setSelectedStudent,
  data,
  handleToggleLock,
}: StudentDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-[100dvh] overflow-y-auto bg-[#FCFDFD]/95 backdrop-blur-xl border-l border-slate-200/80 p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-350 text-slate-800">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-sm text-slate-400 uppercase tracking-wider">
              Candidate File
            </h3>
            <button
              onClick={() => setSelectedStudent(null)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-black text-slate-600 transition-all"
            >
              ✕ CLOSE
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-800 flex items-center justify-center font-bold text-white text-base">
                {selectedStudent.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-850 leading-tight">
                  {selectedStudent.name}
                </h4>
                <p className="text-xs text-slate-400 font-semibold">{selectedStudent.email}</p>
              </div>
            </div>

            <div className="bg-slate-50/50 p-4 border border-slate-150 rounded-2xl grid grid-cols-2 gap-4 text-xs font-bold leading-relaxed">
              <div>
                <p className="text-[10px] text-slate-400">Department</p>
                <p className="text-slate-850">{selectedStudent.department}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Trial Score</p>
                <p className="text-teal-700 font-black">{selectedStudent.score} pts</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Levels Cleared</p>
                <p className="text-slate-800">{selectedStudent.levelsCompleted} of 3</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Status</p>
                <p className="text-slate-800">{selectedStudent.status}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide">
                Candidate Action History
              </h4>
              <ScrollArea className="h-56 pr-3">
                <div className="space-y-2">
                  {data.securityLogs
                    .filter((log) => log.email === selectedStudent.email)
                    .map((log) => (
                      <div
                        key={log.id}
                        className="p-3 border border-slate-100 bg-white/60 rounded-xl text-xs leading-relaxed font-semibold"
                      >
                        <div className="flex justify-between items-center text-[9px] text-slate-400 mb-1">
                          <span>{log.action}</span>
                          <span className="font-mono">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-slate-600 font-semibold">{log.details}</p>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleToggleLock(selectedStudent)}
          className={`w-full py-2.5 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
            selectedStudent.locked
              ? "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20"
              : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
          }`}
        >
          {selectedStudent.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          {selectedStudent.locked ? "RELEASE LOCK" : "DISQUALIFY"}
        </button>
      </div>
    </div>
  );
}
