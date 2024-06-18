import { defineStore } from "pinia";
import {
  create_branch_product,
  delete_branch_product,
  get_all_branches_products,
  search_branch_id_service,
  update_branch_product_price,
} from "src/services/branches-id-service";

export const useBranchIdStore = defineStore("branchId", {
  state: () => ({
    branchId: [],
    branchProducts: [],
  }),

  actions: {
    async searchBranchId(searchQuery) {
      const data = await search_branch_id_service(searchQuery);
      this.branchId = data;
    },

    async create(data) {
      const result = await create_branch_product(data);
      this.branchProducts.unshift(result.data);
    },

    async delete(id) {
      const result = await delete_branch_product(id);
      const index = this.branchProducts.findIndex((item) => item.id == id);
      this.branchProducts.splice(index, 1);
    },

    async fetchBranchProducts() {
      const data = await get_all_branches_products();
      this.branchProducts = data;
    },

    async updatedBranchProductPrice(id, newPrice) {
      try {
        await update_branch_product_price(id, newPrice);
        const index = this.branchProducts.findIndex((item) => item.id == id);
        this.branchProducts[index].price = newPrice;
      } catch (error) {
        console.error("Error updating recipe name:", error);
        throw error;
      }
    },
  },
});
