import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Recipe } from "@/types";

interface RecipesState {
  selectedRecipe: Recipe | null;
}

const initialState: RecipesState = {
  selectedRecipe: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSelectedRecipe(state, action: PayloadAction<Recipe>) {
      state.selectedRecipe = action.payload;
    },
    clearSelectedRecipe(state) {
      state.selectedRecipe = null;
    },
  },
});

export const { setSelectedRecipe, clearSelectedRecipe } =
  recipesSlice.actions;

export default recipesSlice.reducer;
