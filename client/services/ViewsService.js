import axios from "axios";
const API_URL = "http://localhost:3001/views";

export const vwProjectConsumedMaterials = async (user_id) => {
  try {
    const response = await axios.get(API_URL + "/project-consumed-materials", {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erro para contar quantidade de material consumido por projeto",
      error
    );
    return [];
  }
};

export const vwProjectDepartmentDelays = async () => {
  try {
    const response = await axios.get(API_URL + "/project-department-delays");
    return response.data ? response.data : [];
  } catch (error) {
    console.error(
      "Erro ao contar quantidades de dias atrasados por setor",
      error
    );
    return [];
  }
};

export const vwComponentRecipeMaterials = async () => {
  try {
    const response = await axios.get(API_URL + "/component-recipe-materials");
    return response.data && Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(
      "Erro no Service ao contar quantidade de materiais na reeceita do componente",
      error
    );
    return [];
  }
};
