import { MdHome } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <header className="bg-white py-2 px-3 flex flex-col items-center justify-between shadow-lg">
      <div className="flex flex-row items-center justify-between w-full px-4">
        <h1 className="text-gray-800 text-lg font-bold">
          Sistema de Controle de Produção
        </h1>
        <button
          className="flex flex-row items-center justify-center p-2 space-x-2  text-red-600 border-2 border-red-600 hover:bg-red-100 rounded"
          onClick={() => {
            navigate("/");
            sessionStorage.removeItem("loginPermission");
          }}
        >
          <ImExit size={15} />
          <p>Sair</p>
        </button>
      </div>
      <nav className="flex flex-row items-center justify-between w-screen">
        <div className="flex flex-wrap gap-4 p-2">
          <button
            onClick={() => navigate("/home")}
            className="flex flex-row items-center justify-center space-x-2 p-1 hover:bg-gray-100 rounded"
          >
            <MdHome size={18} />
            <p> Página Inicial</p>
          </button>
          <button
            onClick={() => navigate("/projects")}
            className="flex flex-row items-center justify-center space-x-2 p-1 hover:bg-gray-100 rounded"
          >
            <img src="\src\imgs\Gota.png" alt="gota" height={13} width={13} />
            <p>Projetos</p>
          </button>
          <button
            onClick={() => navigate("/production")}
            className="flex flex-row items-center justify-center space-x-2 p-1 hover:bg-gray-100 rounded"
          >
            <FaCalendar size={15} />
            <p>Produção</p>
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="flex flex-row items-center justify-center space-x-2 p-1 hover:bg-gray-100 rounded"
          >
            <FaFileLines size={15} />
            <p>Relatórios</p>
          </button>

          <button
            onClick={() => navigate("/employees")}
            className="flex flex-row items-center justify-center space-x-2 p-1 hover:bg-gray-100 rounded"
          >
            <BsFillPeopleFill size={15} />
            <p>Colaboradores</p>
          </button>
        </div>
      </nav>
    </header>
  );
}
