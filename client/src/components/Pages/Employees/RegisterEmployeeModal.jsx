import SelectMenu from "../../Ui/SelectMenu";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { listDepartments } from "@services/DepartmentService";
import { createEmployee } from "@services/EmployeesService";

export default function RegisterEmployeeModal({
  visible,
  setVisible,
  onEmployeeChanged,
}) {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [employee_name, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [pay, setPay] = useState("");

  const fetchDepartments = async () => {
    const data = await listDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const clearStates = () => {
    setVisible(false);
    setSelectedDepartment([]);
    setEmployeeName("");
    setEmail("");
    setPassword("");
    setJobTitle("");
    setPay("");
    onEmployeeChanged();
  };

  const handleRegister = async () => {
    try {
      await createEmployee(
        email,
        employee_name,
        password,
        3,
        pay,
        job_title,
        1
      );
      window.location.reload();
    } catch (err) {
      console.error("Erro ao cadastrar funcionario", err);
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
                handleRegister();
                clearStates();
              }}
            >
              <div className="flex flex-row items-center justify-between">
                <p className="text-lg font-semibold">Cadastrar Funcionário</p>
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
                  <label name="email" className="text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="p-2 rounded"
                    placeholder="Digite o email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="pass" className="text-gray-700">
                    Senha *
                  </label>
                  <input
                    type="password"
                    name="pass"
                    className="p-2 rounded"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                  <label htmlFor="department" className="text-gray-700">
                    Departamento *
                  </label>
                  <SelectMenu
                    variant="full"
                    options={departments.map((dep) => {
                      return {
                        id: dep.department_id,
                        label: dep.department_name,
                      };
                    })}
                    maxSelections={1}
                    selectedOption={selectedDepartment}
                    setSelectedOption={setSelectedDepartment}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="salary" className="text-gray-700">
                  Salário *
                </label>
                <input
                  type="text"
                  name="salary"
                  className="p-2 rounded"
                  placeholder="Digite o salário"
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row justify-end items-center space-x-4">
                <button
                  className="p-4 items-center justify-center bg-slate-50 hover:bg-gray-300 rounded"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="items-center bg-green-600 text-white p-4 rounded hover:bg-green-700"
                  type="subimit"
                >
                  Cadastrar Funcionário
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
