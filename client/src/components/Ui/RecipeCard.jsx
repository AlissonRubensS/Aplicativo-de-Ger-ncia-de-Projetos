import { useEffect, useRef, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import RecipeTable from "./RecipeTable.jsx";
import { listMaterials } from "@services/MaterialService.js";
import { vwComponentRecipeMaterials } from "@services/ViewsService.js";

function RecipeCard({ name = "", type = "equipment", values = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Editable states
  const [recipeName, setRecipeName] = useState(name);
  const [hourMans, setHourMans] = useState();
  const [recipeType, setRecipeType] = useState(type || "equipment");
  const [recipelist, setRecipeList] = useState(
    values.map((v) => ({
      label: v.label,
      qtd: v.qtd,
      value: v.value,
      uni: v.uni,
    }))
  );

  const [selectMatriz, setSelectMatriz] = useState(
    values.map((v) => [v.label])
  );

  const label = recipeType === "equipment" ? "Componentes" : "Materiais";

  const [materials, setMaterials] = useState([]);
  const [componentRecipes, setComponentRecipes] = useState([]);

  useEffect(() => {
    listMaterials()
      .then(setMaterials)
      .catch(() => setMaterials([]));
    vwComponentRecipeMaterials()
      .then(setComponentRecipes)
      .catch(() => setComponentRecipes([]));
  }, []);

  // Auto scroll to bottom when rows change or on expand
  const tableWrapperRef = useRef(null);
  useEffect(() => {
    const el = tableWrapperRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [recipelist.length, isExpanded]);

  const clearStates = () => {
    setRecipeList([]);
    setSelectMatriz([[]]);
    setRecipeName("");
  };

  // Calcular totais dinâmicos
  // Calcular totais dinâmicos
  const getTotals = () => {
    if (recipeType === "equipment") {
      // Equipamento → somar materiais dos componentes
      const totals = {
        Resina: 0,
        Manta: 0,
        Roving: 0,
        Catalizador: 0,
        Tecido: 0,
        "Horas-Homem": 0,
        "Valor Total": 0,
      };

      // Loop pelos itens da tabela
      recipelist.forEach((item) => {
        // Encontra os dados completos do componente no state
        const compData = componentRecipes.find(
          (c) => c.componente === item.label
        );

        if (compData) {
          const qtd = Number(item.qtd) || 0;

          // Soma os materiais com base na quantidade
          totals.Resina += (Number(compData.resina) || 0) * qtd;
          totals.Manta += (Number(compData.manta) || 0) * qtd;
          totals.Roving += (Number(compData.roving) || 0) * qtd;
          totals.Catalizador += (Number(compData.catalizador) || 0) * qtd;
          totals.Tecido += (Number(compData.tecido) || 0) * qtd;

          // Soma as horas-homem com base na quantidade
          totals["Horas-Homem"] += (Number(compData.horas_homem) || 0) * qtd;
        }
      });

      // O "Valor Total" é a soma dos valores já calculados pela tabela
      // É mais seguro do que recalcular aqui.
      totals["Valor Total"] = recipelist.reduce(
        (sum, item) => sum + Number(item.value || 0),
        0
      );

      return totals;
    } else {
      // Componente → soma simples
      const totalValue = recipelist.reduce(
        (sum, item) => sum + Number(item.value || 0),
        0
      );

      // Adicionei Horas-Homem aqui, pois você tem um input para isso
      return {
        "Valor Total": totalValue,
        "Horas-Homem": Number(hourMans) || 0,
      };
    }
  };

  return (
    <div className="m-auto bg-white rounded shadow-md w-4/5 border border-gray-200 p-4 space-y-4 text-sm">
      {isExpanded ? (
        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-center gap-4 text-sm">
            <label
              htmlFor="nameInput"
              className="flex flex-col justify-center text-center gap-2 w-full"
            >
              Nome da Receita
              <input
                className="border rounded p-2 flex-1"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="Digite o nome da receita"
                id="nameInput"
              />
            </label>
            {recipeType !== "equipment" && (
              <label
                htmlFor="manHourInput"
                className="flex flex-col justify-center text-center gap-2 w-1/2"
              >
                Total de Horas-Homem
                <input
                  className="border rounded p-2 flex-1 "
                  value={hourMans}
                  onChange={(e) => setHourMans(e.target.value)}
                  placeholder="Digite o total de Horas-Homem do componente"
                  id="manHourInput"
                />
              </label>
            )}
            <label className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="rcp_type"
                value="equipment"
                checked={recipeType === "equipment"}
                onChange={(e) => {
                  setRecipeType(e.target.value), clearStates();
                }}
                className="accent-blue-500"
              />
              Receita de Equipamento
            </label>
            <label className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="rcp_type"
                value="component"
                checked={recipeType === "component"}
                onChange={(e) => {
                  setRecipeType(e.target.value), clearStates();
                }}
                className="accent-blue-500"
              />
              Receita de Componente
            </label>
          </div>
        </div>
      ) : (
        <div className="flex justify-around text-lg">
          <h1>{recipeName || "Nome da Receita"}</h1>
          <div className="bg-blue-500 px-3 py-1 rounded-full ">
            <p className="text-white font-medium text-lg">
              {recipeType === "equipment"
                ? "Receita de Equipamento"
                : "Receita de Componente"}
            </p>
          </div>
        </div>
      )}
      <div className=" flex flex-wrap justify-center gap-4 px-16">
        {Object.entries(getTotals()).map(([label, value], i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-lg p-2 flex flex-col items-center justify-center border w-28 border-gray-200"
          >
            <p className="text-xs text-gray-600 font-medium mb-1">{label}</p>
            <div className="flex items-end gap-1">
              <p className="text-base font-semibold text-gray-800">
                {typeof value === "number" ? value.toFixed(2) : value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isExpanded ? (
        <>
          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold text-sm">{label}</h2>
            <div
              ref={tableWrapperRef}
              className="overflow-y-auto w-full rounded mt-2 min-h-[12rem] max-h-96 overscroll-contain pr-1"
              style={{ scrollbarGutter: "stable" }}
            >
              <RecipeTable
                recipeType={recipeType}
                materials={
                  recipeType === "equipment" ? componentRecipes : materials
                }
                recipelist={recipelist}
                setRecipeList={setRecipeList}
                selectMatriz={selectMatriz}
                setSelectMatriz={setSelectMatriz}
              />
            </div>
          </div>

          <div className="flex flex-row justify-end p-2 gap-2">
            <button
              className="bg-white-gray p-2 rounded font-semibold text-sm"
              onClick={() => (setIsExpanded(false), clearStates) }
            >
              Cancelar
            </button>
            <button className="bg-spring-green p-2 rounded font-semibold flex items-center justify-center gap-2 hover:bg-emerald-400 transition text-sm">
              <FaRegSave />
              <p>Salvar</p>
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-center p-2 gap-2">
          <button
            className="bg-white-gray p-2 rounded font-semibold text-sm"
            onClick={() => setIsExpanded(true)}
          >
            Ver Mais...
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
