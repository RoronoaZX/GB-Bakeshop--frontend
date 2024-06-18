import { defineStore } from "pinia";
import {
  get_all_raw_materials_service,
  delete_raw_materials_service,
  update_raw_material_service,
  create_raw_materials_service,
  search_raw_materials,
} from "src/services/raw-materials-service";

import { api } from "src/boot/axios";
import { get_ingredients_service } from "src/services/ingredients-service";

export const useRawMaterialStore = defineStore("rawMaterials", {
  state: () => ({
    rawMaterials: [],
    ingredients: [],
  }),

  actions: {
    async create(data) {
      const result = await create_raw_materials_service(data);
      this.rawMaterials.unshift(result.data);
    },

    async delete(id) {
      const result = await delete_raw_materials_service(id);
      const index = this.rawMaterials.findIndex((item) => item.id == id);
      this.rawMaterials.splice(index, 1);
    },

    async update(id, data) {
      const result = await update_raw_material_service(id, data);
      const index = this.rawMaterials.findIndex((item) => item.id == id);
      this.rawMaterials[index] = result.data;
    },

    async fetchMaterials() {
      const data = await get_all_raw_materials_service();
      this.rawMaterials = data;
    },

    async searchRawMaterials(searchQuery) {
      const data = await search_raw_materials(searchQuery);
      this.rawMaterials = data;
    },

    async fetchIngredients() {
      const data = await get_ingredients_service();
      this.ingredients = data;
    },
  },
});
