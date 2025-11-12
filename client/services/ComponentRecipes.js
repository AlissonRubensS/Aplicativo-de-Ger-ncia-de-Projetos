import axios from "axios";
const API_URL = "http://localhost:3001/component-recipes";

export const getComponentRecipe = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao listar as receitas dos componentes:", error);
    return [];
  }
};

export const createComponentRecipe = async (recipe_name, man_hours) => {
  try {
    const response = await axios.post(API_URL, {
      recipe_name,
      man_hours,
    });
    return response.data;
  } catch (error) {
    console.error("Error ao criar nova receita do componente" + error);
  }
};

export const deleteComponentRecipe = async (component_recipe_id) => {
  try {
    const response = await axios.delete(API_URL, {
      component_recipe_id,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error ao deletar a receita do componente de id " +
        component_recipe_id +
        " " +
        error
    );
  }
};

export const updateComponentRecipe = async (
  component_recipe_id,
  recipe_name,
  man_hours
) => {
  try {
    const response = await axios.put(API_URL, {
      params: {
        component_recipe_id,
        recipe_name,
        man_hours,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error ao atuaçizar a receita do componente de id " +
        component_recipe_id +
        " " +
        error
    );
  }
};
