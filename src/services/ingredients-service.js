import { api } from "src/boot/axios";

export async function get_ingredients_service(data) {
  const response = await api.get("/ingredients", data);
  return response.data;
}
