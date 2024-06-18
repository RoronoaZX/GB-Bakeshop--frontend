import { api } from "src/boot/axios";

export async function get_all_warehouse_service(data) {
  try {
    const response = await api.get("/warehouses", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    throw new Error("Failed to fetch warehouses");
  }
}

export async function create_warehouse_service(data) {
  const response = await api.post("/warehouses", data);
  return response;
}

export async function update_warehouse_service(id, data) {
  const response = await api.put(`/warehouses/${id}`, data);
  return response;
}

export async function delete_warehouse_service(id) {
  const response = await api.delete(`/warehouses/${id}`);
  return response.data;
}

export async function search_warehouse_service(searchQuery) {
  const response = await api.post("/search-warehouse", {
    keyword: searchQuery,
  });
  return response.data;
}
