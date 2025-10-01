import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import SelectMenu from "./SelectMenu";
import axios from "axios";

export default function EditEmployeeModal(props) {
  const { visible, setVisible, user_id } = props;
  const [employee_name, setEmployeeName] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [pay, setPay] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/departments");
        const deptNames = response.data.map((dept) => dept.department_name);
        setDepartments(deptNames);
      } catch (error) {
        console.error("Erro ao listar departamentos:", error);
      }
    };

    const search_employee = async (user_id) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/${user_id}`,
          {
            params: { user_id },
          }
        );
        const user = response.data;
        setEmployeeName(user.user_name);
        setJobTitle(user.job_title);
        setPay(user.salary);
      } catch (error) {
        console.error("Erro ao encontrar o funcionáio:", error);
      }
    };

    fetchDepartments();
    search_employee(user_id);
  }, [user_id]);

  const handleUptadeEmployee = async (user_id) => {
    try {
      await axios.put(`http://localhost:3001/employees/${user_id}`, {
        params: {
          fk_user_id: user_id,
          user_name: employee_name,
          job_title: job_title,
          salary: pay,
          fk_department_id: 1,
        },
      });
      alert("Funcionário atualizado com sucesso!");
      setVisible(false);
    } catch (error) {
      console.log("erro ao atualizar dados", error);
    }
  };

  return (
    <>
      {visible ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto w-screen h-screen">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-fit flex flex-col space-y-8">
            <form
              className="flex flex-col space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleUptadeEmployee(user_id);
                setVisible(false);
              }}
            >
              <div className="flex flex-row items-center justify-between">
                <p className="text-lg font-semibold">Editar Funcinário</p>
                <button
                  onClick={() => {
                    setVisible(false);
                  }}
                  type="button"
                >
                  <IoMdClose className="text-gray-600 hover:text-gray-700 hover:bg-gray-300 rounded" />
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <label htmlFor="user_name" className="text-gray-700">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="user_name"
                  className="p-2 rounded"
                  placeholder="Digite o nome completo"
                  value={employee_name}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row items-center justify-between space-x-8">
                <div className="flex flex-col w-full">
                  <label name="job-title" className="text-gray-700">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    name="job-title"
                    className="p-2 rounded"
                    placeholder="Digite o cargo"
                    value={job_title}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="department" className="text-gray-700">
                    Departamento *
                  </label>
                  <SelectMenu
                    variant="full"
                    options={departments}
                    maxSelections={1}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-between space-x-8">
                <div className="flex flex-col w-full">
                  <label name="job-title" className="text-gray-700">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    name="job-title"
                    className="p-2 rounded"
                    placeholder="Digite o cargo"
                    value={job_title}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label name="job-title" className="text-gray-700">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    name="job-title"
                    className="p-2 rounded"
                    placeholder="Digite o cargo"
                    value={job_title}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <label htmlFor="salary" className="text-gray-700">
                  Salário *
                </label>
                <input
                  type="text"
                  name="salary"
                  className="p-2 rounded"
                  placeholder="Digite o nome completo"
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row justify-end items-center gap-4">
                <button
                  type="button"
                  className="p-4 bg-slate-50 hover:bg-gray-300 rounded"
                  onClick={() => setVisible(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="p-4 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Editar Funcionário
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
