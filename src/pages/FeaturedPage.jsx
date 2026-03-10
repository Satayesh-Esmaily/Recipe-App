import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../features/recipes/recipesSlice";
import RecipeGrid from "../components/recipes/RecipeGrid";
import RecipeDetailsModal from "../components/recipes/RecipeDetailsModal";

function FeaturedPage() {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
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

  const featuredRecipes = useMemo(() => {
    return recipes.filter((recipe) => favorites.includes(recipe.id));
  }, [recipes, favorites]);

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
          You have no saved recipes yet. Save a few to see them here.
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
