// controllers/components.controller.js
import { pool } from "../config/db.js";

export const createComponent = async (req, res) => {
  try {
    const { component_name, begin_date, end_date, deadline, component_state } = req.body;

    const response = await pool.query(
      `INSERT INTO COMPONENTS(component_name, begin_date, end_date, deadline, component_state) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [component_name, begin_date, end_date, deadline, component_state]
    );

    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao cadastrar componente", error);
    res.status(500).json({ error: "Erro ao cadastrar um componente" });
  }
};

export const listComponents = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM COMPONENTS");
    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao listar componentes", error);
    res.status(500).json({ error: "Erro ao listar componentes" });
  }
};

export const componentById = async (req, res) => {
  try {
    const component_id = req.params.id;
    const response = await pool.query(
      "SELECT * FROM COMPONENTS WHERE component_id = $1",
      [component_id]
    );
    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao buscar componente", error);
    res.status(500).json({ error: "Erro ao buscar componente" });
  }
};

export const editComponent = async (req, res) => {
  try {
    const { component_id, component_name, begin_date, end_date, deadline, component_state } = req.body;

    const response = await pool.query(
      `UPDATE COMPONENTS 
       SET component_name = $1, begin_date = $2, end_date = $3, deadline = $4, component_state = $5
       WHERE component_id = $6
       RETURNING *;`,
      [component_name, begin_date, end_date, deadline, component_state, component_id]
    );

    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao editar componente", error);
    res.status(500).json({ error: "Erro ao editar componente" });
  }
};

export const deleteComponent = async (req, res) => {
  try {
    const { component_id } = req.body;
    const response = await pool.query(
      "DELETE FROM COMPONENTS WHERE component_id = $1 RETURNING *;",
      [component_id]
    );
    res.json(response.rows);
  } catch (error) {
    console.error("Erro ao deletar componente", error);
    res.status(500).json({ error: "Erro ao deletar componente" });
  }
};