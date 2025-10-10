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

// Buscar departamento por Nome
export const getDepartmentByName = async (req, res) => {
  try {
    const { department_name } = req.query;
    if (!department_name) {
      return res
        .status(400)
        .json({ error: "ID do departamento é obrigatório" });
    }

    const result = await pool.query(
      "SELECT * FROM departments WHERE department_name = $1",
      [department_name]
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

// Cadastrar novo departamento
export const createDeparment = async (req, res) => {
  try {
    const { department_name } = req.body;
    if (!department_name) {
      return res.status(400).json({ error: "Erro ao criar departamento" });
    }
    const result = await pool.query(
      "INSERT INTO DEPARTMENTS(department_name) VALUES ($1)",
      [department_name]
    );
    return result.data;
  } catch (error) {
    console.error("Erro ao criar departamento:", error);
    res.status(500).json({ error: "Erro ao criar departamento" });
  }
};

export const editDepartment = async (req, res) => {
  try {
    const { department_id, department_name } = req.body;
    if (!department_name || !department_id) {
      return res.status(400).json({ error: "Erro ao editar departamento" });
    }
    const result = await pool.query(
      " UPDATE DEPARTMENTS SET department_name = $1 WHERE department_id = $2;",
      [department_name, department_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Departamento não encontrado." });
    }
    console.log("Operação realizada")
    return res
      .status(200)
      .json({ message: "Departamento atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao editar departamento:", error);
    res.status(500).json({ error: "Erro ao editar departamento" });
  }
};
