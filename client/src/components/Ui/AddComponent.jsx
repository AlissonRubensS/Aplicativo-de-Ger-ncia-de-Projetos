import { IoMdClose } from "react-icons/io";
import SelectMenu from "./SelectMenu";
import { useState } from "react";

function AddComponent({ isOpen, setOpen, departmens, projects, employees }) {
  const [selectDept, setSelectedDept] = useState([]);
  const [selectedProj, setSelectedProj] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-1/2 flex flex-col space-y-8">
            <div className="flex flex-row items-center justify-between">
              <p className="text-lg font-semibold">Novo Componente</p>
              <button
                onClick={() => {
                  setOpen(false);
                }}
                type="button"
              >
                <IoMdClose className="text-gray-600 hover:text-gray-700 hover:bg-gray-300 rounded" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="project_name" className="text-gray-700">
                Nome do Componente *
              </label>
              <input
                type="text"
                name="project_name"
                className="p-2 rounded"
                placeholder="Peça Exemplo"
              />
            </div>
            <div className="flex flex-row items-center justify-between space-x-8">
              <div className="flex flex-col w-full">
                <label name="qtd" className="text-gray-700">
                  Quantidade *
                </label>
                <input
                  type="number"
                  name="qtd"
                  className="p-2 rounded"
                  placeholder="Ex: 10"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="weekDays" className="text-gray-700">
                  Dias das Semanas *
                </label>
                <SelectMenu
                  variant={"full"}
                  options={[
                    "Domingo",
                    "Segunda",
                    "Terça",
                    "Quarta",
                    "Quinta",
                    "Sexta",
                    "Sábado",
                  ]}
                  selectedOption={selectedDay}
                  setSelectedOption={setSelectedDay}
                  maxSelections={1}
                />
              </div>
            </div>
            {/* Horas */}
            <div className="flex flex-row items-center justify-between space-x-8">
              <div className="flex flex-col w-full">
                <label name="hourInit" className="text-gray-700">
                  Hora Inicial *
                </label>
                <input
                  type="time"
                  name="hourInit"
                  className="p-2 rounded bg-gray-50"
                />
              </div>
              <div className="flex flex-col w-full">
                <label name="hourEnd" className="text-gray-700">
                  Hora Final *
                </label>
                <input
                  type="time"
                  name="hourEnd"
                  className="p-2 rounded bg-gray-50"
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-between space-x-8">
              <div className="flex flex-col w-full">
                <label htmlFor="departament" className="text-gray-700">
                  Departamento *
                </label>
                <SelectMenu
                  name="departament"
                  variant="full"
                  options={departmens.map((dep) => {
                    return {
                      id: dep.department_id,
                      label: dep.department_name,
                    };
                  })}
                  selectedOption={selectDept}
                  setSelectedOption={setSelectedDept}
                  maxSelections={1}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="project" className="text-gray-700">
                  Projeto *
                </label>
                <SelectMenu
                  name="project"
                  variant="full"
                  options={projects}
                  selectedOption={selectedProj}
                  setSelectedOption={setSelectedProj}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="employees" className="text-gray-700">
                Responsáveis *
              </label>
              <SelectMenu
                name="employees"
                variant="full"
                options={employees}
                selectedOption={selectedEmp}
                setSelectedOption={setSelectedEmp}
              />
            </div>
            <div className="flex flex-row justify-end items-center space-x-4">
              <button
                className="p-4 items-center justify-center bg-slate-50 hover:bg-gray-300 rounded"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="items-center bg-green-600 text-white p-4 rounded hover:bg-green-700"
                type="submit"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Criar Componente
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AddComponent;
