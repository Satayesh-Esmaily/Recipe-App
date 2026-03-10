import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../features/recipes/recipesSlice";

function CollectionsPage() {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const [activeCollection, setActiveCollection] = useState("Quick & Easy");

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  const collections = useMemo(() => {
    const totalMinutes = (recipe) =>
      (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

    const byTag = (tag) =>
      recipes.filter((recipe) => recipe.tags?.includes(tag));

    const quick = recipes.filter((recipe) => totalMinutes(recipe) <= 30);
    const family = recipes.filter((recipe) => (recipe.servings || 0) >= 4);
    const topRated = [...recipes]
      .filter((recipe) => recipe.rating)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
    const trending = [...recipes]
      .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
      .slice(0, 6);

    return [
      {
        title: "Quick & Easy",
        description: "Fast, simple recipes that are ready in 30 minutes or less.",
        recipes: quick,
      },
      {
        title: "Top Rated",
        description: "Highest-rated dishes loved by the community.",
        recipes: topRated,
      },
      {
        title: "Family Table",
        description: "Hearty meals that serve 4 or more.",
        recipes: family,
      },
      {
        title: "Trending",
        description: "What people are cooking most right now.",
        recipes: trending,
      },
      {
        title: "Chef Tags",
        description: "Collections built from the most popular tags.",
        recipes: byTag("Italian").length ? byTag("Italian") : recipes,
      },
    ];
  }, [recipes]);

  const active = collections.find((item) => item.title === activeCollection);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Collections
        </p>
        <h1 className="font-display text-3xl text-[var(--text)]">
          Curated recipe collections
        </h1>
        <p className="max-w-2xl text-sm text-[var(--muted)]">
          Explore themed bundles built from ratings, time, servings, and popular
          tags. Pick a collection to see curated recipes.
        </p>
      </header>

      {loading && (
        <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)]/80 p-10 text-center text-[var(--muted)]">
          Loading collections...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-[#5a1a2f] bg-[#2a0f1f]/70 p-10 text-center text-[#ff9bc7]">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="flex flex-col gap-3">
            {collections.map((collection) => {
              const isActive = collection.title === activeCollection;
              return (
                <button
                  key={collection.title}
                  type="button"
                  onClick={() => setActiveCollection(collection.title)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--surface-2)] text-white"
                      : "border-[var(--border)] bg-[var(--surface)]/70 text-[var(--muted)] hover:border-[var(--accent)] hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{collection.title}</span>
                    <span className="text-xs text-[var(--muted-2)]">
                      {collection.recipes.length}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    {collection.description}
                  </p>
                </button>
              );
            })}
          </aside>

          <section className="flex flex-col gap-6">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
                Selected collection
              </p>
              <h2 className="font-display text-2xl text-[var(--text)]">
                {active?.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {active?.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {(active?.recipes || []).slice(0, 8).map((recipe) => (
                <article
                  key={recipe.id}
                  className="flex flex-col gap-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-5"
                >
                  <div className="flex items-center justify-between text-xs text-[var(--muted-2)]">
                    <span>{recipe.cuisine || "Cuisine"}</span>
                    <span>⭐ {recipe.rating?.toFixed(1) || "4.5"}</span>
                  </div>
                  <h3 className="font-display text-lg text-[var(--text)]">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">
                    {recipe.tags?.slice(0, 3).join(", ") || "Curated pick"}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs text-[var(--muted-2)]">
                    <span>{recipe.servings || 2} servings</span>
                    <span>
                      {(recipe.prepTimeMinutes || 0) +
                        (recipe.cookTimeMinutes || 0)}{" "}
                      min
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default CollectionsPage;
