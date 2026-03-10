function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-2)]/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg text-[var(--text)]">
            Rustic Recipes
          </p>
          <p className="text-sm text-[var(--muted)]">
            Fresh ideas, curated every day.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm font-semibold text-[var(--muted)]">
          <button type="button" className="hover:text-white">
            Privacy
          </button>
          <button type="button" className="hover:text-white">
            Terms
          </button>
          <button type="button" className="hover:text-white">
            Contact
          </button>
        </div>

        <p className="text-xs text-[var(--muted-2)]">
          © 2026 Rustic Recipes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
