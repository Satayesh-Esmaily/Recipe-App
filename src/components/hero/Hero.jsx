import StatPill from "../common/StatPill";

function Hero({ query, onQueryChange, stats, onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--glow),_transparent_55%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-12 pt-16">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Daily recipe journal
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h1 className="font-display text-4xl leading-tight text-[var(--text)] md:text-5xl">
                Cook bold, cozy meals with a curated recipe atlas.
              </h1>
              <p className="mt-4 text-base text-[var(--muted)]">
                Browse handpicked recipes, explore cuisines, and build your
                weekly table with a visual recipe library.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {stats.map((stat) => (
                <StatPill key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-4 shadow-sm md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-[var(--surface-2)] px-4 py-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-2)]">
              Search
            </span>
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search for chicken, pasta, or cozy soups..."
              className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted-2)]"
            />
          </div>
          <button
            type="button"
            onClick={onExplore}
            className="rounded-2xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-2)]"
          >
            Explore recipes
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
