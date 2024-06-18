import { defineStore } from "pinia";
import {
  create_branches,
  delete_branches,
  get_all_branches,
  search_branches,
  update_branches_service,
} from "src/services/branches-service";

export const useBranchesStore = defineStore("branches", {
  state: () => ({
    branches: [],
  }),

  actions: {
    async create(data) {
      const result = await create_branches(data);
      this.branches.unshift(result.data);
    },

    async delete(id) {
      const result = await delete_branches(id);
      const index = this.branches.findIndex((item) => item.id == id);
      this.branches.splice(index, 1);
    },

    async update(id, data) {
      const result = await update_branches_service(id, data);
      const index = this.branches.findIndex((item) => item.id == id);
      if (index !== -1) {
        this.branches[index] = result; // Ensure result is used correctly
      }
    },

    async fetchBranches() {
      const data = await get_all_branches();
      this.branches = data;
    },

    async searchBranches(searchQuery) {
      const data = await search_branches(searchQuery);
      this.branches = data;
    },
  },
});
