function StatPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-left shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="font-display text-lg text-slate-900">{value}</p>
    </div>
  );
}

export default StatPill;
