import { api } from "src/boot/axios";

export async function get_branches_by_id(id) {
  const response = await api.get(`/branches/${id}`);
  return response.data.result;
}

export async function search_branch_id_service(searchQuery) {
  const response = await api.post(`/search-branches-by-id`, {
    keyword: searchQuery,
  });

  return response.data;
}

export async function get_all_branches_products(branchId) {
  const response = await api.get(`/branches/${branchId}/products`);
  return response.data;
}

export async function create_branch_product(data) {
  const response = await api.post("/branch-products", data);
  return response;
}

export async function update_branch_product_price(id, newPrice) {
  const response = await api.post(`update-branch-product/{id}`, {
    price: newPrice,
  });
  return response;
}

export async function delete_branch_product(id) {
  const response = await api.delete(`/branch-products/${id}`);
  return response.data;
}
