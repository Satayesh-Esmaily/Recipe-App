import SectionHeader from "../common/SectionHeader";
import RecipeCard from "../recipes/RecipeCard";

function FeaturedSection({ recipes, onOpen }) {
  if (!recipes.length) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title="Chef picks for tonight"
        subtitle="Featured"
        action={
          <button
            type="button"
            className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-[var(--text)] hover:border-[var(--accent)] hover:text-white"
          >
            View all
          </button>
        }
      />

      <div className="flex gap-6 overflow-x-auto pb-2">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="min-w-[260px] max-w-[260px]">
            <RecipeCard recipe={recipe} onOpen={onOpen} variant="compact" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedSection;
