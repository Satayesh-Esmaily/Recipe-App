import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface-2)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-sm">
            <span className="font-display text-lg">R</span>
          </div>
          <div>
            <p className="font-display text-lg leading-none text-[var(--text)]">
              Rustic Recipes
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Cook &amp; Share
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[var(--muted)] md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            Discover
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/collections"
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            Collections
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            About
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-white md:inline-flex"
          >
            Sign in
          </button>
          <button
            type="button"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-2)]"
          >
            Get the app
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
