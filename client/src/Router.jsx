import { createBrowserRouter } from "react-router-dom";

// Importar as páginas
import Home from "./components/Pages/Home.jsx";
import Production from "./components/Pages/Production.jsx";
import Projects from "./components/Pages/Projects.jsx";
import Employees from "./components/Pages/Employees.jsx";
import Reports from "./components/Pages/Reports.jsx";
import Login from "./components/Pages/Login.jsx";

const loginPermission = sessionStorage.getItem("loginPermission");
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: loginPermission ? <Home /> : <Login />,
  },
  {
    path: "/production",
    element: loginPermission ? <Production /> : <Login />,
  },
  {
    path: "/employees",
    element: loginPermission ? <Employees /> : <Login />,
  },
  {
    path: "/reports",
    element: loginPermission ? <Reports /> : <Login />,
  },
  {
    path: "/projects",
    element: loginPermission ? <Projects /> : <Login />,
  },
]);

export { router };