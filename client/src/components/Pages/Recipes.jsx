// Bibliotecas
import { useEffect, useState } from "react";

// Componentes
import NavBar from "../Ui/NavBar";
import RecipeTable from "../Ui/RecipeTable";
import RecipeHeader from "../Ui/RecipeHeader";

// Serviços
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

  useEffect(() => {
    const fletchMaterials = async () => {
      const data = await listMaterials();

      const formatted_data = data.map((i) => ({
        ID: i.material_id,
        Nome: i.material_name,
        Descrição: i.material_desc,
        "Valor Unitário": i.value + " R$/" + i.uni,
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
    <div className="w-full flex flex-col gap-4 text-xs mb-16 overflow-x-hidden overflow-y-auto">
      <NavBar select_index={5} />
      {[
        {
          label: "Material",
          list: materialsList,
          isExpand: materialsExpanded,
          setExpand: setMaterialsExpanded,
        },
        {
          label: "Componente",
          list: componentsList,
          isExpand: componentsExpanded,
          setExpand: setcomponetsExpanded,
        },
        {
          label: "Equipamento",
          list: equipmentsList,
          isExpand: equipmentsExpanded,
          setExpand: setEquipmentsExpanded,
        },
      ].map((i, key) => (
        <div className="justify-between self-center w-4/5 " key={key}>
          <RecipeHeader i={i} />
          <RecipeTable i={i} />
        </div>
      ))}
    </div>
  );
}

export default Recipes;
