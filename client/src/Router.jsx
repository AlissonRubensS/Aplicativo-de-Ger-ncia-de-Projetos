import { createBrowserRouter } from "react-router-dom";

// Importar as páginas
import Home from "./components/Pages/Home.jsx";
import Production from "./components/Pages/Production.jsx";
import Projects from "./components/Pages/Projects.jsx";
import Employees from "./components/Pages/Employees.jsx";
import Reports from "./components/Pages/Reports.jsx";
import Login from "./components/Pages/Login.jsx";

const token = sessionStorage.getItem("loginPermission");
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: token ? <Home /> : <Login />,
  },
  {
    path: "/production",
    element: token ? <Production /> : <Login />,
  },
  {
    path: "/employees",
    element: token ? <Employees /> : <Login />,
  },
  {
    path: "/reports",
    element: token ? <Reports /> : <Login />,
  },
  {
    path: "/projects",
    element: token ? <Projects /> : <Login />,
  },
]);

export { router };