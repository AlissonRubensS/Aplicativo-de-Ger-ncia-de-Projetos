import { pool } from "../config/db.js";

export const createProject = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      user_id,
      project_name,
      project_desc,
      project_local,
      begin_date,
      end_date,
      deadline,
    } = req.body;

    await client.query("BEGIN");

    const projRes = await client.query(
      `INSERT INTO projects(project_name, project_desc, project_local, begin_date, end_date, deadline)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING project_id`,
      [
        project_name.trim(),
        project_desc.trim(),
        project_local.trim(),
        begin_date,
        end_date,
        deadline,
      ]
    );

    const project_id = projRes.rows[0].project_id;

    await client.query(
      "INSERT INTO PROJECTS_USERS(fk_user_id, fk_project_id) VALUES($1, $2)",
      [user_id, project_id]
    );

    await client.query("COMMIT");
    client.release();

    res
      .status(201)
      .json({ message: "Projeto cadastrado com sucesso", project_id });
  } catch (error) {
    await client.query("ROLLBACK");
    client.release();
    console.error("Erro ao cadastrar projeto", error);
    res.status(500).json({ error: "Erro ao cadastrar projeto" });
  }
};

export const listProject = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(200).json([]); // retorna array vazio se não tiver user_id
    }

    const response = await pool.query(
      `SELECT p.*
       FROM PROJECTS p
       JOIN PROJECTS_USERS pu ON p.project_id = pu.fk_project_id
       WHERE pu.fk_user_id = $1`,
      [user_id]
    );

    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao listar projetos", error);
    res.status(500).json({ error: "Erro ao listar projetos" });
  }
};

export const editProject = async (req, res) => {
  try {
    const {
      project_id,
      project_name,
      project_desc,
      project_local,
      begin_date,
      end_date,
      deadline,
    } = req.body;
    const response = await pool.query(
      `UPDATE PROJECTS 
       SET project_name = $1, project_desc = $2, project_local = $3, begin_date = $4, end_date = $5, deadline = $6
       WHERE project_id = $7
       RETURNING *`,
      [
        project_name,
        project_desc,
        project_local,
        begin_date,
        end_date,
        deadline,
        project_id,
      ]
    );
    res.json(response.rows[0]);
  } catch (error) {
    console.error("Erro ao editar projeto", error);
    res.status(500).json({ error: "Erro ao editar projeto" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { project_id } = req.body;
    const response = await pool.query(
      "DELETE FROM PROJECTS WHERE project_id = $1 RETURNING *",
      [project_id]
    );
    res.json(response.rows[0]);
  } catch (error) {
    console.error("Erro ao deletar projeto", error);
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
};
