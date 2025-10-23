import { pool } from "../config/db.js";

export const getEquipment = async (req, res) => {
  try {
    const { project_id } = req.query;
    const response = await pool.query(
      `SELECT e.*
      FROM equipments e
      INNER JOIN projects_equipments pe
      ON pe.equipment_id = e.equipment_id
      WHERE pe.project_id = ${project_id};`
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
