import { pool } from "../config/db.js";

export const vwProjectMaterialsSummary = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.res(500).json("O Usuário está vazio");
    }
    const response = await pool.query(
      `SELECT vw.*
        FROM vw_projects_materials_summary vw
        JOIN projects_users pu ON pu.project_id  = vw.project_id
        WHERE pu.user_id = ${user_id};`
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar sumário" });
  }
};

export const vwEquipmentMaterialsSummary = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.res(500).json("O Usuário está vazio");
    }
    const response = await pool.query(
        `SELECT vw.* 
         FROM vw_equipment_materials_summary vw
         JOIN projects_equipments pe ON vw.equipment_id = pe.equipment_id
         JOIN projects p ON p.project_id = pe.project_id
         JOIN projects_users pu ON pu.project_id = p.project_id
         WHERE pu.user_id = ${user_id};` 
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar sumário" });
  }
};

export const vwComponentMaterialsSummary = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.res(500).json("O Usuário está vazio");
    }
    const response = await pool.query(
      `SELECT vw.*
       FROM vw_component_materials_summary vw
       JOIN components c ON c.component_id = vw.component_id
       JOIN equipments_components ec ON ec.component_id = c.component_id
       JOIN equipments e ON e.equipment_id = ec.equipment_id
       JOIN projects_equipments pe ON e.equipment_id = pe.equipment_id
       JOIN projects p ON p.project_id = pe.project_id
       JOIN projects_users pu ON pu.project_id = p.project_id
       WHERE pu.user_id = ${user_id};`
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar sumário" });
  }
};
