import { useState, useMemo, useEffect } from "react";
import { DBStudent, SystemConfig } from "@/lib/db";
import { DataState } from "./types";
import { Calendar, Users, Mail, MailWarning, Play, Download, X, Send, AlertTriangle } from "lucide-react";
import { finalizeTop125, sendPendingTickets, resendFailedTickets } from "@/lib/server-fns";
import { getCandidateScore } from "@/lib/utils";

type SelectionTabProps = {
  data: DataState;
  config: SystemConfig | null;
  refreshData: () => Promise<void>;
};

export function SelectionTab({ data, config, refreshData }: SelectionTabProps) {
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [modalState, setModalState] = useState<"none" | "send" | "resend">("none");

  const students = data.students;
  const shortlistSize = config?.shortlistSize || 120;

  const selectedStudents = useMemo(() => {
    return students.filter(s => s.selectionStatus === "SELECTED");
  }, [students]);

  const emailsSent = selectedStudents.filter(s => s.emailStatus === "SENT").length;
  const emailsFailed = selectedStudents.filter(s => s.emailStatus === "FAILED").length;
  const emailsPending = selectedStudents.filter(s => s.emailStatus === "PENDING" || !s.emailStatus).length;

  // Polling for live progress updates
  useEffect(() => {
    let interval: any;
    if (isSending || isResending) {
      interval = setInterval(() => {
        refreshData();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isSending, isResending, refreshData]);

  const handleFinalize = async () => {
    if (!confirm("Are you sure you want to finalize the Top 125 selection? This will create an immutable snapshot and assign ticket IDs.")) return;
    setIsFinalizing(true);
    try {
      const res = await finalizeTop125();
      if (res.success) {
        alert(`Success! Finalized selection version ${res.version} with ${res.selectedCount} candidates.`);
        await refreshData();
      } else {
        alert("Error finalizing selection: " + res.error);
      }
    } finally {
      setIsFinalizing(false);
    }
  };

  const handleSendEmails = async () => {
    setModalState("none");
    setIsSending(true);
    try {
      const res = await sendPendingTickets();
      await refreshData();
      if (res.success) {
        alert(`Ticket Distribution Complete.\n\nSent: ${res.successCount}\nFailed: ${res.failCount}`);
      } else {
        alert("Error sending emails: " + res.error);
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleResendFailed = async () => {
    setModalState("none");
    setIsResending(true);
    try {
      const res = await resendFailedTickets();
      await refreshData();
      if (res.success) {
        alert(`Retry Complete.\n\nSuccessfully resent: ${res.successCount}\nStill failed: ${res.failCount}`);
      } else {
        alert("Error resending emails: " + res.error);
      }
    } finally {
      setIsResending(false);
    }
  };

  const exportCSV = () => {
    const header = "Rank,Name,Email,Department,Score,Percentage,Selection Status,Ticket ID,Email Status\\n";
    const rows = selectedStudents
      .sort((a, b) => (a.rank || 0) - (b.rank || 0))
      .map(s => `${s.rank || "-"},"${s.name}",${s.email},${s.department},${getCandidateScore(s)},${s.finalPercentage || 0}%,${s.selectionStatus || ""},${s.ticketId || ""},${s.emailStatus || 'PENDING'}`)
      .join("\\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nexuspro_top_selection_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isWorking = isSending || isResending;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in h-full relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-h2">Shortlist & Selection</h2>
          <p className="text-label mt-1">Manage Top Selection Snapshot and Dispatch Tickets</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="btn-secondary" disabled={selectedStudents.length === 0}>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </button>
          <button onClick={handleFinalize} disabled={isFinalizing || isWorking} className="btn-primary bg-emerald-600 hover:bg-emerald-500 text-white">
            <Play className="w-4 h-4 mr-2" /> 
            {isFinalizing ? "Finalizing..." : `Finalize Top ${shortlistSize}`}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="glass-panel p-6 flex flex-col gap-2 border-l-4 border-l-black">
          <span className="text-label flex items-center gap-2"><Users className="w-4 h-4" /> Shortlisted</span>
          <span className="text-metric">{selectedStudents.length} / {shortlistSize}</span>
        </div>
        <div className="glass-panel p-6 flex flex-col gap-2 border-l-4 border-l-emerald-500">
          <span className="text-label flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-600" /> Emails Sent</span>
          <span className="text-metric text-emerald-600">{emailsSent}</span>
        </div>
        <div className="glass-panel p-6 flex flex-col gap-2 border-l-4 border-l-amber-500">
          <span className="text-label flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-600" /> Emails Pending</span>
          <span className="text-metric text-amber-600">{emailsPending}</span>
        </div>
        <div className="glass-panel p-6 flex flex-col gap-2 border-l-4 border-l-rose-500">
          <span className="text-label flex items-center gap-2"><MailWarning className="w-4 h-4 text-rose-600" /> Emails Failed</span>
          <span className="text-metric text-rose-600">{emailsFailed}</span>
        </div>
      </div>

      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-black/[0.03] flex items-center justify-between bg-black/[0.01]">
          <h3 className="text-h3">Ticket Distribution</h3>
          <div className="flex gap-3">
            <button 
              onClick={() => setModalState("resend")} 
              disabled={isWorking || emailsFailed === 0}
              className="px-4 py-2 bg-rose-50 text-rose-600 text-sm font-medium rounded-lg hover:bg-rose-100 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              Resend Failed
            </button>
            <button 
              onClick={() => setModalState("send")} 
              disabled={isWorking || emailsPending === 0}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              {isSending ? "Sending Tickets..." : "Send Tickets"}
            </button>
          </div>
        </div>
        
        {isWorking && (
          <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex flex-col gap-2">
            <div className="flex justify-between text-sm font-medium text-indigo-900">
              <span>{isSending ? "Sending Tickets..." : "Resending Failed Tickets..."}</span>
              <span>{emailsSent + emailsFailed} / {selectedStudents.length}</span>
            </div>
            <div className="h-2 bg-indigo-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
                style={{ width: `${((emailsSent + emailsFailed) / selectedStudents.length) * 100}%` }}
              />
            </div>
            <div className="flex gap-4 text-xs text-indigo-700 font-medium">
              <span>✓ {emailsSent} sent</span>
              {emailsFailed > 0 && <span className="text-rose-600">✗ {emailsFailed} failed</span>}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/[0.05]">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50 sticky top-0">Candidate</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50 sticky top-0">Shortlisted</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50 sticky top-0">Ticket</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50 sticky top-0">Email Status</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50 sticky top-0">Last Sent</th>
              </tr>
            </thead>
            <tbody>
              {selectedStudents.sort((a,b)=>(a.rank||0)-(b.rank||0)).map((s) => (
                <tr key={s.email} className="border-b border-black/[0.02] hover:bg-black/[0.01]">
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      ✓ Rank {s.rank}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm text-slate-700">{s.ticketId}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase
                        ${s.emailStatus === 'SENT' ? 'bg-emerald-100 text-emerald-700' : 
                          s.emailStatus === 'FAILED' ? 'bg-rose-100 text-rose-700' : 
                          'bg-amber-100 text-amber-700'}`}>
                        {s.emailStatus === 'SENT' && '✓ '}
                        {s.emailStatus === 'FAILED' && '✗ '}
                        {s.emailStatus || 'PENDING'}
                      </span>
                      {s.emailStatus === 'FAILED' && s.emailFailureReason && (
                        <span className="text-[10px] text-rose-500 max-w-[200px] truncate" title={s.emailFailureReason}>
                          {s.emailFailureReason}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-xs text-slate-500">
                    {s.lastEmailAttempt ? new Date(s.lastEmailAttempt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                  </td>
                </tr>
              ))}
              {selectedStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    No candidates selected yet. Run the finalizer to generate the Top {shortlistSize}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modals */}
      {modalState !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4">
            <div className="p-6 border-b border-black/5 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {modalState === "send" ? "Send Tickets?" : "Resend Failed Tickets?"}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {modalState === "send" 
                    ? `${emailsPending} shortlisted candidates will receive their event/game tickets by email.`
                    : `You are about to retry sending tickets to ${emailsFailed} candidates who previously failed to receive them.`}
                </p>
              </div>
              <button onClick={() => setModalState("none")} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 bg-slate-50/50">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Total Shortlisted</span>
                  <span className="font-semibold text-slate-900">{selectedStudents.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Already Sent</span>
                  <span className="font-semibold text-emerald-600">{emailsSent}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-3 border-t border-black/5">
                  <span className="font-medium text-slate-900">
                    {modalState === "send" ? "Pending to Send" : "Failed to Retry"}
                  </span>
                  <span className={`font-bold ${modalState === 'send' ? 'text-indigo-600' : 'text-rose-600'}`}>
                    {modalState === "send" ? emailsPending : emailsFailed}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-black/5 flex gap-3 justify-end bg-white">
              <button 
                onClick={() => setModalState("none")}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={modalState === "send" ? handleSendEmails : handleResendFailed}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  modalState === 'send' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {modalState === "send" ? "Send Tickets" : "Retry Failed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
