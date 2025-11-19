import React, { useEffect, useState } from "react";
import NavBar from "../Ui/NavBar";
import AddMaterialModal from "../Ui/AddMaterialModal";
import AddComponenteRecipeModal from "../Ui/AddComponenteRecipeModal";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import { listMaterials } from "@services/MaterialService.js";
import {
  vwEquipmentRecipesMaterialSummary,
  vwComponentRecipeMaterials,
} from "@services/ViewsService.js";

function Recipes() {
  const [materialsExpanded, setMaterialsExpanded] = useState(false);
  const [componentsExpanded, setcomponetsExpanded] = useState(false);
  const [equipmentsExpanded, setEquipmentsExpanded] = useState(false);

  const [materialsList, setMaterialsList] = useState([]);
  const [componentsList, setComponentsList] = useState([]);
  const [equipmentsList, setEquipmentsList] = useState([]);

  const [isAddModalVisible, setAddModalVisible] = useState({
    Material: false,
    Componente: false,
    Equipamento: false,
  });

  useEffect(() => {
    const fletchMaterials = async () => {
      const data = await listMaterials();

      const formatted_data = data.map((i) => ({
        ID: i.material_id,
        Nome: i.material_name,
        Descrição: i.material_desc,
        "Valor Unitário": i.value + " " + i.uni,
      }));

      setMaterialsList(formatted_data);
    };
    const fletchComponentRecipeMaterial = async () => {
      const data = await vwComponentRecipeMaterials();

      const formatted_data = data.map((i) => ({
        ID: i.component_id,
        Componente: i.componente,
        Resina: i.resina,
        Manta: i.manta,
        Roving: i.roving,
        Catalizador: i.catalizador,
        "Tecido KG": i.tecido,
        "Horas Homem": i.horas_homem,
        "Valor Total": i.total_value,
      }));
      setComponentsList(formatted_data);
    };

    const fletchProjectMateials = async () => {
      const data = await vwEquipmentRecipesMaterialSummary();

      const formatted_data = data.map((i) => ({
        ID: i.equipment_recipe_id,
        "Nome do Equipamento": i.recipe_name,
        Resina: i.resina,
        Manta: i.manta,
        Roving: i.roving,
        Catalizador: i.catalizador,
        "Tecido KG": i.tecico_kg,
        "Horas Homem": i.horas_homem,
        "Valor Total": i.total_value,
      }));

      setEquipmentsList(formatted_data);
    };

    fletchMaterials();
    fletchComponentRecipeMaterial();
    fletchProjectMateials();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 text-xs">
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

      <NavBar select_index={5} />
      {[
        {
          label: "Material",
          list: materialsList,
          isExpand: materialsExpanded,
          setExpand: setMaterialsExpanded,
          detailsList: null,
        },
        {
          label: "Componente",
          list: componentsList,
          isExpand: componentsExpanded,
          setExpand: setcomponetsExpanded,
          detailsList: ["a", "b", "c", "d"],
        },
        {
          label: "Equipamento",
          list: equipmentsList,
          isExpand: equipmentsExpanded,
          setExpand: setEquipmentsExpanded,
          detailsList: [1, 2, 3, 4, 5],
        },
      ].map((i, key) => {
        return (
          <div className="justify-between items-center" key={key}>
            <div className="card justify-between items-center ">
              <h1 className="text-base">{i.label}</h1>
              <div className="flex flex-row m-auto space-x-4">
                <form className="flex flex-row space-x-4">
                  <input
                    type="text"
                    className="border hover:border-gray-300  rounded-md py-1 px-2 outline-none"
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
                  {i.isExpand === true ? (
                    <IoMdArrowDropup />
                  ) : (
                    <IoMdArrowDropdown />
                  )}
                </button>
              </div>
            </div>
            {
              // parte expandida
              i.isExpand === true && (
                <div className="card mt-4">
                  {i.list.length === 0 ? (
                    <p className="text-gray-500 italic">
                      Nenhum item cadastrado.
                    </p>
                  ) : (
                    <table className="text-left border-collapse">
                      <thead>
                        <tr className="border-b">
                          {Object.keys(i.list[0]).map(
                            (col, index) =>
                              index > 0 && (
                                <th
                                  key={index}
                                  className="py-2 px-3 capitalize text-center"
                                >
                                  {col}
                                </th>
                              )
                          )}
                          <th className="border-b capitalize text-center">
                            Ações
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {i.list.map((row, rowIndex) => (
                          <React.Fragment key={rowIndex}>
                            {/* Linha normal */}
                            <tr className="border-b hover:bg-gray-100 transition">
                              {Object.values(row).map(
                                (val, colIndex) =>
                                  colIndex > 0 && (
                                    <td key={colIndex} className="py-2 px-3">
                                      {val ?? "..."}
                                    </td>
                                  )
                              )}
                              <td className="space-x-4">
                                <button className="bg-gray-100 p-1 rounded hover:bg-gray-200">
                                  Visualizar
                                </button>
                                <button className="bg-gray-100 p-1 rounded hover:bg-gray-200">
                                  Editar
                                </button>
                                <button className="bg-gray-100 p-1 rounded hover:bg-gray-200">
                                  Excluir
                                </button>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )
            }
          </div>
        );
      })}
    </div>
  );
}

export default Recipes;
