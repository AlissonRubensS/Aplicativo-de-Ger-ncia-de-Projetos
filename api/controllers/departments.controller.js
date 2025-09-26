import { pool } from "../config/db.js";

// Listar todos os departamentos
export const listDepartmentsByName = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM departments ORDER BY department_name"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar departamentos:", error);
    res.status(500).json({ error: "Erro ao listar departamentos" });
  }
};

// Buscar departamento por ID
export const getDepartmentById = async (req, res) => {
  try {
    const { department_id } = req.query;
    if (!department_id) {
      return res
        .status(400)
        .json({ error: "ID do departamento é obrigatório" });
    }

    const result = await pool.query(
      "SELECT * FROM departments WHERE department_id = $1",
      [department_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Departamento não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao buscar departamento:", error);
    res.status(500).json({ error: "Erro ao buscar departamento" });
  }
};
