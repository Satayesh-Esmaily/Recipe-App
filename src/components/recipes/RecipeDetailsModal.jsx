function RecipeDetailsModal({ recipe, onClose }) {
  if (!recipe) {
    return null;
  }

  const totalMinutes = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
  const imageUrl = recipe.image || recipe.thumbnail;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {recipe.cuisine} · {recipe.difficulty}
            </p>
            <h3 className="font-display text-2xl text-slate-900">
              {recipe.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900"
          >
            Close
          </button>
        </div>

        <div className="grid max-h-[80vh] gap-6 overflow-y-auto p-6 md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-3xl">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={recipe.name}
                  className="h-72 w-full object-cover"
                />
              ) : (
                <div className="flex h-72 items-center justify-center bg-slate-200 text-slate-500">
                  No image
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Total time
                </p>
                <p className="font-display text-lg text-slate-900">
                  {totalMinutes} min
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Servings
                </p>
                <p className="font-display text-lg text-slate-900">
                  {recipe.servings || 2} people
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Calories
                </p>
                <p className="font-display text-lg text-slate-900">
                  {recipe.caloriesPerServing || 250} kcal
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Rating
                </p>
                <p className="font-display text-lg text-slate-900">
                  ⭐ {recipe.rating?.toFixed(1) || "4.5"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(recipe.tags || []).map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Ingredients
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-700">
                {(recipe.ingredients || []).map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Instructions
              </p>
              <ol className="mt-3 flex flex-col gap-3 text-sm text-slate-700">
                {(recipe.instructions || []).map((step, index) => (
                  <li
                    key={`${recipe.id}-step-${index}`}
                    className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                  >
                    <span className="mr-2 font-semibold text-slate-900">
                      {index + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailsModal;
