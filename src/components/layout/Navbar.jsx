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
            to="/favorites"
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            Favorites
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
          <NavLink
            to="/planner"
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            Planner
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `transition hover:text-white ${isActive ? "text-white" : ""}`
            }
          >
            Profile
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="/login"
            title="Sign in"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)]/70 text-[var(--text)] transition hover:border-[var(--accent)] hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 12H8" />
              <path d="M12 16l-4-4 4-4" />
              <path d="M20 6v12a2 2 0 0 1-2 2h-6" />
              <path d="M8 4h10a2 2 0 0 1 2 2" />
            </svg>
          </NavLink>
          <NavLink
            to="/signup"
            title="Sign up"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-[0_0_24px_rgba(193,18,31,0.25)] transition hover:bg-[var(--accent-2)]"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="3" />
              <path d="M5 20a7 7 0 0 1 14 0" />
              <path d="M19 8v4" />
              <path d="M17 10h4" />
            </svg>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
