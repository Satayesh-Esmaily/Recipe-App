function RecipeCard({
  recipe,
  onOpen,
  variant = "default",
  onToggleFavorite,
  isFavorite,
}) {
  const totalMinutes = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
  const imageUrl = recipe.image || recipe.thumbnail;
  const favorite = isFavorite ? isFavorite(recipe.id) : false;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(recipe)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(recipe);
        }
      }}
      className={`group flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
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
        <div className="absolute left-3 top-3 rounded-full bg-[var(--surface-2)]/90 px-3 py-1 text-xs font-semibold text-[var(--text)] shadow">
          {recipe.difficulty || "Unknown"}
        </div>
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
            className={`absolute right-3 top-3 rounded-full border px-3 py-1 text-xs font-semibold transition ${
              favorite
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] hover:border-[var(--accent)]"
            }`}
          >
            {favorite ? "Saved" : "Save"}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-2)]">
          <span>{recipe.cuisine || "Cuisine"}</span>
          <span>{totalMinutes} min</span>
        </div>
        <h3 className="font-display text-lg text-[var(--text)]">{recipe.name}</h3>
        <p className="text-sm text-[var(--muted)]">
          {recipe.tags?.slice(0, 3).join(", ") || "Freshly curated recipe"}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm text-[var(--muted-2)]">
          <span>⭐ {recipe.rating?.toFixed(1) || "4.5"}</span>
          <span>{recipe.servings || 2} servings</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
