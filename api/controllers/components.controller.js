// controllers/components.controller.js
import { pool } from "../config/db.js";

export const countStatusComponents = async (req, res) => {
  try {
    const { start_date, end_date, project_id} = req.query;
    if (!start_date || !end_date || !project_id) {
      res.status(500).json({ error: "Faltando Dados" });
    } else {
      const response = await pool.query(
        `SELECT 
            e.equipment_name,
            c.status,
            COUNT(*) AS numero_pecas
        FROM components c
        INNER JOIN equipments_components ec 
            ON ec.component_id = c.component_id
        INNER JOIN projects_equipments pe
            ON pe.equipment_id = ec.equipment_id
        INNER JOIN equipments e
          ON e.equipment_id = ec.equipment_id
        WHERE pe.project_id = $1
          AND c.start_date BETWEEN $2 AND $3
        GROUP BY e.equipment_name, c.status
        ORDER BY e.equipment_name, c.status;`,
        [project_id, start_date, end_date]
      );
      res.status(200).json(response.rows);
    }
  } catch (error) {
    console.error("Erro ao contar status dos componentes", error);
    res.status(500).json({ error: "Erro ao contar status dos componentes" });
  }
};
