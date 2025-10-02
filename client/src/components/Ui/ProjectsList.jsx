import PropTypes from "prop-types";
import { FaFilter } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { selectedProjectContext } from "../Content/SeletedProject.jsx";

function ProjectsList({ projects }) {
  const [filter, setFilter] = useState("Running");
  const [isExtend, setIsExtend] = useState(false);

  const { currentProject, setCurrentProject } = useContext(selectedProjectContext);

  const projects_names = projects
    .filter((project) => {
      if (isExtend) return project.status === filter;
      return true; // sem filtro → mostra todos
    })
    .map((project, i) =>
      currentProject && currentProject.id === project.id ? (
        <p className="text-blue-500" key={i}>
          {project.name}
        </p>
      ) : (
        <button
          className="text-gray-400 hover:text-blue-400"
          key={i}
          onClick={() => setCurrentProject(project)}
        >
          {project.name}
        </button>
      )
    );

  const setStyleAllButton = () =>
    currentProject === null
      ? "text-blue-500"
      : "text-gray-400 hover:text-blue-400";

  // Função para ver o valor da variavel.
  useEffect(() => {
    console.log("Projeto atual:", currentProject);
  }, [currentProject]);

  return (
    <>
      <div className="flex flex-col bg-white shadow-sm rounded w-40 h-4/5 items-center space-y-2 p-1">
        <button
          className="flex bg-gray-100 hover:bg-gray-200 w-fit py-1 px-8 rounded-sm items-center self-center"
          onClick={() => setIsExtend(!isExtend)}
        >
          <FaFilter size={13} />
          <p className="font-semibold text-gray-800">Filtro</p>
        </button>
        {isExtend && (
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="executando"
              className="flex items-center gap-1 cursor-pointer p-1 rounded-xl border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <input
                type="radio"
                id="executando"
                name="status"
                className="accent-blue-600"
                onClick={() => setFilter("Running")}
              />
              <span className="text-gray-700 font-medium text-sm">
                Executando
              </span>
            </label>

            <label
              htmlFor="concluido"
              className="flex items-center gap-1 cursor-pointer p-1 rounded-xl border border-gray-300 hover:border-green-500 hover:bg-green-50 transition"
            >
              <input
                type="radio"
                id="concluido"
                name="status"
                className="accent-green-600"
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
};

export default ProjectsList;
