function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
          {subtitle}
        </p>
        <h2 className="font-display text-2xl text-slate-900">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export default SectionHeader;
