import { CiSearch } from "react-icons/ci";
import { IoAddCircleSharp } from "react-icons/io5";
import { useState } from "react";

export default function SearchBar({
  isModalVisible,
  setIsModalVisible,
  list,
  setFilteredList,
}) {
  const [search, setSearch] = useState("");

  const filterName = () => {
    const lowerCaseSearchTerm = search.toLowerCase();
    let filteredResults = list.filter((name) => {
      return JSON.stringify(name).toLowerCase().includes(lowerCaseSearchTerm);
    });
    return filteredResults;
  };

  return (
    <>
      <div className="flex flex-row self-center bg-white shadow-md shadow-slate-400 rounded-sm px-8 py-2 w-full">
        {/* barra de pesquisa */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search.length > 0
              ? setFilteredList(filterName())
              : setFilteredList(list)
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
