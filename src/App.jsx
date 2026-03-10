import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "./features/recipes/recipesSlice";

function App() {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  return (
    <div>
      <h1>Recipes</h1>

      {loading && <p>Loading...</p>}

      {recipes.map((recipe) => (
        <p key={recipe.id}>{recipe.name}</p>
      ))}
    </div>
  );
}

export default App;