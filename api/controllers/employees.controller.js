import { pool } from "../config/db.js";

// Listar todos
export const getEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.user_id, u.user_name, e.job_title, e.salary, e.performance 
       FROM users u 
       JOIN employees e ON u.user_id = e.user_id`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar funcionários:", error);
    res.status(500).json({ error: "Erro ao listar funcionários" });
  }
};

// Pesquisar por um funcionário por id
export const getEmployeeById = async (req, res) => {
  try {
    const { user_id } = req.query;
    const response = await pool.query(
      `SELECT 
         u.user_id, u.email, u.user_name, u.pass, u.access_type, 
         e.salary, e.performance, e.job_title, e.fk_department_id
       FROM users u 
       JOIN employees e ON u.user_id = e.fk_user_id
       WHERE u.user_id = $1`,
      [user_id]
    );
    res.json(response.rows[0]); // retorna só um funcionário
  } catch (error) {
    console.error("Erro ao procurar um funcionário especifico", error);
    res
      .status(500)
      .json({ error: "Erro ao procurar um funcionário especifico" });
  }
};

// Criar funcionário
export const createEmployee = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      email,
      user_name,
      pass,
      access_type,
      salary,
      job_title,
      fk_department_id,
    } = req.body;

    await client.query("BEGIN");

    const userResult = await client.query(
      `INSERT INTO users (email, user_name, pass, access_type)
       VALUES ($1, $2, $3, $4) RETURNING user_id`,
      [email.trim(), user_name.trim(), pass.trim(), access_type || 3]
    );

    const userId = userResult.rows[0].user_id;

    await client.query(
      `INSERT INTO employees (fk_user_id, salary, job_title, fk_department_id)
       VALUES ($1, $2, $3, $4)`,
      [userId, salary, job_title, fk_department_id]
    );

    await client.query("COMMIT");
    res.status(201).json({ message: "Funcionário cadastrado com sucesso" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao cadastrar funcionário:", error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

export const editEmployee = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      user_id,
      email,
      user_name,
      pass,
      access_type,
      salary,
      performance,
      job_title,
      fk_department_id,
    } = req.body;

    await client.query("BEGIN");

    await client.query(
      `UPDATE users SET email = $1, user_name = $2, pass = $3, access_type = $4
       WHERE user_id = $5`,
      [email, user_name, pass, access_type, user_id]
    );

    await client.query(
      `UPDATE employees SET salary = $1, performance = $2, job_title = $3, fk_department_id = $4
       WHERE fk_user_id = $5`,
      [salary, performance, job_title, fk_department_id, user_id]
    );

    await client.query("COMMIT");

    res.json({ message: "Dados atualizados com sucesso" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao atualizar dados:", error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { user_id } = req.body;
    const response = await pool.query("DELETE FROM users WHERE user_id = $1", [
      user_id,
    ]);
    console.log("Funcionário deletado com sucesso:", user_id);
    res.json(response.rows());
  } catch (error) {
    console.log("Erro ao deletar funcionário:", error);
    res.status(500).json({ error: "Erro ao deletar funcionário" });
  }
};
