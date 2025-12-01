import axios from "axios";
const API_URL = "http://localhost:3001/projects";

// Function to list projects for a specific user
export const listProjects = async (user_id) => {
  if (!user_id) return [];
  try {
    const response = await axios.get(`${API_URL}/${user_id}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
