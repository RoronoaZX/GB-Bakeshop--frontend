import axios from "axios";

export async function get_all_products_bread_service(data) {
  const response = await axios.get(
    "https://localhost:8000/api/get_all_products"
  );
  return response.data;
}

export async function create_products_bread_service(data) {
  const response = await axios.post(
    "http://localhost:8000/api/create_products_service"
  );
  return response.data;
}

export async function update_products_bread_service(data) {
  const response = await axios.post(
    "https://localhost:8000/api/update_products_bread_service"
  );
  return response.data;
}

export async function delete_products_bread_service(data) {
  const response = await axios.post(
    "http://localhost:8000/api/delete_products_bread_service"
  );
  return response.data;
}
