import { api } from "src/boot/axios";

export async function get_bread_service(data) {
  const response = await api.get("/bread-products", data);
  return response.data;
}
