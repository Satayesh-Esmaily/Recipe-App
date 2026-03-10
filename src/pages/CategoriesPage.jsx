import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../features/recipes/recipesSlice";

function CategoriesPage() {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  const categories = useMemo(() => {
    const map = new Map();

    recipes.forEach((recipe) => {
      const key = recipe.cuisine || "Other";
      const existing = map.get(key);
      const totalMinutes =
        (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

      if (!existing) {
        map.set(key, {
          cuisine: key,
          count: 1,
          recipes: [recipe],
          totalMinutes,
          tags: new Map(),
        });
        return;
      }

      existing.count += 1;
      existing.recipes.push(recipe);
      existing.totalMinutes += totalMinutes;
    });

    const list = Array.from(map.values()).map((item) => {
      item.recipes.forEach((recipe) => {
        (recipe.tags || []).forEach((tag) => {
          item.tags.set(tag, (item.tags.get(tag) || 0) + 1);
        });
      });

      const topTags = Array.from(item.tags.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([tag]) => tag);

      return {
        cuisine: item.cuisine,
        count: item.count,
        avgTime: Math.round(item.totalMinutes / item.count),
        topTags,
        sample: item.recipes.slice(0, 3),
      };
    });

    return list.sort((a, b) => b.count - a.count);
  }, [recipes]);

  const filteredCategories = useMemo(() => {
    if (!query.trim()) {
      return categories;
    }

    const lower = query.toLowerCase();
    return categories.filter((category) => {
      return (
        category.cuisine.toLowerCase().includes(lower) ||
        category.topTags.some((tag) => tag.toLowerCase().includes(lower))
      );
    });
  }, [categories, query]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Categories
        </p>
        <h1 className="font-display text-3xl text-[var(--text)]">
          Browse cuisines in depth
        </h1>
        <p className="max-w-2xl text-sm text-[var(--muted)]">
          Dive deeper into each cuisine with top tags, average cook time, and
          featured recipes.
        </p>
        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/80 p-4 sm:flex-row sm:items-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a cuisine or tag..."
            className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted-2)]"
          />
        </div>
      </header>

      {loading && (
        <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)]/80 p-10 text-center text-[var(--muted)]">
          Loading categories...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-[#5a1a2f] bg-[#2a0f1f]/70 p-10 text-center text-[#ff9bc7]">
          {error}
        </div>
      )}

      {!loading && !error && (
        <section className="grid gap-6 md:grid-cols-2">
          {filteredCategories.map((category) => (
            <article
              key={category.cuisine}
              className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
                    Cuisine
                  </p>
                  <h2 className="font-display text-2xl text-[var(--text)]">
                    {category.cuisine}
                  </h2>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/80 px-4 py-2 text-xs font-semibold text-[var(--muted)]">
                  {category.count} recipes
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.topTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/80 p-3 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
                    Avg time
                  </p>
                  <p className="font-display text-lg text-[var(--text)]">
                    {category.avgTime} min
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/80 p-3 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
                    Difficulty
                  </p>
                  <p className="font-display text-lg text-[var(--text)]">
                    Mixed
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/80 p-3 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
                    Popularity
                  </p>
                  <p className="font-display text-lg text-[var(--text)]">
                    ⭐ {Math.max(...category.sample.map((r) => r.rating || 0)).toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-[var(--muted)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
                  Featured recipes
                </p>
                <ul className="flex flex-col gap-2">
                  {category.sample.map((recipe) => (
                    <li
                      key={recipe.id}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/70 px-3 py-2"
                    >
                      {recipe.name}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default CategoriesPage;
