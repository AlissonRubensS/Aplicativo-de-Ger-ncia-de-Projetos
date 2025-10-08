import { pool } from "../config/db.js";

export const createBudget = async (req, res) => {
  const { user_id, budget_name, budget_local, budget_desc } = req.body;
  try {
    const client = await pool.connect();
    await client.query("BEGIN");

    const budgetResult = await client.query(
      `INSERT INTO budgets(budget_name, budget_local, budget_desc) VALUES ($1, $2, $3) RETURNING budget_id`,
      [budget_name, budget_local, budget_desc]
    );

    const budget_id = budgetResult.rows[0].budget_id;
    await client.query(
      `INSERT INTO budgets_users(fk_user_id, fk_budget_id) VALUES ($1, $2)`,
      [user_id, budget_id]
    );
    client.release();

    res
      .status(201)
      .json({ message: "Orçamento cadastrado com sucesso", budget_id });
    await client.query("COMMIT");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const listBudget = async (req, res) => {
  try {
    const { user_id } = req.query;
    const response = await pool.query(
      `SELECT b.*
       FROM BUDGETS b
       JOIN BUDGETS_USERS bu ON b.budget_id = bu.fk_budget_id
       WHERE bu.fk_user_id = $1`,
      [user_id]
    );
    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao listar orçamentos", error);
    res.status(500).json({ error: "Erro ao listar orçamentos" });
  }
};
