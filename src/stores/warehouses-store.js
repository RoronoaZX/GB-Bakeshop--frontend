import { defineStore } from "pinia";
import {
  create_warehouse_service,
  delete_warehouse_service,
  get_all_warehouse_service,
  search_warehouse_service,
  update_warehouse_service,
} from "src/services/warehouse-service";

export const useWarehousesStore = defineStore("warehouses", {
  state: () => ({
    warehouses: [],
  }),

  actions: {
    async create(data) {
      const result = await create_warehouse_service(data);
      this.warehouses.unshift(result.data);
    },

    async delete(id) {
      const result = await delete_warehouse_service(id);
      const index = this.warehouses.findIndex((item) => item.id == id);
      this.warehouses.splice(index, 1);
    },

    async update(id, data) {
      const result = await update_warehouse_service(id, data);
      const index = this.warehouses.findIndex((item) => item.id == id);
      this.warehouses[index] = result.data;
    },

    async fetchWarehouses() {
      const data = await get_all_warehouse_service();
      this.warehouses = data;
    },

    async searchWarehouse(searchQuery) {
      const data = await search_warehouse_service(searchQuery);
      this.warehouses = data;
    },
  },
});
