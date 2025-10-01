import React, { useState } from "react";
import PropTypes from "prop-types";

function CascadeTable({ title, headers, values, filter }) {
  const [openGroups, setOpenGroups] = useState({});
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const toggleGroup = (groupName) =>
    setOpenGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));

  // soma a coluna selecionada
  const calcularTotal = (groupItems) =>
    groupItems.reduce((acc, row) => {
      const val = Number(row[selectedFilterIndex + 1]) || 0;
      return acc + val;
    }, 0);

  const displayedHeaders = [
    headers?.[0] || "Item",
    filter?.[selectedFilterIndex] || headers?.[1] || "Valor",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-2 text-base">
      {/* Header com título e filtro */}
      <div className="relative bg-sky-200 font-bold py-1 px-2 flex items-center text-base">
        <h2 className="flex-1 text-center">{title}</h2>
        {filter?.length > 1 && (
          <div className="absolute right-2">
            <select
              className="border-none rounded p-1 text-sm bg-transparent"
              value={selectedFilterIndex}
              onChange={(e) => setSelectedFilterIndex(Number(e.target.value))}
            >
              {filter.map((f, i) => (
                <option key={i} value={i}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tabela */}
      <table className="min-w-full border-collapse text-base">
        <thead>
          <tr className="bg-sky-200 uppercase font-semibold text-sm">
            {displayedHeaders.map((header, index) => (
              <th
                key={index}
                className="p-2 border-b border-sky-300 text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(values).map(([groupName, groupItems]) => {
            const total = calcularTotal(groupItems);

            return (
              <React.Fragment key={groupName}>
                {/* Linha do grupo */}
                <tr className="bg-sky-50 hover:bg-sky-100 text-sm">
                  <td colSpan={displayedHeaders.length - 1}>
                    <button
                      onClick={() => toggleGroup(groupName)}
                      className="flex items-center justify-between w-full p-2 font-medium"
                    >
                      <span className="flex items-center gap-1">
                        {openGroups[groupName] ? (
                          <img
                            src="src/imgs/remove-square.png"
                            className="h-4 w-4"
                            alt="collapse"
                          />
                        ) : (
                          <img
                            src="src/imgs/add-square.png"
                            className="h-4 w-4"
                            alt="expand"
                          />
                        )}
                        {groupName}
                      </span>
                    </button>
                  </td>
                  <td className="text-center font-medium p-2">
                    {filter[selectedFilterIndex]} Total: {total}
                  </td>
                </tr>

                {/* Linhas do grupo */}
                {openGroups[groupName] &&
                  groupItems.map((row, rowIndex) => {
                    const displayValue =
                      Number(row[selectedFilterIndex + 1]) || 0;
                    return (
                      <tr
                        key={rowIndex}
                        className="bg-white hover:bg-sky-50 transition text-sm"
                      >
                        <td className="p-2 border-b border-sky-200 text-left">
                          {row[0]}
                        </td>
                        <td className="p-2 border-b border-sky-200 text-center font-semibold">
                          {displayValue}
                        </td>
                      </tr>
                    );
                  })}

                {/* Total dentro do grupo */}
                {openGroups[groupName] && (
                  <tr className="bg-sky-100 font-bold text-sm">
                    <td className="p-2 text-right">
                      {filter[selectedFilterIndex]} Total
                    </td>
                    <td className="p-2 text-center">{total}</td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

CascadeTable.propTypes = {
  title: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.array)).isRequired,
  filter: PropTypes.arrayOf(PropTypes.string),
};

export default CascadeTable;
