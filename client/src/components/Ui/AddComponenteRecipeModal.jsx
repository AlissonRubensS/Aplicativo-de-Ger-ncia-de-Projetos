import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

import SelectMenu from "./SelectMenu";

import { listMaterials } from "@services/MaterialService.js";

export default function AddComponenteRecipeModal({ isVisible, setVisible }) {
  const [componenteRecipeName, setComponentRecipeName] = useState("");
  const [manHours, setManHours] = useState("");
  const [materials, setMaterials] = useState([]);
  const [materialsList, setMaterialsList] = useState([]);
  const [materialQuantity, setMaterialsQuantity] = useState([]);

  useEffect(() => {
    const fletchMaterials = async () => {
      const data = await listMaterials();
      if (!Array.isArray(data) || data.length <= 0) {
        console.error("erro no array materiasl");
        return null;
      }
      setMaterials(data);
    };

    fletchMaterials();
  }, []);

  useEffect(() => {
    let aux = [];
    materialsList.forEach((id) => {
      aux.push({ id: id, quantity: 0 });
    });
    setMaterialsQuantity(aux);
  }, [materialsList]);

  useEffect(() => console.log(materialQuantity), [materialQuantity]);

  const clearStates = () => {
    setComponentRecipeName("");
    setManHours("");
    setMaterialsList([]);
    setVisible(false);
  };

  const handleSave = async () => {
    try {
      if (
        materialsList.length === 0 ||
        componenteRecipeName === "" ||
        manHours === ""
      ) {
        alert("Preencha todos os dados");
      }

      console.log("Salvar material", {
        componenteRecipeName,
        manHours,
        materialsList,
      });

      clearStates();
    } catch (err) {
      console.error("Erro ao salvar material", err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen min-h-screen overflow-auto">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-[70vw] max-w-[120vw] h-[70vh] max-h-[90vh] flex flex-col space-y-8 overflow-auto">
        <form
          className="flex flex-col  space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {/* Título + botão X */}
          <div className="flex flex-row items-center justify-between space-x-2">
            <p className="text-lg font-semibold">
              Adicionar Receita do Componente
            </p>

            <button onClick={() => setVisible(false)} type="button">
              <IoMdClose className="text-gray-600 hover:text-gray-700 hover:bg-gray-300 rounded" />
            </button>
          </div>

          <div className="flex flex-row w-full justify-between gap-6">
            {/* Nome do componente */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-gray-700">Nome *</label>
              <input
                type="text"
                className="p-2 rounded"
                placeholder="Digite o nome do material"
                value={componenteRecipeName}
                onChange={(e) => setComponentRecipeName(e.target.value)}
                required
              />
            </div>

            {/* Horas Homem */}
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-gray-700">Horas Homem *</label>
              <input
                type="number"
                className="p-2 rounded"
                placeholder="Digite o Tempo que o componente deve ser feito em Horas Homem"
                value={manHours}
                onChange={(e) => setManHours(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-gray-700">Materiais *</label>
            <SelectMenu
              options={materials.map((m) => ({
                id: m.material_id,
                label: m.material_name,
              }))}
              selectedOption={materialsList}
              setSelectedOption={setMaterialsList}
            />
          </div>

          {/* Lista de Materiais a serem usadas no componente */}
          <div className="flex flex-col justify-center intems-center bg-white p-2 rounded w-full">
            <table className="space-y-2 w-full">
              <thead>
                <tr className="grid grid-cols-6 gap-6">
                  <th className="font-normal ">Material</th>
                  <th className="font-normal ">Descrição</th>
                  <th className="font-normal ">Valor Unitário</th>
                  <th className="font-normal ">Quantidade</th>
                  <th className="font-normal ">Valor Total</th>
                  <th className="font-normal">Ação</th>
                </tr>
              </thead>

              <tbody className="text-sm font-serif text-center">
                {materialsList.map((id) => (
                  <tr key={id} className="grid grid-cols-6 gap-6">
                    {/* Material */}
                    <td>
                      {Array.isArray(materialsList) && materialsList.length > 0
                        ? (() => {
                            const found = materials.find(
                              (m) => m.material_id === id
                            );
                            return found ? found.material_name ?? "-" : "-";
                          })()
                        : "-"}
                    </td>

                    {/* Descrição: mostra label do material selecionado */}
                    <td>
                      {Array.isArray(materialsList) && materialsList.length > 0
                        ? (() => {
                            const found = materials.find(
                              (m) => m.material_id === id
                            );
                            return found ? found.material_desc ?? "-" : "-";
                          })()
                        : "-"}
                    </td>

                    {/* Valor unitário */}
                    <td>
                      {Array.isArray(materialsList) && materialsList.length > 0
                        ? (() => {
                            const found = materials.find(
                              (m) => m.material_id === id
                            );
                            return found
                              ? Number(found.value).toFixed(2)
                              : "0.00";
                          })()
                        : "0.00"}
                    </td>

                    {/* Quantidade */}
                    <td>
                      <input
                        type="number"
                        className="border p-1 w-20"
                        value={
                          materialQuantity.find((m) => m.id === id)?.quantity ||
                          ""
                        }
                        onChange={(e) => {
                          const newValue = Number(e.target.value);
                          setMaterialsQuantity((prev) =>
                            prev.map((m) =>
                              m.id === id ? { ...m, quantity: newValue } : m
                            )
                          );
                        }}
                      />
                    </td>

                    {/* Valor total */}
                    <td>
                      {(() => {
                        const qty = Number(id.Quantidade || 0);
                        const unit = (() => {
                          if (
                            Array.isArray(materialsList) &&
                            materialsList.length > 0
                          ) {
                            const found = materials.find(
                              (m) => m.material_id === id
                            );
                            return found ? Number(found.value) : 0;
                          }
                          return 0;
                        })();
                        return (qty * unit).toFixed(2);
                      })()}
                    </td>
                    <td>
                      <button
                        className="bnt font-normal font-sans"
                        type="button"
                        onClick={() => {
                          setMaterialsList(
                            materialsList.filter((i) => i != id)
                          );
                        }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botões */}
          <div className="flex flex-row justify-end items-center space-x-4">
            <button
              className="p-2 bg-slate-50 hover:bg-gray-300 rounded"
              onClick={() => clearStates()}
              type="button"
            >
              Cancelar
            </button>
            <button className="bnt-add" type="submit">
              Salvar Receita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
