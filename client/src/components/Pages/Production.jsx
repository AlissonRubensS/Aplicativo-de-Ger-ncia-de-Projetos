import NavBar from "../Ui/NavBar";
import { FaCalendar } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { LuFolderKanban } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { useState } from "react";

import SelectMenu from "../Ui/SelectMenu";
import AddComponent from "../Ui/AddComponent";

import axios from "axios";
import { useEffect } from "react";

export default function Production() {
  const [offset, setOffset] = useState(0); // deslocamento em semanas

  const generateWeek = (weekOffset = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + weekOffset * 7); // desloca semanas
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push({
        date: day,
        formatted: day.toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "numeric",
          month: "numeric",
        }),
      });
    }
    return week;
  };

  const weekDays = generateWeek(offset);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const capitalizeFirst = (text) => {
    if (!text) return "";

    return text
      .split("-")
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join("-");
  };

  const tasks = []; // alterar para os componentes cadastrados

  // CONSULTAS NO BANCO DE DADOS
  // select departments
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState([]);
  // select projects
  const [projects, setProjects] = useState([]);
  const [selectedProj, setSelectedProj] = useState([]);
  // select employees
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState([]);

  useEffect(() => {
    // lista todos os departamentos
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/departments");
        const deptNames = response.data.map((dept) => dept.department_name);
        setDepartments(deptNames);
      } catch (error) {
        console.error("Erro ao listar departamentos:", error);
      }
    };

    // pegar o id do usuário logado
    async function getUserId() {
      const token = sessionStorage.getItem("loginPermission");
      if (!token) return null;

      try {
        const response = await axios.get("http://localhost:3001/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.user_id;
      } catch (err) {
        console.error("Erro ao buscar user_id:", err);
        return null;
      }
    }

    // lista os projetos que o usuário está cadastrado
    const fetchProjects = async (user_id) => {
      try {
        const response = await axios.get(
          "http://localhost:3001/project/:user_id",
          { params: { user_id } }
        );
        const projNames = response.data.map(
          (projects) => projects.project_name
        );
        setProjects(projNames);
      } catch (error) {
        console.error("Error ao listar projetos", error);
      }
    };

    // lista todos os funcionários
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employee");
        const empNames = response.data.map((emp) => emp.user_name);
        setEmployees(empNames);
      } catch (error) {
        console.error("Erro ao listar funcuinários", error);
      }
    };

    // roda todas as funções
    const run = async () => {
      const id_user_login = await getUserId();
      fetchProjects(id_user_login);
      fetchDepartments();
      fetchEmployees();
    };

    run();
  }, []);

  return (
    <>
      <AddComponent props={{ isOpen: isAddOpen, setOpen: setIsAddOpen }} />

      <div className="bg-slate-200 flex flex-col space-y-5 rounded-lg p-0 m-0">
        <NavBar />
        <div className="glass-effect bg-gray-50 flex flex-row items-center justify-between mx-8 p-4 shadow-md rounded-md">
          {/* Opções da Produção */}
          <div className="flex flex-row items-center space-x-2">
            <FaCalendar className="h-5 w-5" />
            <span>
              <h2 className="text-lg font-semibold">Quadro de Produção</h2>
              <h3 className="text-sm font-light text-gray-600">
                Semana {weekDays[0].formatted.split(" ")[1]} até{" "}
                {weekDays[6].formatted.split(" ")[1]}
              </h3>
            </span>
          </div>
          <div className="flex flex-row items-center space-x-4">
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex flex-row items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
            >
              <IoMdAdd />
              <p>Adicionar Componente</p>
            </button>
            <button className="flex flex-row items-center space-x-1 border p-2 rounded-lg hover:bg-gray-200">
              <MdOutlineFileDownload /> <p>PDF</p>
            </button>
            <button className="flex flex-row items-center space-x-1 border p-2 rounded-lg hover:bg-gray-200">
              <MdOutlineFileDownload /> <p>Excel</p>
            </button>
            <button
              onClick={() => setOffset(offset - 1)}
              className="flex flex-row items-center space-x-1 border p-2 rounded-lg hover:bg-gray-200"
            >
              <FaLongArrowAltLeft />
            </button>
            <button
              onClick={() => setOffset(0)}
              className="flex flex-row items-center space-x-1 border p-2 rounded-lg hover:bg-gray-200"
            >
              <TfiReload />
            </button>
            <button
              onClick={() => setOffset(offset + 1)}
              className="flex flex-row items-center space-x-1 border p-2 rounded-lg hover:bg-gray-200"
            >
              <FaLongArrowAltRight />
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="glass-effect bg-gray-50 mx-8 p-4 shadow-md rounded-md flex flex-wrap space-x-2">
          <div className="flex flex-row items-center space-x-2">
            <CiFilter className="h-5 w-5" />
            <p>Departamento:</p>
            <SelectMenu
              options={departments}
              selectedOption={selectedDept}
              setSelectedOption={setSelectedDept}
            />
          </div>

          <div className="flex flex-row items-center space-x-2">
            <LuFolderKanban className="h-5 w-5" />

            <p>Projetos:</p>
            <SelectMenu
              options={projects}
              selectedOption={selectedProj}
              setSelectedOption={setSelectedProj}
            />
          </div>

          <div className="flex flex-row items-center space-x-2">
            <FiUser className="h-5 w-5" />
            <p>Funcionário:</p>
            <SelectMenu
              options={employees}
              selectedOption={selectedEmp}
              setSelectedOption={setSelectedEmp}
            />
          </div>
        </div>

        {/* Quadro da semana */}
        <div className="glass-effect bg-gray-50 mx-8 p-4 shadow-md rounded-md overflow-x-auto ">
          <div className="flex w-full h-96 gap-2">
            {weekDays.map((day, idx) => {
              // pegar as tarefas daquele dia
              const dayTasks = tasks.filter(
                (t) =>
                  new Date(t.date).toLocaleDateString("pt-BR") ===
                  day.date.toLocaleDateString("pt-BR")
              );
              return (
                <div
                  key={idx}
                  className="flex-1 min-w-0 flex flex-col border-r last:border-r-0 h-full rounded-md overflow-hidden bg-white"
                >
                  {/* Cabeçalho do dia */}
                  <div className="bg-gray-100 text-center py-2 border-b">
                    <div className="font-bold text-md">
                      {capitalizeFirst(
                        day.date.toLocaleDateString("pt-BR", {
                          weekday: "long",
                        })
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {day.date.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* Área de tarefas */}
                  <div className="flex-1 flex flex-col justify-start items-center p-2 overflow-y-auto">
                    {dayTasks.length > 0 ? (
                      dayTasks.map((task) => (
                        <div
                          key={task.id}
                          className="w-full bg-blue-500 text-white rounded-md px-2 py-1 mb-2 text-center"
                        >
                          {task.name}
                        </div>
                      ))
                    ) : (
                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="flex-1 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-md w-full cursor-pointer hover:border-blue-400 hover:text-blue-500"
                      >
                        <span className="text-2xl mb-1">+</span>
                        <span className="text-gray-400">Adicionar</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
