import { defineStore } from "pinia";
import {
  create_recipe,
  delete_recipe,
  get_all_recipe,
  search_recipe,
  update_recipe_name,
  update_recipe_target,
} from "src/services/recipe-service";

export const useRecipeStore = defineStore("recipes", {
  state: () => ({
    recipes: [],
    recipe: [],
    target: [],
  }),

  actions: {
    async create(data) {
      const response = await create_recipe(data);
      this.recipes.unshift(response.data);
    },

    async delete(id) {
      const result = await delete_recipe(id);
      const index = this.recipes.findIndex((item) => item.id == id);
      this.recipes.splice(index, 1);
    },

    async update(id, data) {
      const result = await update_recipe(id, data);
      const index = this.recipes.findIndex((item) => item.id == id);
      this.recipes[index] = result.data;
    },

    async fetchRecipe() {
      const data = await get_all_recipe();
      this.recipes = data;
    },

    async updateRecipeName(id, newName) {
      try {
        await update_recipe_name(id, newName);
        const index = this.recipes.findIndex((item) => item.id == id);
        this.recipes[index].name = newName;
      } catch (error) {
        console.error("Error updating recipe name:", error);
        throw error;
      }
    },

    async searchRecipe(searchQuery) {
      const data = await search_recipe(searchQuery);
      this.recipes = data;
    },
  },
});
