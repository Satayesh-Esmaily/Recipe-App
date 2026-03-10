function StatPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-3 text-left shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">{label}</p>
      <p className="font-display text-lg text-[var(--text)]">{value}</p>
    </div>
  );
}

export default StatPill;
