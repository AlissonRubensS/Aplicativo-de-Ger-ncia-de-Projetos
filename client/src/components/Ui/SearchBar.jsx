import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { IoAddCircleSharp } from "react-icons/io5";
import { useState } from "react";

export default function SearchBar({
  onEmployeeChanged,
  isModalVisible,
  setIsModalVisible,
  employees,
  setEmployees,
}) {
  const [search, setSearch] = useState("");

  const filterEmployees = () => {
    const lowerCaseSearchTerm = search.toLowerCase();
    console.log(lowerCaseSearchTerm);
    const filteredResults = employees.filter((employee_name) => {
      return JSON.stringify(employee_name)
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
    });
    return filteredResults;
  };

  return (
    <>
      <div className="flex flex-row w-4/5 self-center bg-white shadow-md shadow-slate-400 rounded-sm px-8 py-2">
        {/* barra de pesquisa */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search ? setEmployees(filterEmployees()) :  onEmployeeChanged;
          }}
          className="flex flex-row w-full"
        >
          <div className="flex items-center justify-center p-1 hover:bg-gray-100 rounded">
            <button type="submit">
              <CiSearch />
            </button>
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            className="hover:border hover:border-gray-300 rounded-md py-1 px-2 w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex flex-row items-center space-x-2 ml-4">
          {/* Filtros*/}
          <button className="flex flex-row items-center space-x-1 hover:bg-gray-100 rounded p-1">
            <IoFilterOutline />
            <p>Filtrar</p>
          </button>

          {/* Adicionar */}
          <button
            className="flex flex-row items-center space-x-1 hover:bg-gray-100 rounded p-1"
            onClick={() => setIsModalVisible(!isModalVisible)}
          >
            <IoAddCircleSharp />
            <p>Adicionar</p>
          </button>
        </div>
      </div>
    </>
  );
}
