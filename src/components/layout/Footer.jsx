function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg text-slate-900">
            Rustic Recipes
          </p>
          <p className="text-sm text-slate-600">
            Fresh ideas, curated every day.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm font-semibold text-slate-600">
          <button type="button" className="hover:text-slate-900">
            Privacy
          </button>
          <button type="button" className="hover:text-slate-900">
            Terms
          </button>
          <button type="button" className="hover:text-slate-900">
            Contact
          </button>
        </div>

        <p className="text-xs text-slate-500">
          © 2026 Rustic Recipes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
