import { Activity, Download, Search } from "lucide-react";
import { useState } from "react";

export function AuditLogsTab({ securityLogs }: { securityLogs: any[] }) {
  const [logSearch, setLogSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const filteredLogs = securityLogs.filter((log) => {
    if (logSearch && !log.action.toLowerCase().includes(logSearch.toLowerCase()) && !log.email?.toLowerCase().includes(logSearch.toLowerCase())) {
      return false;
    }
    if (filterSeverity !== "all") {
      if (filterSeverity === "suspicious" && log.status !== "suspicious") return false;
      if (filterSeverity === "failed" && log.status !== "failed") return false;
      if (filterSeverity === "normal" && log.status !== "success" && log.status !== "warning") return false;
    }
    return true;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="flex flex-col gap-6 w-full h-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h2 className="text-3xl font-light tracking-tight text-black leading-tight">Security</h2>
            <h2 className="text-[10px] font-medium tracking-widest text-black uppercase mt-2">
              Audit Logs • {filteredLogs.length} Events
            </h2>
          </div>
          
          <button
            onClick={() => {/* CSV Export logic */}}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] text-black transition-colors text-xs font-bold uppercase tracking-wider"
          >
            <Download className="w-3.5 h-3.5" />
            Export Audit
          </button>
        </div>

        <div className="glass-panel rounded-full p-2 flex flex-col md:flex-row gap-2 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
            <input
              type="text"
              placeholder="Search event or target ID..."
              value={logSearch}
              onChange={(e) => setLogSearch(e.target.value)}
              className="w-full bg-black/[0.03] hover:bg-black/[0.06] focus:bg-black/[0.06] border border-black/[0.04] focus:border-black/[0.08] rounded-full pl-10 pr-4 py-2.5 text-sm text-black placeholder:text-black transition-all outline-none font-mono"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full md:w-48 bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.04] rounded-full px-4 py-2.5 text-sm text-black appearance-none outline-none cursor-pointer"
            >
              <option value="all" className="bg-white">All Severities</option>
              <option value="suspicious" className="bg-white">High Risk</option>
              <option value="failed" className="bg-white">Warnings</option>
              <option value="normal" className="bg-white">Information</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl flex flex-col flex-1 min-h-0 relative overflow-hidden">
        <div className="flex-1 overflow-auto scrollbar-hide relative z-10 p-2">
          <table className="w-full text-left text-xs whitespace-nowrap border-separate border-spacing-y-[3px]">
            <thead>
              <tr className="text-[10px] font-medium tracking-widest text-black uppercase">
                <th className="px-5 py-4 w-32">Time</th>
                <th className="px-5 py-4">Event Code</th>
                <th className="px-5 py-4">Target ID</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-black text-sm">
                    No security events found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, i) => {
                  const isHigh = log.status === "suspicious";
                  const isWarn = log.status === "failed";
                  return (
                    <tr key={i} className="group transition-colors">
                      <td className="px-5 py-3 rounded-l-xl glass-panel-inner bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors">
                        <span className="font-mono text-black">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </td>
                      <td className="px-5 py-3 glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors">
                        <span className="font-mono text-black uppercase tracking-widest text-[10px]">{log.action}</span>
                      </td>
                      <td className="px-5 py-3 glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors">
                        <span className="font-mono text-black">NXP-{log.email?.substring(0, 6) || '??'}</span>
                      </td>
                      <td className="px-5 py-3 rounded-r-xl glass-panel-inner border-l-0 bg-black/[0.02] group-hover:bg-black/[0.04] transition-colors">
                        <span className={`text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 ${isHigh ? "text-rose-400" : isWarn ? "text-amber-400" : "text-emerald-400"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isHigh ? "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]" : isWarn ? "bg-amber-400" : "bg-emerald-400"}`}></span>
                          {isHigh ? "CRITICAL" : isWarn ? "WARNING" : "SUCCESS"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-3xl" />
      </div>
    </div>
  );
}
