import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "./features/recipes/recipesSlice";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/hero/Hero";
import CategoriesSection from "./components/sections/CategoriesSection";
import FeaturedSection from "./components/sections/FeaturedSection";
import FiltersBar from "./components/filters/FiltersBar";
import RecipeGrid from "./components/recipes/RecipeGrid";
import RecipeDetailsModal from "./components/recipes/RecipeDetailsModal";
import NewsletterSection from "./components/sections/NewsletterSection";

function App() {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const [maxTime, setMaxTime] = useState("Any");
  const [tag, setTag] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const cuisines = useMemo(() => {
    const list = recipes.map((recipe) => recipe.cuisine).filter(Boolean);
    return ["All", ...new Set(list)];
  }, [recipes]);

  const tags = useMemo(() => {
    const list = recipes.flatMap((recipe) => recipe.tags || []);
    return ["All", ...new Set(list)];
  }, [recipes]);

  const featuredRecipes = useMemo(() => {
    return [...recipes]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  }, [recipes]);

  const stats = useMemo(() => {
    if (!recipes.length) {
      return [
        { label: "Recipes", value: "0" },
        { label: "Cuisines", value: "0" },
        { label: "Avg Time", value: "0 min" },
      ];
    }

    const totalTime = recipes.reduce((acc, recipe) => {
      const prep = recipe.prepTimeMinutes || 0;
      const cook = recipe.cookTimeMinutes || 0;
      return acc + prep + cook;
    }, 0);

    const avgTime = Math.round(totalTime / recipes.length);

    return [
      { label: "Recipes", value: recipes.length.toString() },
      { label: "Cuisines", value: (cuisines.length - 1).toString() },
      { label: "Avg Time", value: `${avgTime} min` },
    ];
  }, [recipes, cuisines.length]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
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

      const matchesCuisine = cuisine === "All" || recipe.cuisine === cuisine;

      const matchesTag =
        tag === "All" || recipe.tags?.some((item) => item === tag);

      const matchesTime =
        maxTime === "Any" || totalMinutes <= Number(maxTime);

      return (
        matchesQuery &&
        matchesDifficulty &&
        matchesCuisine &&
        matchesTag &&
        matchesTime
      );
    });
  }, [recipes, query, difficulty, cuisine, maxTime, tag]);

  return (
    <div className="min-h-screen bg-[#f8f3ea] text-slate-900">
      <Navbar />
      <Hero query={query} onQueryChange={setQuery} stats={stats} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20">
        <CategoriesSection
          cuisines={cuisines}
          activeCuisine={cuisine}
          onSelect={setCuisine}
        />

        <FeaturedSection
          recipes={featuredRecipes}
          onOpen={setSelectedRecipe}
        />

        <FiltersBar
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          cuisine={cuisine}
          onCuisineChange={setCuisine}
          maxTime={maxTime}
          onMaxTimeChange={setMaxTime}
          tag={tag}
          onTagChange={setTag}
          cuisines={cuisines}
          tags={tags}
        />

        {loading && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-slate-600">
            Loading recipes...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <RecipeGrid recipes={filteredRecipes} onOpen={setSelectedRecipe} />
        )}

        <NewsletterSection />
      </main>

      <Footer />

      <RecipeDetailsModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}

export default App;
