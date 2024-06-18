import { api } from "src/boot/axios";

export async function get_all_recipe(data) {
  const response = await api.get("/recipes", data);
  return response.data;
}

export async function create_recipe(data) {
  const response = await api.post("/recipes", data);
  return response;
}

export async function update_recipe(id, data) {
  const response = await api.put(`/recipes/${id}`, data);
  return response;
}

export async function delete_recipe(id) {
  const response = await api.delete(`/recipes/${id}`);
  return response.data;
}

export async function update_recipe_name(id, newName) {
  const response = await api.put(`/update-name/${id}`, {
    name: newName,
  });
  return response;
}

export async function update_recipe_target(id, newTarget) {
  const response = await api.post(`/recipes/${id}/update-target`, {
    target: newTarget,
  });
  return response;
}

export async function search_recipe(searchQuery) {
  const response = await api.post(`/search-recipe`, {
    keyword: searchQuery,
  });
  return response.data;
}
