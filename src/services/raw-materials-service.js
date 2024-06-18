import { api } from "src/boot/axios";

export async function get_all_raw_materials_service(data) {
  const response = await api.get("/raw_materials", data);
  return response.data;
}

export async function create_raw_materials_service(data) {
  const response = await api.post("/raw_materials", data);
  return response;
}

export async function update_raw_material_service(id, data) {
  const response = await api.put(`/raw_materials/${id}`, data);
  return response;
}

export async function delete_raw_materials_service(id) {
  const response = await api.delete(`/raw_materials/${id}`);
  return response.data;
}

export async function search_raw_materials(searchQuery) {
  const response = await api.post(`/search`, {
    keyword: searchQuery,
  });
  return response.data;
}
