import axios from "axios";
const API_URL = "http://localhost:3001/equip-recipe-comp-recipe";

export const readEquipRecipeCompRecipe = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error ao listar:", error);
    throw error;
  }
};

export const createEquipRecipeCompRecipe = async (
  equipment_recipe_id,
  component_recipe_id,
  quantity_plan
) => {
  try {
    const response = await axios.post(API_URL, {
      equipment_recipe_id,
      component_recipe_id,
      quantity_plan,
    });

    return response.data;
  } catch (error) {
    console.error("Error criar linha:", error);
    throw error;
  }
};

export const updateMaterial = async (
  equipment_recipe_id,
  component_recipe_id,
  quantity_plan
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${equipment_recipe_id}/:${component_recipe_id}`,
      {
        quantity_plan,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error criar Material:", error);
    throw error;
  }
};

export const deleteMaterial = async (
  equipment_recipe_id,
  component_recipe_id
) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${equipment_recipe_id}/:${component_recipe_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error criar Material:", error);
    throw error;
  }
};
