function RecipeCard({ recipe, onOpen, variant = "default" }) {
  const totalMinutes = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
  const imageUrl = recipe.image || recipe.thumbnail;

  return (
    <button
      type="button"
      onClick={() => onOpen(recipe)}
      className={`group flex w-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        variant === "compact" ? "h-full" : ""
      }`}
    >
      <div className="relative h-40 w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={recipe.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-500">
            No image
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
          {recipe.difficulty || "Unknown"}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <span>{recipe.cuisine || "Cuisine"}</span>
          <span>{totalMinutes} min</span>
        </div>
        <h3 className="font-display text-lg text-slate-900">{recipe.name}</h3>
        <p className="text-sm text-slate-600">
          {recipe.tags?.slice(0, 3).join(", ") || "Freshly curated recipe"}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
          <span>⭐ {recipe.rating?.toFixed(1) || "4.5"}</span>
          <span>{recipe.servings || 2} servings</span>
        </div>
      </div>
    </button>
  );
}

export default RecipeCard;
