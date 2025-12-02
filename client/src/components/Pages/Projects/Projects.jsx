import NavBar from "../../Ui/NavBar";
import SidebarList from "../../Ui/SlideBarList";
import AddBudgetModal from "../Budgets/AddBudgetModal";

import { selectedProjectContext } from "@content/SeletedProject.jsx";
import { listProjects } from "@services/ProjectService";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

function Projects() {
  const [projects, setProjects] = useState([]); // inicial vazio
  const [isAddBudgetModalOpen, setAddBudgetModalOpen] = useState(false);
  const { currentProject, setCurrentProject } = useContext(
    selectedProjectContext
  );
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
      <div className="flex flex-col w-screen h-screen overflow-y-auto overflow-x-hidden gap-6">
        <div>
          <NavBar select_index={1} />

          <div className="flex flex-row p-2 px-8 bg-white justify-between">
            <h1 className="text-base font-medium">Projetos</h1>
            <button
              className="px-4 py-1 rounded bg-gray-100 hover:bg-gray-200"
              onClick={() => navigate("/budgets")}
            >
              Ir para Orçamento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-10 grid-rows-10 min-h-screen p-8 gap-4">
          {/* Barra Lateral */}
          <div className="row-span-10">
            <SidebarList
              items={projects.map((project) => ({
                id: project.project_id,
                name: project.project_name,
                status: project.status,
              }))}
              selectedItem={currentProject}
              onSelectItem={setCurrentProject}
              onAdd={() => setAddBudgetModalOpen(true)}
              addLabel="+ Novo Projeto"
              titleAll="Todos os Projetos"
              filterOptions={[
                { value: "Running", label: "Executando" },
                { value: "Completed", label: "Concluído" },
              ]}
            />
          </div>

          {/* Conteúdo Principal */}
          <header className="col-span-9 row-span-2 card">
            <div className="text-center text-lg font-semibold">
              <item>item 1</item>
              <item>item 2</item>
              <item>item 3</item>
            </div>
          </header>

          <main className="col-span-9 row-span-7 card"></main>

          <div className="col-span-9 row-span-1 flex justify-center">
            <div className="w-1/4 h-16 card flex items-center justify-around gap-4">
              <button className="flex items-center gap-2 bnt">
                <img
                  src="src/imgs/archive.png"
                  alt="arquivo"
                  className="h-5 w-5"
                />
                Arquivar Projeto
              </button>

              <button className="flex items-center gap-2 bnt-add">
                <img
                  src="src/imgs/tick-double.png"
                  alt="Dois conferes"
                  className="h-5 w-5"
                />
                Concluir Projeto
              </button>
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
