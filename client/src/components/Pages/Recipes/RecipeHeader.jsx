import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import AddMaterialModal from "./AddMaterialModal";
import AddComponenteRecipeModal from "./AddComponentRecipeModal";
import AddEquipmentRecipeModal from "./AddEquipmentRecipeModal";

export default function RecipeHeader({ i }) {
  const [isAddModalVisible, setAddModalVisible] = useState({
    Material: false,
    Componente: false,
    Equipamento: false,
  });

  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    i.setSearch(searchText); // <-- Envia busca para o Recipes.jsx
  };

  return (
    <React.Fragment key={i.label}>
      <AddMaterialModal
        isVisible={isAddModalVisible.Material}
        setVisible={() =>
          setAddModalVisible((prev) => ({
            ...prev,
            Material: !prev.Material,
          }))
        }
      />

      <AddComponenteRecipeModal
        isVisible={isAddModalVisible.Componente}
        setVisible={() =>
          setAddModalVisible((prev) => ({
            ...prev,
            Componente: !prev.Componente,
          }))
        }
      />

      <AddEquipmentRecipeModal
        isVisible={isAddModalVisible.Equipamento}
        setVisible={() =>
          setAddModalVisible((prev) => ({
            ...prev,
            Equipamento: !prev.Equipamento,
          }))
        }
      />

      <div className="card justify-between items-center overflow-auto">
        <h1 className="text-base">{i.label}</h1>

        <div className="flex flex-row space-x-4">
          <form className="flex flex-row space-x-4" onSubmit={handleSearch}>
            <input
              type="text"
              className="border hover:border-gray-300 rounded-md py-1 px-2 outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={`Buscar ${i.label}...`}
            />
            <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">
              Pesquisar
            </button>
          </form>

          <button
            className="bg-gray-100 p-2 rounded hover:bg-gray-200 w-36"
            onClick={() =>
              setAddModalVisible((prev) => ({
                ...prev,
                [i.label]: !prev[i.label],
              }))
            }
          >
            Adicionar {i.label}
          </button>

          <button
            className="bg-gray-100 p-2 rounded hover:bg-gray-200"
            onClick={() => i.setExpand(!i.isExpand)}
          >
            {i.isExpand ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
