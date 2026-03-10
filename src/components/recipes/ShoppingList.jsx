import { useMemo, useState } from "react";

function ShoppingList({ recipes }) {
  const [checked, setChecked] = useState({});

  const items = useMemo(() => {
    const map = new Map();
    recipes.forEach((recipe) => {
      (recipe.ingredients || []).forEach((ingredient) => {
        const key = ingredient.trim();
        if (!key) return;
        map.set(key, (map.get(key) || 0) + 1);
      });
    });
    return Array.from(map.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [recipes]);

  const toggleItem = (name) => {
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
          Shopping list
        </p>
        <h3 className="font-display text-xl text-[var(--text)]">
          Ingredients from your favorites
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Based on recipes you saved. Tick items as you shop.
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-2)]/70 p-6 text-sm text-[var(--muted)]">
          Save a few recipes to generate your shopping list.
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-2)]/70 p-6 text-sm text-[var(--muted)]">
          No ingredients found for the selected recipes.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <label
              key={item.name}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                checked[item.name]
                  ? "border-[var(--accent)] bg-[var(--surface-2)] text-[var(--muted)] line-through"
                  : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]"
              }`}
            >
              <span>{item.name}</span>
              <input
                type="checkbox"
                checked={Boolean(checked[item.name])}
                onChange={() => toggleItem(item.name)}
                className="accent-[var(--accent)]"
              />
            </label>
          ))}
        </div>
      )}
    </section>
  );
}

export default ShoppingList;
