import PropTypes from "prop-types";
import { FaFilter } from "react-icons/fa";
import { useState, useContext } from "react";
import { selectedProjectContext } from "../Content/SeletedProject.jsx";

function ProjectsList({ projects, setOpen }) {
  const [filter, setFilter] = useState("Running");
  const [isExtend, setIsExtend] = useState(false);

  const { currentProject, setCurrentProject } = useContext(
    selectedProjectContext
  );

  const projects_names = projects
    .filter((project) => {
      if (isExtend) return project.status === filter;
      return true;
    })
    .map((project, i) =>
      currentProject && currentProject.id === project.id ? (
        <p className="text-blue-500 text-sm" key={i}>
          {project.name}
        </p>
      ) : (
        <button
          className="text-sm text-gray-400 hover:text-blue-400"
          key={i}
          onClick={() => setCurrentProject(project)}
        >
          {project.name}
        </button>
      )
    );

  const setStyleAllButton = () =>
    currentProject === null
      ? "text-blue-500 text-sm"
      : "text-gray-400 hover:text-blue-400 text-sm";

  return (
    <>
      <div className="flex flex-col bg-white shadow-sm rounded w-40 h-4/5 items-center space-y-2 p-1">
        {/* Botão de Adicionar Orçamento */}
        <button
          className="bg-green-300 hover:bg-green-400 py-px px-1 rounded-sm font-semibold"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm">+ Novo Orçamento</p>
        </button>

        {/* Filtro de Projetos */}
        <button
          className="flex bg-gray-100 hover:bg-gray-200 w-fit py-px px-10 space-x-2 rounded-sm items-center self-center"
          onClick={() => setIsExtend(!isExtend)}
        >
          <FaFilter size={10} />
          <p className="font-semibold text-gray-800 text-sm">Filtro</p>
        </button>
        {isExtend && (
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="executando"
              className="flex items-center gap-1 cursor-pointer p-1 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
            >
              <input
                type="radio"
                id="executando"
                name="status"
                onClick={() => setFilter("Running")}
              />
              <span className="text-gray-700 font-medium text-sm">
                Executando
              </span>
            </label>

            <label
              htmlFor="concluido"
              className="flex items-center gap-1 cursor-pointer p-1 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
            >
              <input
                type="radio"
                id="concluido"
                name="status"
                onClick={() => setFilter("Completed")}
              />
              <span className="text-gray-700 font-medium text-sm">
                Concluído
              </span>
            </label>
          </div>
        )}
        <button
          className={setStyleAllButton()}
          onClick={() => setCurrentProject(null)}
        >
          Todos os Projetos
        </button>
        {projects_names}
      </div>
    </>
  );
}

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.string,
    })
  ).isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ProjectsList;
