import { Search, Lock, Unlock, ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import { DBStudent } from "@/lib/db";

type CandidatesTabProps = {
  studentSearch: string;
  setStudentSearch: (val: string) => void;
  studentDeptFilter: string;
  setStudentDeptFilter: (val: string) => void;
  studentStatusFilter: string;
  setStudentStatusFilter: (val: string) => void;
  departments: string[];
  sortedStudents: DBStudent[];
  paginatedStudents: DBStudent[];
  studentPage: number;
  setStudentPage: (val: number | ((prev: number) => number)) => void;
  handleExportCSV: () => void;
  handleToggleLock: (student: DBStudent) => void;
  setSelectedStudent: (student: DBStudent | null) => void;
  renderStatusBadge: (status: DBStudent["status"]) => React.ReactNode;
};

export function CandidatesTab({
  studentSearch,
  setStudentSearch,
  studentDeptFilter,
  setStudentDeptFilter,
  studentStatusFilter,
  setStudentStatusFilter,
  departments,
  sortedStudents,
  paginatedStudents,
  studentPage,
  setStudentPage,
  handleExportCSV,
  handleToggleLock,
  setSelectedStudent,
  renderStatusBadge,
}: CandidatesTabProps) {
  return (
    <div className="space-y-6 flex-1 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name or email..."
            value={studentSearch}
            onChange={(e) => {
              setStudentSearch(e.target.value);
              setStudentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 min-h-[44px] bg-white/70 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all text-slate-800"
          />
        </div>

        <div className="flex gap-2 sm:gap-2.5 w-full sm:w-auto">
          <select
            value={studentDeptFilter}
            onChange={(e) => {
              setStudentDeptFilter(e.target.value);
              setStudentPage(1);
            }}
            className="px-3 py-2 min-h-[44px] bg-white/70 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-650 focus:outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={studentStatusFilter}
            onChange={(e) => {
              setStudentStatusFilter(e.target.value);
              setStudentPage(1);
            }}
            className="px-3 py-2 min-h-[44px] bg-white/70 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-650 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Qualified">Qualified</option>
            <option value="Completed">Completed</option>
            <option value="Eliminated">Eliminated</option>
            <option value="Disqualified">Disqualified</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="p-2.5 min-h-[44px] min-w-[44px] rounded-xl border border-slate-200/50 bg-white/70 hover:bg-white text-slate-600 shadow-sm transition-all flex items-center justify-center"
          >
            <FileDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-slate-400 font-bold border-b border-slate-100 bg-slate-50/20">
                <th className="p-4">Name</th>
                <th className="p-4">Department</th>
                <th className="p-4">Completed</th>
                <th className="p-4">Score</th>
                <th className="p-4">Attempts</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Access Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50 text-slate-700 font-bold">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No records found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr
                    key={student.email}
                    onClick={() => setSelectedStudent(student)}
                    className="cursor-pointer hover:bg-slate-50/40 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-extrabold text-slate-800">{student.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{student.email}</p>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-500">{student.department}</td>
                    <td className="p-4 font-semibold">{student.levelsCompleted} / 7</td>
                    <td className="p-4 text-teal-800 font-black">{student.score}</td>
                    <td className="p-4 font-mono font-semibold">{student.attempts}</td>
                    <td className="p-4">{renderStatusBadge(student.status)}</td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleLock(student)}
                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-black flex items-center gap-1.5 ml-auto transition-all ${
                          student.locked
                            ? "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
                        }`}
                      >
                        {student.locked ? (
                          <Lock className="w-3 h-3" />
                        ) : (
                          <Unlock className="w-3 h-3" />
                        )}
                        {student.locked ? "UNLOCK" : "DISQUALIFY"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {sortedStudents.length > 8 && (
          <div className="p-4 flex justify-between items-center border-t border-slate-100 text-xs font-bold text-slate-500 bg-slate-50/10">
            <p>
              Showing {(studentPage - 1) * 8 + 1}-{Math.min(studentPage * 8, sortedStudents.length)}{" "}
              of {sortedStudents.length} candidates
            </p>
            <div className="flex gap-2">
              <button
                disabled={studentPage === 1}
                onClick={() => setStudentPage((prev) => Math.max(1, prev - 1))}
                className="p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={studentPage * 8 >= sortedStudents.length}
                onClick={() => setStudentPage((prev) => prev + 1)}
                className="p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
