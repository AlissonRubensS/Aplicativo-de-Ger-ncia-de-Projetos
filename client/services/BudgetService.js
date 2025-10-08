import axios from "axios";
import Budget from "@models/Budget";
const API_URL = "http://localhost:3001/budgets";

export async function createBudget(
  user_id,
  budget_name,
  budget_local,
  budget_desc
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

export async function listBudgets(user_id) {
  try {
    const response = await axios.get(API_URL, { params: { user_id } });
    return Array.isArray(response.data)
      ? response.data.map(
          (budget) =>
            new Budget(
              budget.budget_id,
              budget.budget_name,
              budget.budget_local,
              budget.budget_desc
            )
        )
      : null;
  } catch (error) {
    console.error("Error ao listar orçamentos", error);
    throw error;
  }
}
