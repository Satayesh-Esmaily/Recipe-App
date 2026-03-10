function FiltersBar({
  difficulty,
  onDifficultyChange,
  cuisine,
  onCuisineChange,
  maxTime,
  onMaxTimeChange,
  tag,
  onTagChange,
  ingredients,
  onIngredientsChange,
  minCalories,
  onMinCaloriesChange,
  maxCalories,
  onMaxCaloriesChange,
  diet,
  onDietChange,
  sortBy,
  onSortChange,
  cuisines,
  tags,
  diets,
}) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
          Filter
        </p>
        <h3 className="font-display text-xl text-[var(--text)]">
          Refine your recipe board
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Difficulty
          <select
            value={difficulty}
            onChange={(event) => onDifficultyChange(event.target.value)}
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
          >
            {["All", "Easy", "Medium", "Hard"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Cuisine
          <select
            value={cuisine}
            onChange={(event) => onCuisineChange(event.target.value)}
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
          >
            {cuisines.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Max time
          <select
            value={maxTime}
            onChange={(event) => onMaxTimeChange(event.target.value)}
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
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

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Tag
          <select
            value={tag}
            onChange={(event) => onTagChange(event.target.value)}
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
          >
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)] md:col-span-2">
          Ingredients (comma separated)
          <input
            value={ingredients}
            onChange={(event) => onIngredientsChange(event.target.value)}
            placeholder="chicken, garlic, tomato"
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none placeholder:text-[var(--muted-2)] focus:border-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Min calories
          <input
            value={minCalories}
            onChange={(event) => onMinCaloriesChange(event.target.value)}
            type="number"
            min="0"
            placeholder="0"
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none placeholder:text-[var(--muted-2)] focus:border-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Max calories
          <input
            value={maxCalories}
            onChange={(event) => onMaxCaloriesChange(event.target.value)}
            type="number"
            min="0"
            placeholder="600"
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none placeholder:text-[var(--muted-2)] focus:border-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Diet
          <select
            value={diet}
            onChange={(event) => onDietChange(event.target.value)}
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
          >
            {diets.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Sort by
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
          >
            <option value="popular">Most popular</option>
            <option value="fastest">Fastest</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default FiltersBar;
