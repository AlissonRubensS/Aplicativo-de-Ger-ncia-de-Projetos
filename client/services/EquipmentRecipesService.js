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
