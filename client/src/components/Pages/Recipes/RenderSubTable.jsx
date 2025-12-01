import React, { useEffect, useState } from "react";

import {
  vwMaterialDetailsComponentsRecipes,
  vwMaterialDetailsEquipmentRecipes,
} from "@services/ViewsService.js";

export default function RenderSubTable({ row, expandedRow, i }) {
  const [materials, setMaterials] = useState([]);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await vwMaterialDetailsComponentsRecipes(row.ID);
      setMaterials(data);
    };
    const fetchComponents = async () => {
      const data = await vwMaterialDetailsEquipmentRecipes(row.ID);
      setComponents(data);
    };
    fetchMaterials();
    fetchComponents();
  }, [row.ID, expandedRow]);

  if (!expandedRow || expandedRow.ID !== row.ID) return null;

  // ------------ COMPONENTE ------------
  if (i.label === "Componente") {
    return (
      <tr>
        <td colSpan="100%">
          <div className="bg-gray-50 p-4 rounded border mt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-1">Material</th>
                  <th className="px-2 py-1">Quantidade</th>
                  <th className="px-2 py-1">Valor Unitário</th>
                  <th className="px-2 py-1">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Row.materials não existe, então não renderiza nada  */}
                {materials?.map((m, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-2 py-1">{m.material_name}</td>
                    <td className="px-2 py-1">{m.quantity_plan}</td>
                    <td className="px-2 py-1">
                      {m.value} R$/{m.uni}
                    </td>
                    <td className="px-2 py-1">{m.value * m.quantity_plan} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    );
  }

  // ------------ EQUIPAMENTO ------------
  if (i.label === "Equipamento") {
    return (
      <tr>
        <td colSpan="100%">
          <div className="bg-gray-50 p-4 rounded border mt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-1">Componente</th>
                  <th className="px-2 py-1">Quantidade</th>
                  <th className="px-2 py-1">Valor Unitário</th>
                  <th className="px-2 py-1">Valor Total</th>
                  <th className="px-2 py-1">Ações</th>
                </tr>
              </thead>
              <tbody>
                {components?.map((c, idx) => (
                  <React.Fragment key={idx}>
                    <tr className="border-b">
                      <td className="px-2 py-1">{c.component_recipe_name}</td>
                      <td className="px-2 py-1">{c.quantity_component_plan}</td>
                      <td className="px-2 py-1">{c.value}</td>
                      <td className="px-2 py-1">
                        {c.value * c.quantity_component_plan}
                      </td>
                      <td className="px-2 py-1">
                        <button
                          className="bg-gray-200 px-2 py-1 rounded"
                          onClick={() => {}}
                        >
                          Visualizar
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    );
  }

  return null;
}
