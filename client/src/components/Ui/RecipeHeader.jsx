import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";

export default function RecipeHeader({ onAddCard }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-row justify-between items-center bg-white rounded-lg shadow-sm w-4/5 py-2 px-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-semibold">Tela de receitas</h1>
            <h2>Gerencie suas receitas ou gere uma nova</h2>
          </div>

          <div className="flex flex-row space-x-2 items-center">
            <form
              className="bg-white-gray px-4 py-2 rounded flex align-middle justify-between space-x-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <button type="button">
                <img
                  src="\src\imgs\lupa-icon.png"
                  alt="imagem de uma pesquisa"
                  size={10}
                />
              </button>

              <input
                type="text"
                placeholder="Pesquisar receitas"
                className="bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <button
              className="flex items-center px-4 py-2 bg-spring-green rounded-lg hover:bg-green-600 transition font-semibold space-x-2"
              onClick={() => onAddCard && onAddCard()}
            >
              <IoAddOutline size={22} />
              <p>Nova Receita</p>
            </button>

            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold">
              Gerenciar Materiais
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
