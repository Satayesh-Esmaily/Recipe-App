import StatPill from "../common/StatPill";

function Hero({ query, onQueryChange, stats }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(224,122,95,0.25),_transparent_55%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-12 pt-16">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Daily recipe journal
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h1 className="font-display text-4xl leading-tight text-slate-900 md:text-5xl">
                Cook bold, cozy meals with a curated recipe atlas.
              </h1>
              <p className="mt-4 text-base text-slate-600">
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

        <div className="flex flex-col gap-3 rounded-3xl border border-black/10 bg-white/80 p-4 shadow-sm md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Search
            </span>
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search for chicken, pasta, or cozy soups..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            className="rounded-2xl bg-[#3a5a40] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d4732]"
          >
            Explore recipes
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
