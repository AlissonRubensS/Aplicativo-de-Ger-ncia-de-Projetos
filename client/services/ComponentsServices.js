import axios from "axios";
const API_URL = "http://localhost:3001/components";

export const countStatusComponents = async (start_date, end_date) => {
  try {
    const response = await axios.get(API_URL + "/status_count", {
      params: { start_date: start_date, end_date: end_date },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao contar status dos componentes", error);
  }
};
