import axios from "axios";
const API_URL = "http://localhost:3001/equip-recipe";

export const createEquipmentRecipe = async (recipe_name) => {
  try {
    if (!recipe_name) {
      console.error("Dados insuficientes!");
      return;
    }

    const response = await axios.post(API_URL, { recipe_name });
    return response.data;
  } catch (error) {
    console.error("Erro na requisição", error);
  }
};

export const readEquipmentRecipe = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição", error);
  }
};

export const updateEquipmentRecipe = async (
  equipment_recipe_id,
  recipe_name
) => {
  try {
    if (!equipment_recipe_id || !recipe_name) {
      console.error("Dados faltante");
      return;
    }

    const response = await axios.put(`${API_URL}/${equipment_recipe_id}`, {
      recipe_name,
    });
    return response.data;
  } catch (error) {
    console.error("Erro na requisição", error);
  }
};

export const deleteEquipmentRecipe = async (equipment_recipe_id) => {
  try {
    if (!equipment_recipe_id) {
      console.error("Dados faltante");
      return;
    }

    const response = await axios.delete(`${API_URL}/${equipment_recipe_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição", error);
  }
};
