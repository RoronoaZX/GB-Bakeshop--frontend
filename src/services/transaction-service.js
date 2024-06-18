import axios from "axios";

export async function get_all_transaction_service(data) {
  const response = await axios.get(
    "http://localhost/api/get_all_transaction_service"
  );
  return response.data;
}

export async function create_transaction_service(data) {
  const response = await axios.post(
    "https://localhost:8000/api/create_transaction_service"
  );
  return response.data;
}

export async function update_transaction_service(data) {
  const response = await axios.post(
    "https://localhost:8000/api/update_transaction_service"
  );
  return response.data;
}

export async function delete_transaction_service(data) {
  const response = await axios.post(
    "https://localhost:8000/api/delete_transaction_service"
  );
  return response.data;
}
