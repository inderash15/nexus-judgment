export function ActionButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-emerald-400/60 bg-gradient-to-b from-emerald-500/30 to-emerald-700/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-emerald-50 shadow-[0_10px_40px_-10px_rgba(52,211,153,0.6)] transition hover:from-emerald-400/40 hover:to-emerald-600/30 hover:shadow-[0_10px_60px_-5px_rgba(52,211,153,0.8)] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
    >
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent opacity-0 transition group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
