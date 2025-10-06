import NavBar from "../Ui/NavBar";
import ProjectsList from "../Ui/ProjectsList";
import { listProjects } from "../../../services/ProjectService";
import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]); // inicial vazio

  useEffect(() => {
    async function fetchProjects() {
      const data = await listProjects(1);
      if (data) setProjects(data);
    }
    fetchProjects();
    console.log(projects);
  }, [projects]);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <NavBar />
      <div className="flex-1 overflow-auto p-8">
        <ProjectsList
          projects={projects.map((project) => ({
            id: project.project_id,
            name: project.project_name,
            status: project.status,
          }))}
        />
      </div>
    </div>
  );
}

export default Projects;
