import axios from "axios";
const API_URL = "http://localhost:3001/views";

export async function VwEquipmentDetailsByUser(user_id) {
  try {
    if (!user_id) {
      return [];
    }

    const response = await axios.get(`${API_URL}/VwEquipamentDetailByUser`, {
      params: { user_id },
    });

    return Array.isArray(response.data) ? response.data : null;
  } catch (error) {
    console.error("Error fetching:", error);
    return [];
  }
}
