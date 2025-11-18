import { useState } from "react";
import NavBar from "../Ui/NavBar";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function Recipes() {
  const [materialsExpanded, setMaterialsExpanded] = useState(false);
  const [componentsExpanded, setcomponetsExpanded] = useState(false);
  const [equipmentsExpanded, setEquipmentsExpanded] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <NavBar select_index={5} />
        {[
          {
            label: "Material",
            list: [],
            isExpand: materialsExpanded,
            setExpand: setMaterialsExpanded,
          },
          {
            label: "Componentes",
            list: [],
            isExpand: componentsExpanded,
            setExpand: setcomponetsExpanded,
          },
          {
            label: "Equipamento",
            list: [],
            isExpand: equipmentsExpanded,
            setExpand: setEquipmentsExpanded,
          },
        ].map((i, key) => {
          return (
            <div className="justify-between items-center" key={key}>
              <div className="card justify-between items-center ">
                <h1 className="text-xl">{i.label}</h1>
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
                  <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                    Adicionar Material
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
                            {Object.keys(i.list[0]).map((col, index) => (
                              <th key={index} className="py-2 px-3 capitalize">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {i.list.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className="border-b hover:bg-gray-100 transition"
                            >
                              {Object.values(row).map((val, colIndex) => (
                                <td key={colIndex} className="py-2 px-3">
                                  {val}
                                </td>
                              ))}
                            </tr>
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
    </>
  );
}

export default Recipes;
