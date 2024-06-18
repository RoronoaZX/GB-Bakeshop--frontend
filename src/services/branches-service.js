import { api } from "src/boot/axios";

export async function create_branch_product_service(data) {
  const response = await api.post("/branch_product", data);
  return response.data;
}

export async function get_all_branches(data) {
  const response = await api.get("/branches", data);
  return response.data;
}

export async function get_branches_by_id(id) {
  const response = await api.get(`/branches/${id}`);
  return response.data;
}

export async function create_branches(data) {
  const response = await api.post("/branches", data);
  return response;
}

export async function update_branches_service(id, data) {
  const response = await api.put(`/branches/${id}`, data);
  return response.data;
}

export async function delete_branches(id) {
  const response = await api.delete(`/branches/${id}`);
  return response.data;
}

export async function search_branches(searchQuery) {
  const response = await api.post(`/search`, {
    keyword: searchQuery,
  });
  return response.data;
}
