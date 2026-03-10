import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }
    localStorage.setItem(
      "mock_user",
      JSON.stringify({ email, signedInAt: new Date().toISOString() })
    );
    setMessage("Signed in (demo).");
    navigate("/");
  };

  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
      <header className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Auth
        </p>
        <h1 className="font-display text-3xl text-[var(--text)]">Sign in</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Demo login (no real backend).
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6"
      >
        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
          />
        </label>

        {message && (
          <p className="text-xs text-[var(--muted)]" role="status">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="rounded-2xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-2)]"
        >
          Sign in
        </button>

        <p className="text-xs text-[var(--muted)]">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[var(--text)] underline">
            Create one
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
