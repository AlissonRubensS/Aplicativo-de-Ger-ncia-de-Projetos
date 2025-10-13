import axios from "axios";
const API_URL = "http://localhost:3001/employees";

export const listEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error("Erro ao listar funcionários", err);
    throw err;
  }
};

export const createEmployee = async (
  email,
  user_name,
  pass,
  access_type,
  salary,
  job_title,
  fk_department_id
) => {
  try {
    const response = await axios.post(API_URL, {
      email,
      user_name,
      pass,
      access_type,
      salary,
      job_title,
      fk_department_id,
    });
    return response.data;
  } catch (err) {
    console.error("Erro ao cadastrar novo funcionário", err);
    throw err;
  }
};

export const editEmployee = async (
  user_id,
  email,
  user_name,
  pass,
  access_type,
  salary,
  performance,
  job_title,
  fk_department_id
) => {
  try {
    const response = await axios.put(API_URL, {
      user_id,
      email,
      user_name,
      pass,
      access_type,
      salary,
      performance,
      job_title,
      fk_department_id,
    });
    console.log("Operação realizada!");
    return response.data;
  } catch (error) {
    console.error("Erro ao editar funcionário", error);
    throw error;
  }
};
