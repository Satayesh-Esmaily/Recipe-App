function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          About
        </p>
        <h1 className="font-display text-3xl text-[var(--text)]">
          About Rustic Recipes
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-[var(--muted)]">
          Rustic Recipes is a modern recipe brand and companion app built for
          home cooks who want reliable results, clear steps, and beautiful
          inspiration. We focus on curated dishes, practical guidance, and a
          calm cooking experience.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Curated Recipes",
              text: "Every recipe is selected for clarity, flavor, and consistency so you can cook with confidence.",
            },
            {
              title: "Smart Discovery",
              text: "Search by cuisine, ingredients, time, and difficulty to find the right dish fast.",
            },
            {
              title: "Step-by-Step",
              text: "Clean instructions, ingredient lists, and timing details keep your workflow smooth.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/80 p-6"
            >
              <h3 className="font-display text-lg text-[var(--text)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            The App
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            The Rustic Recipes app brings our collection into a single, focused
            workspace: browse featured picks, save favorites, and build weekly
            menus. It is designed to feel calm, fast, and useful on any screen.
          </p>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
