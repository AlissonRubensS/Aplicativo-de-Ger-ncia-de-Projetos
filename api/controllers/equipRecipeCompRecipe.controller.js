import { pool } from "../config/db.js";

export const createEquipRecipeCompRecipe = async (req, res) => {
  try {
    const { equipment_recipe_id, component_recipe_id, quantity_plan } =
      req.body;
    const response = await pool.query(
      `INSERT INTO 
            equipment_recipes_component_recipes(equipment_recipe_id, component_recipe_id, quantity_plan)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [equipment_recipe_id, component_recipe_id, quantity_plan]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error ao criar receita do equipamento" + error });
  }
};

export const readEquipRecipeCompRecipe = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM equipment_recipes_component_recipes"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao listar receitas dos equipamento" + error });
  }
};

export const updateEquipRecipeCompRecipe = async (req, res) => {
  try {
    const { equipment_recipe_id, component_recipe_id, quantity_plan } =
      req.body;
    const response = await pool.query(
      `UPDATE equipment_recipes_component_recipes
        SET 
	        quantity_plan = $3
        WHERE equipment_recipe_id = $1 AND component_recipe_id = $2
        RETURNING *`,
      [equipment_recipe_id, component_recipe_id, quantity_plan]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error ao atualizar receita do equipamento" + error });
  }
};

export const deleteEquipRecipeCompRecipe = async (req, res) => {
  try {
    const { equipment_recipe_id, component_recipe_id } = req.query;
    const response = await pool.query(
      `
        DELETE FROM equipment_recipes_component_recipes 
        WHERE equipment_recipe_id = $1
        AND component_recipe_id = $2
        RETURNING *`,
      [equipment_recipe_id, component_recipe_id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error ao atualizar receita do equipamento" + error });
  }
};
