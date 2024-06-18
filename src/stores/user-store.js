import { defineStore } from "pinia";
import {
  delete_user,
  get_all_user,
  get_user_by_id, // Import the new function
  register_user,
  search_user,
  update_user,
} from "src/services/user-service";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [],
    user: null, // Change user state to be a single user object instead of an array
  }),

  actions: {
    async registerUser(data) {
      const response = await register_user(data);
      this.users.unshift(response.data);
    },

    async delete(id) {
      const result = await delete_user(id);
      const index = this.users.findIndex((item) => item.id == id);
      this.users[index] = result.data;
    },

    async update(id, data) {
      const result = await update_user(id, data);
      const index = this.users.findIndex((item) => item.id == id);
      this.users[index] = result.data;
    },

    async fetchUser() {
      const data = await get_all_user();
      this.users = data;
      return data;
    },

    async fetchUserById(id) {
      try {
        const response = await get_user_by_id(id);
        this.user = response.data;
      } catch (error) {
        console.error("Failed to fetch user by id:", error);
        throw error;
      }
    },
    userById(id) {
      return this.users.find((user) => user.id === id) || this.user;
    },

    async searchUser(searchQuery) {
      const data = await search_user(searchQuery);
      this.users = data;
      return data;
    },
  },
});
