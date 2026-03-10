function NewsletterSection() {
  return (
    <section className="rounded-3xl border border-black/10 bg-[#fffaf3] p-8 shadow-sm md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Weekly menu
          </p>
          <h3 className="font-display text-2xl text-slate-900">
            Get a fresh bundle of recipes every Friday.
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            We&apos;ll send seasonal picks, quick dinners, and chef notes to
            your inbox.
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            placeholder="you@email.com"
            className="w-full flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-400"
          />
          <button
            type="button"
            className="rounded-2xl bg-[#e07a5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d36a52]"
          >
            Join list
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
