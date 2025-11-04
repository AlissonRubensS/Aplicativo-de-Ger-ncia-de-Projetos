import { createBrowserRouter } from "react-router-dom";

// Importar as páginas
import Home from "@pages/Home.jsx";
import Production from "@pages/Production.jsx";
import Projects from "@pages/Projects.jsx";
import Employees from "@pages/Employees.jsx";
import Reports from "@pages/Reports.jsx";
import Login from "@pages/Login.jsx";
import Budgets from "@pages/Budgets.jsx";
import Recipes from "@pages/Recipes.jsx";

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
  {
    path: "/budgets",
    element: token ? <Budgets /> : <Login />,
  },
  {
    path: "/recipes",
    element: token ? <Recipes /> : <Login />,
  },
]);

export { router };
