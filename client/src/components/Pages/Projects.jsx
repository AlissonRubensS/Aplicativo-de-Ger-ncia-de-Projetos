import NavBar from "../Ui/NavBar";
import ProjectsList from "../Ui/ProjectsList";
import AddBudgetModal from "../Ui/AddBudgetModal";
import { selectedProjectContext } from "@content/SeletedProject.jsx";

import { listProjects } from "../../../services/ProjectService";
import { useEffect, useState, useContext } from "react";

function Projects() {
  const [projects, setProjects] = useState([]); // inicial vazio
  const [isAddBudgetModalOpen, setAddBudgetModalOpen] = useState(false);
  const { currentProject } = useContext(
    selectedProjectContext
  );

  useEffect(() => {
    async function fetchProjects() {
      const data = await listProjects(1);
      if (data) setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-screen overflow-y-auto">
        <NavBar />
        <div className="flex flex-row">
          <div className="flex flex-col p-4 h-screen">
            <ProjectsList
              projects={projects.map((project) => ({
                id: project.project_id,
                name: project.project_name,
                status: project.status,
              }))}
              setOpen={setAddBudgetModalOpen}
            />
          </div>
          <div className="flex flex-col p-4 w-full h-fit m-4 bg-white rounded shadow-sm">
            <div>
              <div>
                {currentProject ? (
                  <>
                    <p>ID: {currentProject.id}</p>
                    <p>Nome: {currentProject.name}</p>
                    <p>Status: {currentProject.status}</p>
                  </>
                ) : (
                  <p>Nenhum projeto selecionado</p>
                )}
              </div>
            </div>
          </div>
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
