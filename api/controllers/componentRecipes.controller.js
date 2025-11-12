import { pool } from "../config/db.js";

export const getComponentRecipe = async (req, res) => {
  try {
    const response = await pool.query("select * from component_recipes");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar receita dos componentes" });
  }
};

export const createComponentRecipe = async (req, res) => {
  try {
    const { recipe_name, man_hours } = req.body;
    const response = await pool.query(
      "INSERT INTO component_recipes(recipe_name, man_hours) VALUES ($1, $2) RETURNING *",
      [recipe_name, man_hours]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao cadastrar nova receita de equipamento" + error });
  }
};

export const deleteComponentRecipe = async (req, res) => {
  try {
    const { component_recipe_id } = req.query;
    const response = await pool.query(
      "DELETE FROM component_recipes WHERE component_recipe_id = $1 RETURNING *",
      [component_recipe_id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error ao deletar receita do componente " + error });
  }
};

export const updateComponentRecipe = async (req, res) => {
  try {
    const { component_recipe_id, recipe_name, man_hours } = req.body;
    const response = await pool.query(
      `
      UPDATE component_recipes
      SET 
        recipe_name = $1,
        man_hours = $2
      WHERE component_recipe_id = $3
      RETURNING *;
      `,
      [recipe_name, man_hours, component_recipe_id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar a receita do componente" + error });
  }
};
