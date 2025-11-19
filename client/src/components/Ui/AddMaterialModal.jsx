import { IoMdClose } from "react-icons/io";
import { useState } from "react";

export default function AddMaterialModal({ isVisible, setVisible }) {
  const [materialName, setMaterialName] = useState("");
  const [materialDesc, setMaterialDesc] = useState("");
  const [materialUni, setMaterialUni] = useState("");

  const clearStates = () => {
    setMaterialName("");
    setMaterialDesc("");
    setMaterialUni("");
    setVisible(false);
  };

  const handleSave = async () => {
    try {
      console.log("Salvar material", {
        materialName,
        materialDesc,
        materialUni,
      });

      clearStates();
    } catch (err) {
      console.error("Erro ao salvar material", err);
    }
  };

  return (
    <>
      {isVisible ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-fit flex flex-col space-y-8">
            <form
              className="flex flex-col space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              {/* Título + botão X */}
              <div className="flex flex-row items-center justify-between">
                <p className="text-lg font-semibold">Adicionar Material</p>

                <button onClick={() => setVisible(false)} type="button">
                  <IoMdClose className="text-gray-600 hover:text-gray-700 hover:bg-gray-300 rounded" />
                </button>
              </div>

              {/* Nome do material */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700">Nome *</label>
                <input
                  type="text"
                  className="p-2 rounded"
                  placeholder="Digite o nome do material"
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                  required
                />
              </div>

              {/* Descrição */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700">Descrição *</label>
                <input
                  type="text"
                  className="p-2 rounded"
                  placeholder="Digite a descrição"
                  value={materialDesc}
                  onChange={(e) => setMaterialDesc(e.target.value)}
                  required
                />
              </div>

              {/* Unidade */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700">Unidade *</label>
                <input
                  type="text"
                  className="p-2 rounded"
                  placeholder="Ex: kg, L, m²..."
                  value={materialUni}
                  onChange={(e) => setMaterialUni(e.target.value)}
                  required
                />
              </div>

              {/* Botões */}
              <div className="flex flex-row justify-end items-center space-x-4">
                <button
                  className="p-4 bg-slate-50 hover:bg-gray-300 rounded"
                  onClick={() => setVisible(false)}
                  type="button"
                >
                  Cancelar
                </button>

                <button
                  className="bg-green-600 text-white p-4 rounded hover:bg-green-700"
                  type="submit"
                >
                  Salvar Material
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
