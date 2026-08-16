import { useState, useMemo } from "react";
import { DBStudent, SystemConfig } from "@/lib/db";
import { DataState } from "./types";
import { Calendar, Users, Mail, MailWarning, Play, Download, Settings } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finalizeTop125, sendSelectionEmails } from "@/lib/server-fns";
import { getCandidateScore } from "@/lib/utils";

type SelectionTabProps = {
  data: DataState;
  config: SystemConfig | null;
};

export function SelectionTab({ data, config }: SelectionTabProps) {
  const queryClient = useQueryClient();
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);

  const students = data.students;
  const shortlistSize = config?.shortlistSize || 125;

  const selectedStudents = useMemo(() => {
    return students.filter(s => s.selectionStatus === "SELECTED");
  }, [students]);

  const emailsSent = selectedStudents.filter(s => s.emailStatus === "SENT").length;
  const emailsFailed = selectedStudents.filter(s => s.emailStatus === "FAILED").length;
  const emailsPending = selectedStudents.filter(s => s.emailStatus === "PENDING" || !s.emailStatus).length;

  const handleFinalize = async () => {
    if (!confirm("Are you sure you want to finalize the Top 125 selection? This will create an immutable snapshot and assign ticket IDs.")) return;
    setIsFinalizing(true);
    try {
      const res = await finalizeTop125();
      if (res.success) {
        alert(`Success! Finalized selection version ${res.version} with ${res.selectedCount} candidates.`);
        queryClient.invalidateQueries({ queryKey: ["adminLeaderboard"] });
      } else {
        alert("Error finalizing selection: " + res.error);
      }
    } finally {
      setIsFinalizing(false);
    }
  };

  const handleSendEmails = async () => {
    if (!confirm("Dispatch emails to all pending selected candidates?")) return;
    setIsEmailing(true);
    try {
      const res = await sendSelectionEmails();
      if (res.success) {
        alert(`Dispatch complete. Sent: ${res.successCount}, Failed: ${res.failCount}`);
        queryClient.invalidateQueries({ queryKey: ["adminLeaderboard"] });
      } else {
        alert("Error sending emails: " + res.error);
      }
    } finally {
      setIsEmailing(false);
    }
  };

  const exportCSV = () => {
    const header = "Rank,Name,Department,Score,Percentage,Selection Status,Ticket ID\\n";
    const rows = selectedStudents
      .sort((a, b) => (a.rank || 0) - (b.rank || 0))
      .map(s => `${s.rank || "-"},"${s.name}",${s.department},${getCandidateScore(s)},${s.finalPercentage || 0}%,${s.selectionStatus || ""},${s.ticketId || ""}`)
      .join("\\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nexuspro_top125_selection_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h2">Shortlist & Selection</h2>
          <p className="text-label mt-1">Manage Top 125 Snapshot and Dispatch Tickets</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="btn-secondary" disabled={selectedStudents.length === 0}>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
          <button onClick={handleFinalize} disabled={isFinalizing} className="btn-primary bg-emerald-600 hover:bg-emerald-500 text-white">
            <Play className="w-4 h-4 mr-2" /> 
            {isFinalizing ? "Finalizing..." : "Finalize Top 125"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="glass-panel p-6 flex flex-col gap-2">
          <span className="text-label flex items-center gap-2"><Users className="w-4 h-4" /> Selected Candidates</span>
          <span className="text-metric">{selectedStudents.length} / {shortlistSize}</span>
        </div>
        <div className="glass-panel p-6 flex flex-col gap-2">
          <span className="text-label flex items-center gap-2"><Mail className="w-4 h-4" /> Emails Sent</span>
          <span className="text-metric text-emerald-600">{emailsSent}</span>
        </div>
        <div className="glass-panel p-6 flex flex-col gap-2">
          <span className="text-label flex items-center gap-2"><Calendar className="w-4 h-4" /> Emails Pending</span>
          <span className="text-metric text-amber-600">{emailsPending}</span>
        </div>
        <div className="glass-panel p-6 flex flex-col gap-2">
          <span className="text-label flex items-center gap-2"><MailWarning className="w-4 h-4" /> Emails Failed</span>
          <span className="text-metric text-rose-600">{emailsFailed}</span>
        </div>
      </div>

      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-black/[0.03] flex items-center justify-between">
          <h3 className="text-h3">Selection Dispatcher</h3>
          <button 
            onClick={handleSendEmails} 
            disabled={isEmailing || emailsPending === 0}
            className="btn-primary"
          >
            {isEmailing ? "Dispatching..." : `Dispatch ${emailsPending} Pending Emails`}
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/[0.03]">
                <th className="p-4 text-label bg-black/[0.02]">Rank</th>
                <th className="p-4 text-label bg-black/[0.02]">Candidate</th>
                <th className="p-4 text-label bg-black/[0.02]">Department</th>
                <th className="p-4 text-label bg-black/[0.02]">Score</th>
                <th className="p-4 text-label bg-black/[0.02]">Ticket ID</th>
                <th className="p-4 text-label bg-black/[0.02]">Email Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedStudents.sort((a,b)=>(a.rank||0)-(b.rank||0)).map((s) => (
                <tr key={s.email} className="border-b border-black/[0.02] hover:bg-black/[0.01]">
                  <td className="p-4 font-mono text-sm">{s.rank}</td>
                  <td className="p-4">
                    <div className="font-medium text-black">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.email}</div>
                  </td>
                  <td className="p-4 text-sm">{s.department}</td>
                  <td className="p-4 font-mono text-sm">{getCandidateScore(s)} ({s.finalPercentage}%)</td>
                  <td className="p-4 font-mono text-xs">{s.ticketId}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${s.emailStatus === 'SENT' ? 'bg-emerald-100 text-emerald-700' : 
                        s.emailStatus === 'FAILED' ? 'bg-rose-100 text-rose-700' : 
                        'bg-amber-100 text-amber-700'}`}>
                      {s.emailStatus || 'PENDING'}
                    </span>
                  </td>
                </tr>
              ))}
              {selectedStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No candidates selected yet. Run the finalizer to generate the Top 125.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
