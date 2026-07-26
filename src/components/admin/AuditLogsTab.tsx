import { SecurityLog } from "@/lib/db";

type AuditLogsTabProps = {
  securityLogs: SecurityLog[];
};

export function AuditLogsTab({ securityLogs }: AuditLogsTabProps) {
  return (
    <div className="space-y-6 flex-1 animate-in fade-in duration-300">
      <div className="bg-white/80 border border-white/50 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
            <tr className="text-slate-400 font-bold border-b border-slate-100 bg-slate-50/20">
              <th className="p-4">Timestamp</th>
              <th className="p-4">Action</th>
              <th className="p-4">Candidate Target</th>
              <th className="p-4">Status</th>
              <th className="p-4">Details Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50 text-slate-700 font-bold">
            {securityLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/40 transition-colors">
                <td className="p-4 font-mono text-slate-400 text-[10px]">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="p-4 text-slate-700">{log.action}</td>
                <td className="p-4 text-slate-500 font-semibold">{log.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border uppercase ${
                      log.status === "success"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : log.status === "suspicious"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="p-4 text-slate-450 font-medium max-w-xs truncate">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
