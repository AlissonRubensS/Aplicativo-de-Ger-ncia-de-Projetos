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

export const VwComponentMaterialConsumption = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(200).json([]);
    }
    const response = await pool.query(
      `SELECT * FROM vw_component_material_consumption WHERE user_id = ${user_id}`
    );
    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao listar", error);
    res.status(500).json({ message });
  }
};

export const VwTotalMaterialCostByEquipment = async (req, res) => {
  try {
    const { equipment_id } = req.query;
    if (!equipment_id) {
      return res.status(200).json([]);
    }
    const response = await pool.query(
      `SELECT * FROM vw_total_material_cost_by_equipment WHERE equipment_id = ${user_id}`
    );
    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao listar", error);
    res.status(500).json({ message });
  }
};

export const VwTotalMaterialCostByProject = async (req, res) => {
  try {
    const { project_id } = req.query;
    if (!project_id) {
      return res.status(200).json([]);
    }
    const response = await pool.query(
      `SELECT * FROM vw_total_material_cost_by_project WHERE project_id = ${project_id}`
    );
    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao listar", error);
    res.status(500).json({ message });
  }
};
