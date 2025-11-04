import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import RecipeTable from "./RecipeTable.jsx";

function RecipeCard({
  name = "Nome da Receita",
  type = "Tipo",
  values = [
    {
      label: "Resina",
      value: 0,
      uni: "Kg",
    },
    {
      label: "Resina-ISO",
      value: 0,
      uni: "Kg",
    },
    {
      label: "Manta",
      value: 0,
      uni: "Kg",
    },
    {
      label: "Catalizador",
      value: 0,
      uni: "Kg",
    },
    {
      label: "Tecido",
      value: 0,
      uni: "Kg",
    },
    {
      label: "Roving",
      value: 0,
      uni: "Kg",
    },
    {
      label: "Horas-Homem",
      value: 0,
      uni: "HH",
    },
    {
      label: "Valor",
      value: 0,
      uni: "R$",
    },
  ],
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="m-auto bg-white rounded shadow-md w-3/5 border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between mb-4 pb-3 px-4 align-middle">
        <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
        <div className="bg-blue-700  px-3 py-1 rounded-full ">
          <p className="text-white font-medium">{type}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-16">
        {values.map((v, i) => {
          return (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-2 flex flex-col items-center justify-center border border-gray-200"
            >
              <p className="text-sm text-gray-600 font-medium mb-1">
                {v.label}
              </p>
              <div className="flex items-end gap-1">
                <p className="text-lg font-semibold text-gray-800">{v.value}</p>
                <p className="text-xs text-gray-500 mb-1">{v.uni}</p>
              </div>
            </div>
          );
        })}
      </div>

      {isExpanded ? (
        <>
          {/* botões de ação */}

          <RecipeTable />

          <div className="flex flex-row justify-end p-2 gap-2">
            <button
              className="bg-white-gray p-2 rounded font-semibold text-lg"
              onClick={() => setIsExpanded(false)}
            >
              Cancelar
            </button>
            <button className="bg-spring-green p-2 rounded font-semibold flex items-center justify-center gap-2 hover:bg-emerald-400 transition text-lg">
              <FaRegSave />
              <p>Salvar</p>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* botão ver mais */}
          <div className="flex flex-row justify-center p-2 gap-2">
            <button
              className="bg-white-gray p-2 rounded font-semibold text-lg"
              onClick={() => setIsExpanded(true)}
            >
              Ver Mais...
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeCard;
