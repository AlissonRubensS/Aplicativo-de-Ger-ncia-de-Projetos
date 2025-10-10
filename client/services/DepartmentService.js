import axios from "axios";
const API_URL = "http://localhost:3001/departments";

export const listDepartments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error ao listar departamentos", error);
  }
};

export const createDeparment = async (department_name) => {
  try {
    const response = await axios.post(API_URL, { department_name });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar novo departamento", error);
  }
};

export const editDepartment = async (department_id, department_name) => {
  try {
    const response = await axios.put(API_URL, {
      department_id,
      department_name,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar departamento", error);
  }
};

export const deleteDepartment = async (department_id) => {
  try {
    const response = await axios.delete(API_URL, {
      params: { department_id },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir departamento", error);
  }
};

