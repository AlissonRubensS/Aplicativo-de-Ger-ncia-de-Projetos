import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import { useState } from "react";
import { createDeparment } from "@services/DepartmentService";
function DepartmentModalRegister({ visible, setVisible }) {
  const [departmentName, setDepartmentName] = useState("");

  return (
    <>
      {visible ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto w-screen h-screen">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-fit flex flex-col space-y-8">
            <form
              className="flex flex-col space-y-8"
              onSubmit={async () => {
                await createDeparment(departmentName);
              }}
            >
              <div className="flex flex-row items-center justify-between">
                <p className="text-lg font-semibold">Novo Departamento</p>
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
                <label htmlFor="department_name" className="text-gray-700">
                  Nome do Departamento
                </label>
                <input
                  type="text"
                  name="department_name"
                  className="p-2 rounded"
                  placeholder="Digite o nome do novo departamento"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
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
                  Cadastrar Departamento
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

DepartmentModalRegister.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default DepartmentModalRegister;
