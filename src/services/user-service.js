import { api } from "src/boot/axios";

export async function register_user(data) {
  const response = await api.post("/user", data);
  return response;
}

export async function get_all_user() {
  const response = await api.get("/user");
  return response.data;
}

export async function get_user_by_id(id) {
  // Add this function
  const response = await api.get(`/users/${id}`);
  return response;
}

export async function update_user(id, data) {
  const response = await api.post(`/user/${id}`, data);
  return response;
}

export async function delete_user(id) {
  const response = await api.delete(`/user/${id}`);
  return response.data;
}

export async function search_user(searchQuery) {
  const response = await api.post(`/search-user`, {
    keyword: searchQuery,
  });
  return response.data;
}
