import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      setMessage("Please fill out all fields.");
      return;
    }
    localStorage.setItem(
      "mock_user",
      JSON.stringify({
        name,
        email,
        signedInAt: new Date().toISOString(),
      })
    );
    setMessage("Account created (demo).");
    navigate("/");
  };

  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
      <header className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Auth
        </p>
        <h1 className="font-display text-3xl text-[var(--text)]">Sign up</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Demo signup (no real backend).
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6"
      >
        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
          Full name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
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
          Create account
        </button>

        <p className="text-xs text-[var(--muted)]">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--text)] underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}

export default SignupPage;
