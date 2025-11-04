import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

function StyledTable({
  type = "Equipamento",
  data = [
    { name: "Componente A", qty: "X" },
    { name: "Componente B", qty: "X" },
    { name: "Componente A", qty: "X" },
    { name: "Componente B", qty: "X" },
    { name: "Componente A", qty: "X" },
    { name: "Componente B", qty: "X" },
  ],
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 w-full max-w-2xl m-auto">
      <table className="w-full border-collapse">
        {/* Cabeçalho */}
        <thead>
          <tr className="bg-blue-500 text-white text-left">
            <th className="px-4 py-3 rounded-tl-2xl font-semibold">
              {type === "Equipamento" ? "Componente" : "Material"}
            </th>
            <th className="px-4 py-3 font-semibold">Quantidade</th>
            <th className="px-4 py-3 text-right rounded-tr-2xl">
              <button className="text-white hover:text-blue-200 transition">
                <IoIosAddCircleOutline size={22} />
              </button>
            </th>
          </tr>
        </thead>

        {/* Corpo */}
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-t border-gray-200`}
            >
              <td className="px-4 py-2 text-gray-800">{item.name}</td>
              <td className="px-4 py-2 text-gray-700">{item.qty}</td>
              <td className="px-4 py-2 text-right">
                <button className="text-red-500 hover:text-red-700 transition">
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StyledTable;
