import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Importar as páginas
import Home from "./components/Pages/Home.jsx";
import Production from "./components/Pages/Production.jsx";
import Projects from "./components/Pages/Projects.jsx";
import Employees from "./components/Pages/Employees.jsx";
import Reports from "./components/Pages/Reports.jsx";
import App from "./App.jsx";

const loginPermission = sessionStorage.getItem("loginPermission");
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: loginPermission ? <Home /> : <App />,
  },
  {
    path: "/production",
    element: loginPermission ? <Production /> : <App />,
  },
  {
    path: "/employees",
    element: loginPermission ? <Employees /> : <App />,
  },
  {
    path: "/reports",
    element: loginPermission ? <Reports /> : <App />,
  },
  {
    path: "/projects",
    element: loginPermission ? <Projects /> : <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
