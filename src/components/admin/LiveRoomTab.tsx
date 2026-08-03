import { DBStudent } from "@/lib/db";

type LiveRoomTabProps = {
  students: DBStudent[];
};

export function LiveRoomTab({ students }: LiveRoomTabProps) {
  return (
    <div className="space-y-6 flex-1 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {students.filter((s) => s.status === "Active").length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 border border-dashed border-slate-350 rounded-2xl">
            No active student trial sessions currently running.
          </div>
        ) : (
          students
            .filter((s) => s.status === "Active")
            .map((student) => (
              <div
                key={student.email}
                className="bg-white/80 border border-white/50 shadow-sm rounded-2xl p-5 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 leading-snug">
                      {student.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {student.department}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-extrabold border border-emerald-500/20">
                    LIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs leading-relaxed border-t border-slate-100 pt-3 text-slate-600 font-bold">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-0.5">Current Progress</p>
                    <p className="text-slate-800 font-black">Level {student.currentLevel} of 3</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Trial Score</p>
                    <p className="text-teal-700 font-black">{student.score} pts</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Attempts / Wrong</p>
                    <p className="text-slate-800 font-black">
                      {student.attempts} / {student.wrongAnswersCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Last Ping</p>
                    <p className="font-mono text-[10px] text-slate-400">
                      {student.lastActiveTime
                        ? new Date(student.lastActiveTime).toLocaleTimeString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] text-slate-400">Guess Vectors</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {student.currentGuesses.length === 0 ? (
                      <span className="text-[10px] text-slate-400 italic">No inputs guessed</span>
                    ) : (
                      student.currentGuesses.map((g, idx) => (
                        <span
                          key={idx}
                          className="w-5 h-5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-black font-mono text-[10px] text-slate-700"
                        >
                          {g}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
