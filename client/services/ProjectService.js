import axios from "axios";
import { Project } from "../models/Project";
const API_URL = "http://localhost:3001/projects";

// Function to list projects for a specific user
export const listProjects = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { user_id },
    });
    // Mapear os dados recebidos para instâncias da classe Project
    return Array.isArray(response.data)
      ? response.data.map(
          (proj) =>
            new Project(
              proj.project_id,
              proj.project_name,
              proj.project_desc,
              proj.project_local,
              proj.begin_date,
              proj.end_date,
              proj.deadline,
              proj.status
            )
        )
      : null;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};
