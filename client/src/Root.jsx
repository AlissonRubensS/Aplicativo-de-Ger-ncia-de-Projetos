import { StrictMode, useState } from "react";
import { selectedProjectContext } from "./components/Content/SeletedProject.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.jsx";

function Root() {
  const [currentProject, setCurrentProject] = useState(null);
  return (
    <StrictMode>
      <selectedProjectContext.Provider
        value={{ currentProject, setCurrentProject }}
      >
        <RouterProvider router={router} />
      </selectedProjectContext.Provider>
    </StrictMode>
  );
}

export default Root;
