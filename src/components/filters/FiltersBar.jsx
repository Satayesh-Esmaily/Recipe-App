function FiltersBar({
  difficulty,
  onDifficultyChange,
  cuisine,
  onCuisineChange,
  maxTime,
  onMaxTimeChange,
  tag,
  onTagChange,
  cuisines,
  tags,
}) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
          Filter
        </p>
        <h3 className="font-display text-xl text-slate-900">
          Refine your recipe board
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
          Difficulty
          <select
            value={difficulty}
            onChange={(event) => onDifficultyChange(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
          >
            {["All", "Easy", "Medium", "Hard"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
          Cuisine
          <select
            value={cuisine}
            onChange={(event) => onCuisineChange(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
          >
            {cuisines.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
          Max time
          <select
            value={maxTime}
            onChange={(event) => onMaxTimeChange(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
          >
            {[
              { label: "Any", value: "Any" },
              { label: "15 min", value: "15" },
              { label: "30 min", value: "30" },
              { label: "45 min", value: "45" },
              { label: "60 min", value: "60" },
              { label: "90 min", value: "90" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
          Tag
          <select
            value={tag}
            onChange={(event) => onTagChange(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
          >
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

export default FiltersBar;
