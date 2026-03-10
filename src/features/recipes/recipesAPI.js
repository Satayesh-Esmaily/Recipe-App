export async function getRecipes() {
  const res = await fetch("https://dummyjson.com/recipes");

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}