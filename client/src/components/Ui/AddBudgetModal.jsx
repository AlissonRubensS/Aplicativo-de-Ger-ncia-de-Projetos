import PropTypes from "prop-types";
import { useState } from "react";

function AddBudgetModal({ isOpen, setOpen }) {
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    alert(
      `Projeto: ${projectName}\nLocalização: ${projectLocation}\nDescrição: ${description}`
    );
    // Fechar o modal após o envio
    setOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded shadow-md w-1/3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-4 bg-white">
              <label htmlFor="projectName" className="text-sm font-semibold">
                Nome do Projeto
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                className="border border-gray-300 p-2 rounded"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <label
                htmlFor="projectLocation"
                className="text-sm font-semibold"
              >
                Localização do Projeto
              </label>
              <input
                type="text"
                id="projectLocation"
                name="projectLocation"
                className="border border-gray-300 p-2 rounded"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
              />
              <label htmlFor="description" className="text-sm font-semibold">
                Descrição do Projeto
              </label>
              <textarea
                id="description"
                name="description"
                className="border border-gray-300 p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Adicionar Projeto
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

AddBudgetModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddBudgetModal;
