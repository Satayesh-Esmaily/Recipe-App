function NewsletterSection() {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-8 shadow-sm md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Weekly menu
          </p>
          <h3 className="font-display text-2xl text-[var(--text)]">
            Get a fresh bundle of recipes every Friday.
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            We&apos;ll send seasonal picks, quick dinners, and chef notes to
            your inbox.
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            placeholder="you@email.com"
            className="w-full flex-1 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
          />
          <button
            type="button"
            className="rounded-2xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-2)]"
          >
            Join list
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
