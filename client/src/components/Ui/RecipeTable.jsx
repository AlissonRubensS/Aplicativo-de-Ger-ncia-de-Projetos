import { useEffect } from "react";
import SelectMenu from "./SelectMenu.jsx";
import { FaRegTrashAlt } from "react-icons/fa";

function StyledTable({
  recipeType = "equipment", // "equipment" | "component"
  materials = [],
  recipelist,
  setRecipeList,
  selectMatriz,
  setSelectMatriz,
  labelOverride,
}) {
  // Fallbacks internos caso o componente seja usado sem controle externo
  const isControlled =
    Array.isArray(recipelist) &&
    typeof setRecipeList === "function" &&
    Array.isArray(selectMatriz) &&
    typeof setSelectMatriz === "function";

  const localRows = isControlled ? recipelist : [];
  const localSetRows = isControlled ? setRecipeList : () => {};
  const localSelect = isControlled ? selectMatriz : [];
  const localSetSelect = isControlled ? setSelectMatriz : () => {};

  const label = labelOverride
    ? labelOverride
    : recipeType === "equipment"
    ? "Componentes"
    : "Materiais";

  const handleAdd = () => {
    localSetRows((prev) => [
      ...prev,
      // FIX: A unidade padrão para "equipment" deve ser 'uni'
      { label: "", qtd: 0, value: 0.0, uni: recipeType === "equipment" ? "uni" : "kg" },
    ]);
    localSetSelect((prev) => [...prev, []]);
  };

  useEffect(() => console.log(JSON.stringify(materials)), [materials]);

  return (
    <div className="flex flex-col space-y-2 w-full text-sm">
      <div className="w-full rounded-2xl mt-2 mb-4 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white text-center">
              <th className="px-4 py-2 rounded-tl-2xl font-semibold text-sm">
                {label}
              </th>
              <th className="px-4 py-2 font-semibold text-sm">Quantidade</th>
              <th className="px-4 py-2 font-semibold text-sm">Valor</th>
              <th className="px-4 py-2 text-center rounded-tr-2xl font-semibold text-sm">
                Unidade
              </th>
            </tr>
          </thead>
          <tbody>
            {localRows.length > 0 ? (
              localRows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-4 py-3 align-middle">
                    {(() => {
                      const optList =
                        recipeType === "equipment"
                          ? Array.isArray(materials)
                            ? materials.map((c) => ({
                                id: c.component_id, 
                                label: c.componente,
                              }))
                            : []
                          : Array.isArray(materials)
                          ? materials.map((m) => ({
                              id: m.material_id,
                              label: m.material_name,
                            }))
                          : [];
                      return (
                        <SelectMenu
                          variant="full"
                          maxSelections={1}
                          options={optList}
                          selectedOption={localSelect[i] || []}
                          setSelectedOption={(updater) => {
                            // Atualiza seleção visual
                            localSetSelect((prev) => {
                              const next = [...prev];
                              const current = prev[i] || [];
                              const updated =
                                typeof updater === "function"
                                  ? updater(current)
                                  : updater;
                              const finalSel = Array.isArray(updated)
                                ? updated
                                : [updated];
                              next[i] = finalSel;
                              return next;
                            });
                            // Atualiza label no objeto da linha
                            const selectedId =
                              typeof updater === "function"
                                ? Array.isArray(updater(localSelect[i] || []))
                                  ? updater(localSelect[i] || [])[0]
                                  : updater(localSelect[i] || [])
                                : Array.isArray(updater)
                                ? updater[0]
                                : updater;
                            const selectedLabel =
                              optList.find((o) => o.id === selectedId)?.label ||
                              "";

                            // Busca o material completo do banco para pegar value e uni
                            const selectedMaterial =
                              recipeType === "equipment"
                                ? Array.isArray(materials) 
                                  ? materials.find(
                                      (m) => m.component_id === selectedId
                                    )
                                  : null
                                : Array.isArray(materials)
                                ? materials.find(
                                    (m) => m.material_id === selectedId
                                  )
                                : null;

                            // Extrai value e uni do material ou usa valores padrão
                            const materialValue =
                              recipeType === "equipment"
                                ? selectedMaterial?.total_value || 0.0
                                : selectedMaterial?.value || 0.0;
                            
                            const materialUnit =
                              recipeType === "equipment"
                                ? "uni" 
                                : selectedMaterial?.uni || "Kg";

                            // Calcula valor total (preço * quantidade atual)
                            const currentQtd = Number(localRows[i]?.qtd || 0);
                            const totalValue = materialValue * currentQtd;

                            localSetRows((prev) =>
                              prev.map((r, j) =>
                                j === i
                                  ? {
                                      ...r,
                                      label: selectedLabel,
                                      value: totalValue,
                                      uni: materialUnit,
                                    }
                                  : r
                              )
                            );
                          }}
                        />
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3 align-middle text-center">
                    <input
                      type="number"
                      value={row.qtd}
                      onChange={(e) => {
                        const val = e.target.value;
                        const qtdNum = Number(val) || 0;

                        // Busca o preço unitário do material selecionado
                        const selectedId = localSelect[i]?.[0];
                        
                        // FIX: LÓGICA COPIADA DO 'setSelectedOption' PARA FUNCIONAR AQUI TMB
                        const selectedMaterial =
                          recipeType === "equipment"
                            ? Array.isArray(materials)
                              ? materials.find(
                                  (m) => m.component_id === selectedId
                                )
                              : null
                            : Array.isArray(materials)
                            ? materials.find(
                                (m) => m.material_id === selectedId
                              )
                            : null;

                        // FIX: LÓGICA COPIADA DO 'setSelectedOption'
                        const materialValue =
                          recipeType === "equipment"
                            ? selectedMaterial?.total_value || 0.0
                            : selectedMaterial?.value || 0.0;

                        // Calcula novo valor total
                        const newValue = materialValue * qtdNum;

                        localSetRows((prev) =>
                          prev.map((r, j) =>
                            j === i ? { ...r, qtd: val, value: newValue } : r
                          )
                        );
                      }}
                      placeholder="Digite a quantidade"
                      className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-md px-3 py-1 text-center outline-none text-sm mx-auto"
                    />
                  </td>
                  <td className="px-4 py-3 align-middle text-center">
                    <span className="text-gray-800">
                      R$ {Number(row.value || 0).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="w-full flex items-center justify-between">
                      <span className="text-gray-800 text-sm">{row.uni}</span>
                      <button
                        type="button"
                        className="text-red-500 hover:bg-red-50 p-2 rounded-md transition"
                        onClick={() => {
                          localSetRows((prev) =>
                            prev.filter((_, index) => index !== i)
                          );
                          localSetSelect((prev) =>
                            prev.filter((_, index) => index !== i)
                          );
                        }}
                        aria-label="Remover linha"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Nenhuma {label} adicionada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="self-start bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition text-sm"
        onClick={handleAdd}
      >
        Adicionar {label}
      </button>
    </div>
  );
}

export default StyledTable;