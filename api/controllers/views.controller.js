import { pool } from "../config/db.js";

export const VwEquipmentDetailsByUser = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(200).json([]);
    }

    const response = await pool.query(
      `SELECT * FROM vw_equipment_details_by_user WHERE user_id = ${user_id}`
    );
    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao listar", error);
    res.status(500).json({ message: "Erro ao listar", error: error });
  }
};
