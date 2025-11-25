import React, { useState } from "react";
import AlertModal from "./AlertModal";
import EditMaterialModal from "./EditMaterialModal.jsx";

import { deleteMaterial } from "@services/MaterialService.js";
import { deleteComponentRecipe } from "@services/ComponentRecipes.js";

export default function RecipeTable({ i }) {
  const [modalDeleteVisible, setModalDeleteVisible] = useState({
    Material: false,
    Componente: false,
    Equipamento: false,
  });
  7;

  const [modalEditVisible, setModalEditVisible] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const updateModalDeleteVisible = (key, value) => {
    setModalDeleteVisible((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const modalLabel = {
    Material: {
      title: "Quer excluir esse material?",
      body: "Tem certeza que quer excluir esse material? A ação não é reversivel",
      deleteFunc: async (id) => {
        await deleteMaterial(id);
        window.location.reload();
      },
    },

    Componente: {
      title: "Quer excluir esse material?",
      body: "Tem certeza que quer excluir esse material? A ação não é reversivel",
      deleteFunc: async (id) => {
        await deleteComponentRecipe(id);
        window.location.reload();
      },
    },

    Equipamento: {
      title: "Quer excluir esse material?",
      body: "Tem certeza que quer excluir esse material? A ação não é reversivel",
      deleteFunc: () => console.log("DELETANDO EQUIPAMENTO"),
    },
  };

  return (
    i.isExpand === true && (
      <React.Fragment key={i}>
        <AlertModal
          title={modalLabel[i.label].title}
          body={modalLabel[i.label].body}
          neg_opt="Cancelar"
          pos_opt="Excluir"
          func={() => modalLabel[i.label].deleteFunc(selectedRow.ID)}
          isVisible={modalDeleteVisible[i.label]}
          setVisible={() => updateModalDeleteVisible(i.label, false)}
          style="waring"
        />

        <EditMaterialModal
          isVisible={modalEditVisible}
          setVisible={setModalEditVisible}
          material={selectedRow}
        />

        <div className="card mt-4 justify-center align-middle">
          {i.list.length === 0 ? (
            <p className="text-gray-500 italic">Nenhum item cadastrado.</p>
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
                  <th className="border-b capitalize text-center">Ações</th>
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
                        {i.label != "Material" && (
                          <button className="bg-gray-100 p-1 rounded hover:bg-gray-200">
                            Visualizar
                          </button>
                        )}
                        <button
                          className="bg-gray-100 p-1 rounded hover:bg-gray-200"
                          onClick={() => {
                            if (i.label === "Material") {
                              setModalEditVisible(true);
                              setSelectedRow(row);
                            }
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-gray-100 p-1 rounded hover:bg-gray-200"
                          onClick={() => {
                            setSelectedRow(row);
                            updateModalDeleteVisible(i.label, true);
                          }}
                        >
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
      </React.Fragment>
    )
  );
}
