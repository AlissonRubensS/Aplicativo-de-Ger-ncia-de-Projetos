import NavBar from "../../Ui/NavBar";
import ProjectsList from "./ProjectsList";
import AddBudgetModal from "../Budgets/AddBudgetModal";

import { selectedProjectContext } from "@content/SeletedProject.jsx";
import { listProjects } from "@services/ProjectService";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

function Projects() {
  const [projects, setProjects] = useState([]); // inicial vazio
  const [isAddBudgetModalOpen, setAddBudgetModalOpen] = useState(false);
  const { currentProject } = useContext(selectedProjectContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProjects() {
      const data = await listProjects(1);
      if (data) setProjects(data);
    }
    fetchProjects();
  }, []);
  
  return (
    <>
      <div className="flex flex-col w-screen overflow-y-auto">
        <NavBar select_index={1} />

        <div className="flex flex-row justify-between items-center bg-white px-4 py-2 ml-4 mt-4 mr-4 rounded shadow">
          <h1>Projetos</h1>
          <button
            className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => navigate("/budgets")}
          >
            Ir para Orçamento
          </button>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col p-4 h-screen space-y-4">
            <ProjectsList
              projects={projects.map((project) => ({
                id: project.project_id,
                name: project.project_name,
                status: project.status,
              }))}
              setOpen={setAddBudgetModalOpen}
            />

            <div className="bg-white rounded-sm shadow p-1  ">
              <button>Concluir Projeto</button>
            </div>
          </div>
          <div className="flex flex-col w-full h-full m-4 pb-4 space-y-8">
            <div className="bg-white rounded shadow-sm p-4">
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

            <div className="bg-white rounded shadow-sm p-4 h-full">
              <h1>aqui vai ter a tabela</h1>
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
