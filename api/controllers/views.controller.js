import { response } from "express";
import { pool } from "../config/db.js";

export const vwProjectConsumedMaterials = async (req, res) => {
  try {
    const user_id = req.query.user_id;

    if (!user_id) {
      res.status(500).json("O usuário está vazio!");
    }

    const response = await pool.query(
      "SELECT * FROM vw_project_consumed_materials WHERE user_id = $1",
      [user_id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Erro ao contar status dos componentes", error);
    res.status(500).json({ error: "Erro ao contar status dos componentes" });
  }
};

export const vwProjectDepartmentDelays = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT department_name, component_name, days_late FROM vw_project_department_delays"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Erro ao listar atrassos dos departamentos", error);
    res
      .status(500)
      .json({ error: "Erro ao listar atrassos dos departamentos " + error });
  }
};

export const vwComponentRecipeMaterials = async (req, res) => {
  try {
    const response = await pool.query(
      "select * from component_recipe_material"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Erro ao contar materiais da receita do componente", error);
    res.status(500).json({
      error: "Erro ao contar materiais da receita do componente" + error,
    });
  }
};

export const vwEquipmentRecipesMaterialSummary = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM view_equipment_recipes_material_summary"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(
      "Erro ao listar o sumario de materiais do equipamento",
      error
    );
    res.status(500).json({
      error: "Erro ao listar o sumario de materiais do equipamento" + error,
    });
  }
};

export const vwMaterialDetailsComponentsRecipes = async (req, res) => {
  try {
    const { component_recipe_id } = req.params;

    if (!component_recipe_id) {
      return res.status(400).json({ error: "Faltando dados" });
    }

    const response = await pool.query(
      "SELECT * FROM Vw_Material_Details_Components_Recipes WHERE component_recipe_id = $1",
      [component_recipe_id]
    );

    return res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const vwMaterialDetailsEquipmentsRecipes = async (req, res) => {
  try {
    const { equipment_recipe_id } = req.params;

    if (!equipment_recipe_id) {
      return res.status(400).json({ error: "Faltando dados" });
    }

    const response = await pool.query(
      "SELECT * FROM Vw_Material_Details_Equipment_Recipes WHERE equipment_recipe_id = $1",
      [equipment_recipe_id]
    );

    return res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
