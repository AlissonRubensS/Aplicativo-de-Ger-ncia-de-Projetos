import React from "react";

export default function RecipeTable({ i }) {
  return (
    i.isExpand === true && (
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
  );
}
