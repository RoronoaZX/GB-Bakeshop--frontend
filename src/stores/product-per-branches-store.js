import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import {
  get_all_branches_products,
  create_branch_product,
  delete_branch_product,
  update_branch_product_price,
} from "src/services/product-per-branches-service";

export const useProductPerBranchesStore = defineStore("productPerBranches", {
  state: () => ({
    branchId: null,
    branchProducts: [],
  }),

  actions: {
    async fetchBranchProducts(branchId) {
      this.branchId = branchId;

      const response = await get_all_branches_products(branchId);
      this.branchProducts = response.data;
    },

    async create(data) {
      const result = await create_branch_product(data);
      this.branchProducts.unshift(result.data);
    },

    async delete(id) {
      const result = await delete_branch_product(id);
      const index = this.branchProducts.findIndex((item) => item.id == id);
      if (index > -1) {
        this.branchProducts.splice(index, 1); // Ensure reactivity by using splice
      }
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
