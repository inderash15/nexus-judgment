import { DBStudent } from "@/lib/db";

type StandingsTabProps = {
  students: DBStudent[];
};

export function StandingsTab({ students }: StandingsTabProps) {
  return (
    <div className="space-y-6 flex-1 animate-in fade-in duration-300">
      <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-black font-bold border-b border-slate-100 bg-slate-50/20">
                <th className="p-4">Rank</th>
                <th className="p-4">Candidate</th>
                <th className="p-4">Department</th>
                <th className="p-4">Accuracy</th>
                <th className="p-4 text-right">Trial Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50 text-black font-bold">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-black">
                    No candidates recorded.
                  </td>
                </tr>
              ) : (
                students
                  .sort((a, b) => b.score - a.score)
                  .map((student, idx) => (
                    <tr key={student.email} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 font-black text-black">#{idx + 1}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-extrabold text-black">{student.name}</p>
                          <p className="text-[9px] text-black font-semibold">{student.email}</p>
                        </div>
                      </td>
                      <td className="p-4 text-black font-semibold">{student.department}</td>
                      <td className="p-4 text-emerald-600">
                        {student.attempts > 0
                          ? Math.round(
                              ((student.levelsCompleted || 1) / (student.attempts || 1)) * 100,
                            )
                          : 0}
                        %
                      </td>
                      <td className="p-4 text-right text-teal-800 font-black">
                        {student.score} pts
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
