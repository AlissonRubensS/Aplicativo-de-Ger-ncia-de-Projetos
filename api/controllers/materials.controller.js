import { pool } from "../config/db.js";

export const listMaterials = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM materials");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar materiais" });
  }
};
