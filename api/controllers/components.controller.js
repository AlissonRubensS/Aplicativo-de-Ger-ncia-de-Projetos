// controllers/components.controller.js
import { pool } from "../config/db.js";

export const countStatusComponents = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    if (!start_date || !end_date) {
      res.status(500).json({ error: "Erro ao contar status dos componentes" });
    } else {
      const response = await pool.query(
        `SELECT status, COUNT(*) AS numero_pecas
        FROM components
        WHERE start_date BETWEEN $1 AND $2
        GROUP BY status`,
        [start_date, end_date]
      );
      res.status(200).json(response.rows);
    }
  } catch (error) {
    console.error("Erro ao contar status dos componentes", error);
    res.status(500).json({ error: "Erro ao contar status dos componentes" });
  }
};
