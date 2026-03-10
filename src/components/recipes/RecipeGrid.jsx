import SectionHeader from "../common/SectionHeader";
import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes, onOpen, onToggleFavorite, isFavorite }) {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title="All recipes"
        subtitle="Library"
        action={
          <p className="text-sm text-[var(--muted)]">
            Showing {recipes.length} recipes
          </p>
        }
      />

      {recipes.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)]/80 p-10 text-center text-[var(--muted)]">
          No recipes match your filters.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onOpen={onOpen}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecipeGrid;
