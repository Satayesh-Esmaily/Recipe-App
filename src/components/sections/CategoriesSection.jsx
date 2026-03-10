import SectionHeader from "../common/SectionHeader";

function CategoriesSection({ cuisines, activeCuisine, onSelect }) {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title="Explore by cuisine"
        subtitle="Categories"
        action={
          <p className="text-sm text-slate-500">
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
                  ? "border-[#e07a5f] bg-[#e07a5f] text-white shadow"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
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
