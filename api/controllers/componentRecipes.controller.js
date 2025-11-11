import { pool } from "../config/db.js";

export const getComponentRecipe = async (req, res) => {
  try {
    const response = await pool.query("select * from component_recipes");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar receita dos componentes" });
  }
};
