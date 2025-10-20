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
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching:", error);
    return [];
  }
}

export async function VwComponentMaterialConsumption(user_id) {
  try {
    if (!user_id) {
      return [];
    }
    const response = await axios.get(
      `${API_URL}/VwComponentMaterialConsumption`,
      { params: { user_id } }
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching", error);
    return [];
  }
}

export async function VwTotalMaterialCostByEquipment(equipment_id) {
  try {
    if (!equipment_id) {
      return [];
    }
    const response = await axios.get(
      `${API_URL}/VwTotalMaterialCostByEquipment`,
      { params: { equipment_id } }
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching", error);
    return [];
  }
}

export async function VwTotalMaterialCostByProject(project_id) {
  try {
    if (!project_id) {
      return [];
    }
    const response = await axios.get(
      `${API_URL}/VwTotalMaterialCostByProject`,
      { params: { project_id } }
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching", error);
    return [];
  }
}

export async function VwProjectComponentStatus(project_id) {
  try {
    if (!project_id) {
      return [];
    }
    const response = await axios.get(
      `${API_URL}/VwProjectComponentStatus`, {
      params: { project_id },
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching", error);
    return [];
  }
}
