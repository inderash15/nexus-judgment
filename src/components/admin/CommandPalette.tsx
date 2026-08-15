import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Users, Activity, Radio, BookOpen, ShieldAlert, History, Settings } from "lucide-react";
import type { Tab } from "./types";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (val: boolean | ((val: boolean) => boolean)) => void;
  setActiveTab: (tab: Tab | "analytics" | "risk") => void;
  handleExportCSV: () => void;
  refreshData: () => void;
}

export function CommandPalette({
  open,
  setOpen,
  setActiveTab,
  handleExportCSV,
  refreshData,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  // Toggle the menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div 
        className="fixed inset-0" 
        onClick={() => setOpen(false)}
      />
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden relative z-[101]">
        <Command
          label="Command Palette"
          shouldFilter={true}
          value={search}
          onValueChange={setSearch}
        >
          <div className="flex items-center border-b border-slate-700 px-3 py-3">
            <Search className="w-5 h-5 text-black mr-2" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="w-full bg-transparent outline-none text-black placeholder:text-black font-medium"
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-6 text-center text-sm text-black font-medium">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-bold text-black uppercase tracking-wider mb-2 mt-2 px-2">
              <Command.Item
                onSelect={() => runCommand(() => setActiveTab("overview"))}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-black hover:bg-slate-800 hover:text-black cursor-pointer transition-colors"
              >
                <Activity className="w-4 h-4" /> Go to Overview
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setActiveTab("students"))}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-black hover:bg-slate-800 hover:text-black cursor-pointer transition-colors"
              >
                <Users className="w-4 h-4" /> Go to Candidates
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setActiveTab("live"))}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-black hover:bg-slate-800 hover:text-black cursor-pointer transition-colors"
              >
                <Radio className="w-4 h-4" /> Go to Live Room
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setActiveTab("questions"))}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-black hover:bg-slate-800 hover:text-black cursor-pointer transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Go to Round 1 Puzzles
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setActiveTab("mcq"))}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-black hover:bg-slate-800 hover:text-black cursor-pointer transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Go to Round 2 MCQs
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setActiveTab("risk"))}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-black hover:bg-slate-800 hover:text-black cursor-pointer transition-colors"
              >
                <ShieldAlert className="w-4 h-4" /> Go to Risk Center
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setActiveTab("audit"))}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-black hover:bg-slate-800 hover:text-black cursor-pointer transition-colors"
              >
                <History className="w-4 h-4" /> Go to Audit Logs
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Actions" className="text-xs font-bold text-black uppercase tracking-wider mb-2 mt-4 px-2">
              <Command.Item
                onSelect={() => runCommand(handleExportCSV)}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-black hover:bg-slate-800 hover:text-black cursor-pointer transition-colors"
              >
                <Users className="w-4 h-4" /> Export Candidates (CSV)
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(refreshData)}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-black hover:bg-slate-800 hover:text-black cursor-pointer transition-colors"
              >
                <Activity className="w-4 h-4" /> Refresh Dashboard Data
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
