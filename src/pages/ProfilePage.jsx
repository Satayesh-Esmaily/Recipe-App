import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../features/recipes/recipesSlice";

function ProfilePage() {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("recipe_favorites");
      const storedHistory = localStorage.getItem("cook_history");
      setFavorites(storedFavs ? JSON.parse(storedFavs) : []);
      setHistory(storedHistory ? JSON.parse(storedHistory) : []);
    } catch {
      setFavorites([]);
      setHistory([]);
    }
  }, []);

  const favoriteRecipes = useMemo(() => {
    return recipes.filter((recipe) => favorites.includes(recipe.id));
  }, [recipes, favorites]);

  const historyRecipes = useMemo(() => {
    const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
    return history
      .map((entry) => byId.get(entry.id))
      .filter(Boolean)
      .slice(0, 8);
  }, [recipes, history]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Profile
        </p>
        <h1 className="font-display text-3xl text-[var(--text)]">
          Your cooking dashboard
        </h1>
        <p className="max-w-2xl text-sm text-[var(--muted)]">
          Track cooked recipes, saved favorites, and your recent history.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Cooked count
          </p>
          <p className="font-display text-3xl text-[var(--text)]">
            {history.length}
          </p>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Favorites
          </p>
          <p className="font-display text-3xl text-[var(--text)]">
            {favorites.length}
          </p>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Latest cooked
          </p>
          <p className="font-display text-lg text-[var(--text)]">
            {history[0]?.cookedAt
              ? new Date(history[0].cookedAt).toLocaleDateString()
              : "No entries"}
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Recent history
          </p>
          <h2 className="font-display text-xl text-[var(--text)]">
            Last cooked recipes
          </h2>
          {historyRecipes.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--muted)]">
              Mark a recipe as cooked to build your history.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {historyRecipes.map((recipe) => (
                <li
                  key={recipe.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/70 px-4 py-3 text-sm text-[var(--text)]"
                >
                  {recipe.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Favorites
          </p>
          <h2 className="font-display text-xl text-[var(--text)]">
            Saved recipes
          </h2>
          {favoriteRecipes.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--muted)]">
              Save recipes to see them here.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {favoriteRecipes.slice(0, 8).map((recipe) => (
                <li
                  key={recipe.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/70 px-4 py-3 text-sm text-[var(--text)]"
                >
                  {recipe.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
