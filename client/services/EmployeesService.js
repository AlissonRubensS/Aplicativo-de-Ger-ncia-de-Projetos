import axios from "axios";
const API_URL = "http://localhost:3001/employees";

export const listEmployees = async (user_id) => {
  try {
    const response = await axios.get(API_URL, { params: { user_id } });
    return response.data
  } catch (err) {
    console.error("Erro ao listar funcionários", err);
  }
};
