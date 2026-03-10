import SectionHeader from "../common/SectionHeader";
import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes, onOpen }) {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title="All recipes"
        subtitle="Library"
        action={
          <p className="text-sm text-slate-500">
            Showing {recipes.length} recipes
          </p>
        }
      />

      {recipes.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-slate-600">
          No recipes match your filters.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecipeGrid;
