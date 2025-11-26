import axios from "axios";
const API_URL = "http://localhost:3001/comp-recipe-mat";

export const readCompRecipeMat = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error ao listar Materiais:", error);
    return [];
  }
};

export const readCompRecipeMatByComp = async (component_recipe_id) => {
  try {
    if (!component_recipe_id) {
      console.error("Dados faltantes");
      return;
    }
    const response = await axios.get(`${API_URL}/${component_recipe_id}`);
    return  response.data;
  } catch (error) {
    console.error("Error ao listar Materiais:", error);
    return [];
  }
};

export const createCompRecipeMat = async (
  component_recipe_id,
  material_id,
  quantity_plan
) => {
  try {
    const response = await axios.post(API_URL, {
      component_recipe_id,
      material_id,
      quantity_plan,
    });

    return response.data;
  } catch (error) {
    console.error("Error criar Material:", error);
    return [];
  }
};

export const updateCompRecipeMat = async (
  component_recipe_id,
  material_id,
  quantity_plan
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${component_recipe_id}/${material_id}`,
      {
        quantity_plan,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error criar Material:", error);
    return [];
  }
};

export const deleteMaterial = async (component_recipe_id, material_id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${component_recipe_id}/${material_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error criar Material:", error);
    return [];
  }
};
