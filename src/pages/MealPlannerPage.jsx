import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../features/recipes/recipesSlice";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function MealPlannerPage() {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const [query, setQuery] = useState("");
  const [plan, setPlan] = useState(() => {
    try {
      const stored = localStorage.getItem("meal_plan");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  useEffect(() => {
    localStorage.setItem("meal_plan", JSON.stringify(plan));
  }, [plan]);

  const filtered = useMemo(() => {
    if (!query.trim()) return recipes;
    const lower = query.toLowerCase();
    return recipes.filter(
      (recipe) =>
        recipe.name?.toLowerCase().includes(lower) ||
        recipe.cuisine?.toLowerCase().includes(lower)
    );
  }, [recipes, query]);

  const onDragStart = (event, recipe) => {
    event.dataTransfer.setData("text/plain", recipe.id.toString());
  };

  const onDrop = (event, day) => {
    event.preventDefault();
    const id = Number(event.dataTransfer.getData("text/plain"));
    if (!id) return;
    setPlan((prev) => ({
      ...prev,
      [day]: prev[day]?.includes(id) ? prev[day] : [...(prev[day] || []), id],
    }));
  };

  const removeFromDay = (day, id) => {
    setPlan((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((item) => item !== id),
    }));
  };

  const clearDay = (day) => {
    setPlan((prev) => ({ ...prev, [day]: [] }));
  };

  const byId = useMemo(
    () => new Map(recipes.map((recipe) => [recipe.id, recipe])),
    [recipes]
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Meal planner
        </p>
        <h1 className="font-display text-3xl text-[var(--text)]">
          Plan your week by dragging recipes
        </h1>
        <p className="max-w-2xl text-sm text-[var(--muted)]">
          Drag recipes into each day to build a weekly plan. Your plan is saved
          locally.
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
        <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search recipes to drag..."
            className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted-2)]"
          />
        </div>

        {loading && (
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-2)]/70 p-6 text-sm text-[var(--muted)]">
            Loading recipes...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-[#5a1a2f] bg-[#2a0f1f]/70 p-6 text-sm text-[#ff9bc7]">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.slice(0, 12).map((recipe) => (
              <div
                key={recipe.id}
                draggable
                onDragStart={(event) => onDragStart(event, recipe)}
                className="flex cursor-grab items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/70 px-4 py-3 text-sm text-[var(--text)]"
              >
                <span>{recipe.name}</span>
                <span className="text-xs text-[var(--muted-2)]">
                  {(recipe.prepTimeMinutes || 0) +
                    (recipe.cookTimeMinutes || 0)}{" "}
                  min
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {DAYS.map((day) => (
          <div
            key={day}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => onDrop(event, day)}
            className="flex min-h-[180px] flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">
                  {day}
                </p>
                <p className="text-sm text-[var(--muted)]">
                  Drop recipes here
                </p>
              </div>
              <button
                type="button"
                onClick={() => clearDay(day)}
                className="rounded-full border border-[var(--border-strong)] px-3 py-1 text-xs font-semibold text-[var(--text)] hover:border-[var(--accent)]"
              >
                Clear
              </button>
            </div>

            {(plan[day] || []).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-2)]/70 p-4 text-xs text-[var(--muted)]">
                No recipes yet.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {(plan[day] || []).map((id) => {
                  const recipe = byId.get(id);
                  if (!recipe) return null;
                  return (
                    <div
                      key={`${day}-${id}`}
                      className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/70 px-3 py-2 text-sm text-[var(--text)]"
                    >
                      <span>{recipe.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFromDay(day, id)}
                        className="text-xs text-[var(--muted)] hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

export default MealPlannerPage;
