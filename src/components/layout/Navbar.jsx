function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e07a5f] text-white shadow-sm">
            <span className="font-display text-lg">R</span>
          </div>
          <div>
            <p className="font-display text-lg leading-none text-slate-900">
              Rustic Recipes
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Cook &amp; Share
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          <button type="button" className="hover:text-slate-900">
            Discover
          </button>
          <button type="button" className="hover:text-slate-900">
            Categories
          </button>
          <button type="button" className="hover:text-slate-900">
            Collections
          </button>
          <button type="button" className="hover:text-slate-900">
            About
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 md:inline-flex"
          >
            Sign in
          </button>
          <button
            type="button"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Get the app
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
