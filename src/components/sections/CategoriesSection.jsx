import SectionHeader from "../common/SectionHeader";

function CategoriesSection({ cuisines, activeCuisine, onSelect }) {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title="Explore by cuisine"
        subtitle="Categories"
        action={
          <p className="text-sm text-[var(--muted)]">
            Tap a cuisine to refine your list.
          </p>
        }
      />

      <div className="flex flex-wrap gap-3">
        {cuisines.map((item) => {
          const isActive = item === activeCuisine;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow"
                  : "border-[var(--border)] bg-[var(--surface)]/80 text-[var(--muted)] hover:border-[var(--accent)] hover:text-white"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategoriesSection;
