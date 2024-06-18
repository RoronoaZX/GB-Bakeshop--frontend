import { defineStore } from "pinia";
import { get_bread_service } from "src/services/bread-service";
import {
  create_product_service,
  delete_product_service,
  get_all_products_service,
  search_product,
  update_product_service,
} from "src/services/product-service";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    breads: [],
  }),

  actions: {
    async create(data) {
      const result = await create_product_service(data);
      this.products.unshift(result.data);
    },

    async delete(id) {
      const result = await delete_product_service(id);
      const index = this.products.findIndex((item) => item.id == id);
      this.products.splice(index, 1);
    },

    async update(id, data) {
      const result = await update_product_service(id, data);
      const index = this.products.findIndex((item) => item.id == id);
      this.products[index] = result.data;
    },

    async fetchProducts() {
      const data = await get_all_products_service();
      this.products = data;
    },

    async searchProducts(searchQuery) {
      const data = await search_product(searchQuery);
      this.products = data;
    },

    async fetchBread() {
      const data = await get_bread_service();
      this.breads = data;
    },
  },
});
