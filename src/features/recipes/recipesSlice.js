import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes } from "./recipesAPI";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const data = await getRecipes();
    return data.recipes;
  }
);

const recipesSlice = createSlice({
  name: "recipes",

  initialState: {
    recipes: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })

      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch recipes";
      });
  },
});

export default recipesSlice.reducer;