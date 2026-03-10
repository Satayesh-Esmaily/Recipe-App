import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../features/recipes/recipesSlice";
import RecipeGrid from "../components/recipes/RecipeGrid";
import RecipeDetailsModal from "../components/recipes/RecipeDetailsModal";

function FeaturedPage() {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [maxTime, setMaxTime] = useState("Any");
  const [diet, setDiet] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("recipe_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  useEffect(() => {
    localStorage.setItem("recipe_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const diets = useMemo(() => {
    const dietKeywords = [
      "vegetarian",
      "vegan",
      "gluten-free",
      "keto",
      "low-carb",
      "dairy-free",
    ];
    const list = recipes
      .flatMap((recipe) => recipe.tags || [])
      .filter((tagItem) =>
        dietKeywords.some((keyword) =>
          tagItem.toLowerCase().includes(keyword)
        )
      );
    return ["All", ...new Set(list)];
  }, [recipes]);

  const featuredRecipes = useMemo(() => {
    const saved = recipes.filter((recipe) => favorites.includes(recipe.id));
    return saved.filter((recipe) => {
      const totalMinutes =
        (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
      const matchesQuery =
        query.trim().length === 0 ||
        recipe.name?.toLowerCase().includes(query.toLowerCase()) ||
        recipe.cuisine?.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients?.some((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
      const matchesDifficulty =
        difficulty === "All" || recipe.difficulty === difficulty;
      const matchesTime =
        maxTime === "Any" || totalMinutes <= Number(maxTime);
      const matchesDiet =
        diet === "All" || recipe.tags?.some((item) => item === diet);
      return matchesQuery && matchesDifficulty && matchesTime && matchesDiet;
    });
  }, [recipes, favorites, query, difficulty, maxTime, diet]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Favorites
        </p>
        <h1 className="font-display text-3xl text-[var(--text)]">
          Saved recipes
        </h1>
        <p className="max-w-2xl text-sm text-[var(--muted)]">
          All recipes you bookmarked appear here.
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-2)]">
              Search
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search saved recipes..."
              className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted-2)]"
            />
          </div>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
            Difficulty
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
            >
              {["All", "Easy", "Medium", "Hard"].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
            Max time
            <select
              value={maxTime}
              onChange={(event) => setMaxTime(event.target.value)}
              className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
            >
              {[
                { label: "Any", value: "Any" },
                { label: "15 min", value: "15" },
                { label: "30 min", value: "30" },
                { label: "45 min", value: "45" },
                { label: "60 min", value: "60" },
                { label: "90 min", value: "90" },
              ].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--muted)]">
            Diet
            <select
              value={diet}
              onChange={(event) => setDiet(event.target.value)}
              className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
            >
              {diets.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {loading && (
        <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)]/80 p-10 text-center text-[var(--muted)]">
          Loading saved recipes...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-[#5a1a2f] bg-[#2a0f1f]/70 p-10 text-center text-[#ff9bc7]">
          {error}
        </div>
      )}

      {!loading && !error && featuredRecipes.length === 0 && (
        <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)]/80 p-10 text-center text-[var(--muted)]">
          No saved recipes match your filters. Try adjusting your search.
        </div>
      )}

      {!loading && !error && featuredRecipes.length > 0 && (
        <RecipeGrid
          recipes={featuredRecipes}
          onOpen={setSelectedRecipe}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}

      <RecipeDetailsModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedRecipe ? isFavorite(selectedRecipe.id) : false}
      />
    </main>
  );
}

export default FeaturedPage;
