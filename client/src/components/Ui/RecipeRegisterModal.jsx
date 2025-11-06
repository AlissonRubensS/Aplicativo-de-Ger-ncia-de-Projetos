import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import SelectMenu from "./SelectMenu.jsx";

// Services
import { listMaterials } from "../../../services/MaterialService.js";

function RecipeRegisterModal({ setVisible }) {
  const [type, setType] = useState("equipment");
  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setRecipeDesc] = useState("");
  const [recipelist, setRecipeList] = useState([]);
  const [selectMatriz, setSelectMatriz] = useState([[]]);  // [ [id], [id], [id]... ] 

  let label = type === "equipment" ? "Componentes" : "Materiais";

  useEffect(() => setRecipeList([]), [type]);

  // Função para fechar e limpar variáveis
  const exit = () => {
    setType("equipment");
    setRecipeName("");
    setRecipeDesc("");
    setRecipeList([]);
    setSelectMatriz([[]]);
    setVisible(false);
  };

  // Handler para overlay: fecha modal ao clicar
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      exit();
    }
  };

  // Requisições ao Banco de Dados
  // Materiais
  const [materials, setMaterials] = useState([]);

  const flechtMaterials = async () => {
    const data = await listMaterials();
    setMaterials(data);
  };

  useEffect(() => {
    flechtMaterials();
  }, []);

  // useEffect(() => alert(JSON.stringify(selectMatriz)), [selectMatriz]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen"
        onClick={handleOverlayClick}
      >
        <div
          className="bg-gray-200 p-6 rounded-lg shadow-lg w-fit flex flex-col h-4/5 min-w-[32rem] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-lg font-semibold mb-4">Registrar Nova Receita</h1>
          <form className="flex flex-col space-y-8 flex-1 min-h-0 pb-24">
            <div className="flex flex-col space-y-2">
              <h2 className="font-semibold">Escolha qual o tipo da receita</h2>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2 p-2 rounded border border-gray-300 hover:border-blue-500 transition">
                  <input
                    type="radio"
                    name="recipe_type"
                    id="recipe_equipment"
                    value="equipment"
                    checked={type === "equipment"}
                    onChange={(e) => setType(e.target.value)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <label htmlFor="recipe_equipment">
                    Receita de Equipamento
                  </label>
                </div>
                <div className="flex items-center gap-2 p-2 rounded border border-gray-300 hover:border-blue-500 transition">
                  <input
                    type="radio"
                    name="recipe_type"
                    id="recipe_component"
                    value="component"
                    checked={type === "component"}
                    onChange={(e) => setType(e.target.value)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <label htmlFor="recipe_component">
                    Receita de Componente
                  </label>
                </div>
              </div>
              <label htmlFor="recipe_name" className="text-gray-700">
                Nome da Receita <span className="text-blue-500">*</span>
              </label>
              <input
                type="text"
                name="recipe_name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="p-2 rounded border"
              />
              <label htmlFor="recipe_dec" className="text-gray-700">
                Descrição da Receita
              </label>
              <input
                type="text"
                name="recipe_desc"
                value={recipeDesc}
                onChange={(e) => setRecipeDesc(e.target.value)}
                className="p-2 rounded border"
              />
            </div>
            <div className="flex flex-col space-y-2 flex-1 min-h-0">
              <h2 className="font-semibold">{label}</h2>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-1 rounded w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  setRecipeList((prev) => [...prev, { value: "", uni: "Uni" }]);
                  setSelectMatriz((prev) => prev.length > 1 ? [...prev, []] : [ [ ] ]);
                }}
              >
                Adicionar {label}
              </button>
              <div className="overflow-y-auto w-full rounded border mt-2 min-h-[12rem] max-h-52 h-52">
                <table className="w-full">
                  <thead className="bg-blue-500 text-white rounded">
                    <tr>
                      <th className="w-1/3">{label}</th>
                      <th className="w-1/3">Quantidade</th>
                      <th className="w-1/3">Unidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipelist.length > 0 ? (
                      recipelist.map((row, i) => (
                        <tr
                          key={i}
                          className="border-t border-gray-300 align-middle"
                        >
                          <td className="align-middle text-center py-2 w-1/3">
                            <SelectMenu
                              maxSelections={1}
                              options={
                                type === "equipment"
                                  ? [{ id: 1, label: "teste" }]
                                  : Array.isArray(materials)
                                  ? materials.map((m) => ({
                                      id: m.material_id,
                                      label: m.material_name,
                                    }))
                                  : []
                              }
                              selectedOption={selectMatriz[i] || []}
                              setSelectedOption={(updater) => {
                                setSelectMatriz((prev) => {
                                  const next = [...prev];
                                  const current = prev[i] || [];
                                  const updated =
                                    typeof updater === "function"
                                      ? updater(current)
                                      : updater;
                                  next[i] = Array.isArray(updated)
                                    ? updated
                                    : [updated];
                                  return next;
                                });
                              }}
                            />
                          </td>
                          <td className="align-middle text-center py-2 w-1/3">
                            <input
                              type="number"
                              value={row.value}
                              onChange={(e) => {
                                const val = e.target.value;
                                setRecipeList((prev) =>
                                  prev.map((r, j) =>
                                    j === i ? { ...r, value: val } : r
                                  )
                                );
                              }}
                              className="p-1 rounded w-12 text-center [&::-webkit-inner-spin-button]:appearance-none "
                            />
                          </td>
                          <td className="align-middle py-2 w-1/3">
                            <div className="flex items-center justify-center gap-2">
                              <p>{row.uni}</p>
                              <button
                                type="button"
                                className="text-red-600 hover:bg-red-100 rounded"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setRecipeList((prev) =>
                                    prev.filter((_, index) => index !== i)
                                  );
                                  setSelectMatriz((prev) =>
                                    prev.filter((_, index) => index !== i)
                                  );
                                }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center py-4">
                          Nenhuma {label} adicionada
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
          <div className="mt-16 bg-gray-200 pt-2 flex justify-end gap-2 z-10">
            <button
              type="button"
              className="bg-white-gray rounded px-2 py-1 border"
              onClick={exit}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                exit();
              }}
              className="bg-green-400 hover:bg-green-500 text-white rounded px-4 py-1"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeRegisterModal;
