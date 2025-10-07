import axios from "axios";
const API_URL = "http://localhost:3001/budgets/";

export async function createBudget(
  user_id,
  budget_name,
  budget_local,
  budget_desc,
) {
  try {
    const response = await axios.post(API_URL, {
      user_id,
      budget_name,
      budget_local,
      budget_desc,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar orçamento:", error);
    throw error;
  }
}
