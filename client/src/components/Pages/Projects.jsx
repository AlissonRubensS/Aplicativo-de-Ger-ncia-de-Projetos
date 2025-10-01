import NavBar from "../Ui/NavBar";
import ProjectsList from "../Ui/ProjectsList";

class Project {
  constructor(id, name, status) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}

function Projects() {
 

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
  <NavBar />
  <div className="flex-1 overflow-auto p-8">
    <ProjectsList
      projects={[
        new Project(1, "ETA Morada Nova", "Completed"),
        new Project(2, "Projeto 2", "Running"),
        new Project(3, "Projeto 3", "Running"),
      ]}
    />
  </div>
</div>

  );
}

export default Projects;
