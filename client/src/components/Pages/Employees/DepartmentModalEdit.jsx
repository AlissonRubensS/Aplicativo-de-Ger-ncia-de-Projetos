import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import { useState } from "react";
import { editDepartment } from "@services/DepartmentService";

function DepartmentModalEdit({ visible, setVisible, department, id }) {
  const [departmentName, setDepartmentName] = useState(
    department?.department_name || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editDepartment(id, departmentName);
      setVisible(false);
      window.location.reload();

    } catch (error) {
      console.error("Erro ao editar departamento:", error);
      alert("Erro ao editar departamento.");
    }
  };

  return (
    <>
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto w-screen h-screen">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-fit flex flex-col space-y-8">
            <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>
              <div className="flex flex-row items-center justify-between">
                <p className="text-lg font-semibold">Editar Departamento</p>
                <button onClick={() => setVisible(false)} type="button">
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
                  placeholder="Digite o novo nome do departamento"
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
                  Editar Departamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

DepartmentModalEdit.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  department: PropTypes.string.isRequired, // precisa receber o departamento a ser editado
  id: PropTypes.number.isRequired,
};

export default DepartmentModalEdit;
