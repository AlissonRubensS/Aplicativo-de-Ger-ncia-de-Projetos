import NavBar from "../Ui/NavBar";
import ProjectsList from "../Ui/ProjectsList";
import AddBudgetModal from "../Ui/AddBudgetModal";

import { listProjects } from "../../../services/ProjectService";
import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]); // inicial vazio
  const [isAddBudgetModalOpen, setAddBudgetModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      const data = await listProjects(1);
      if (data) setProjects(data);
    }
    fetchProjects();
    console.log(projects);
  }, [projects]);

  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-y-auto">
        <NavBar />
        <div className="flex-1 p-8">
          <ProjectsList
            projects={projects.map((project) => ({
              id: project.project_id,
              name: project.project_name,
              status: project.status,
            }))}
            setOpen={setAddBudgetModalOpen}
          />
        </div>
      </div>

      {/* Modal de Adicionar Orçamento */}
      {isAddBudgetModalOpen && (
        <AddBudgetModal
          isOpen={isAddBudgetModalOpen}
          setOpen={setAddBudgetModalOpen}
        />
      )}
    </>
  );
}

export default Projects;
