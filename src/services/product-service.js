import { api } from "src/boot/axios";

export async function get_all_products_service(data) {
  const response = await api.get("/products", data);
  return response.data;
}

export async function create_product_service(data) {
  const response = await api.post("/products", data);
  return response;
}
export async function update_product_service(id, data) {
  const response = await api.put(`/products/${id}`, data);
  return response;
}
export async function delete_product_service(id) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}
export async function search_product(searchQuery) {
  const response = await api.post(`/search-products`, {
    keyword: searchQuery,
  });
  return response.data;
}
