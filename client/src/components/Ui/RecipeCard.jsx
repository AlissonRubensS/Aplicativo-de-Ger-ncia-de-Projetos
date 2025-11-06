import { useEffect, useRef, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import RecipeTable from "./RecipeTable.jsx";
import { listMaterials } from "../../../services/MaterialService.js";

function RecipeCard({ name = "", type = "equipment", values = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Editable states
  const [recipeName, setRecipeName] = useState(name);
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

  useEffect(() => {
    listMaterials()
      .then(setMaterials)
      .catch(() => setMaterials([]));
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

  useEffect(()=>{
    recipelist.map((r) => console.log(JSON.stringify(r)))
  }, [recipelist])

  return (
    <div className="m-auto bg-white rounded shadow-md w-3/5 border border-gray-200 p-4 space-y-4 text-sm">
      {isExpanded ? (
        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-center gap-4 text-sm">
            <input
              className="border rounded p-2 flex-1 "
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="Digite o nome da receita"
            />
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-16">
        {(values.length
          ? values
          : [{ label: "Resina", value: 0, uni: "Kg" }]
        ).map((v, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-lg p-2 flex flex-col items-center justify-center border border-gray-200"
          >
            <p className="text-xs text-gray-600 font-medium mb-1">{v.label}</p>
            <div className="flex items-end gap-1">
              <p className="text-base font-semibold text-gray-800">{v.value}</p>
              <p className="text-xs text-gray-500 mb-1">{v.uni}</p>
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
                materials={materials}
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
              onClick={() => setIsExpanded(false)}
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
