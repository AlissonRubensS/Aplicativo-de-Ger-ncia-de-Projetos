import { useContext } from "react";
import SidebarList from "../../Ui/SlideBarList.jsx";
import { selectedProjectContext } from "../../Content/SeletedProject.jsx";

function ProjectsList({ projects, setOpen }) {
  const { currentProject, setCurrentProject } = useContext(
    selectedProjectContext
  );

  return (
    <SidebarList
      items={projects}
      selectedItem={currentProject}
      onSelectItem={setCurrentProject}
      onAdd={() => setOpen(true)}
      addLabel="+ Novo Projeto"
      titleAll="Todos os Projetos"
      filterOptions={[
        { value: "Running", label: "Executando" },
        { value: "Completed", label: "Concluído" },
      ]}
    />
  );
}

export default ProjectsList;
