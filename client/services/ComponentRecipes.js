import axios from "axios";
const API_URL = "http://localhost:3001/component-recipes";

// Function to list projects for a specific user
export const getComponentRecipe = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
