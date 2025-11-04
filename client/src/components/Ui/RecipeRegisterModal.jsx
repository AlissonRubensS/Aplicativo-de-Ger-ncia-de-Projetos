import { useState } from "react";
import { FaTrash } from "react-icons/fa";

function RecipeRegisterModal() {
  const [type, setType] = useState("equipment");
  const [recipeName, setRecipeName] = useState("");
  const [recipeDesc, setRecipeDesc] = useState("");
  const [recipelist, setRecipeList] = useState([]);

  let label = type === "equipment" ? "Componentes" : "Materiais";

  return (
    <>
      <div>
        <h1>Registrar Nova Receita</h1>
        <form>
          <div>
            <h2>Escolha qual o tipo da receita</h2>
            <input
              type="radio"
              name="recipe_type"
              id="recipe_equipment"
              value="equipment"
              checked={type === "equipment"}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="recipe_equipment">Receita de Equipamento</label>

            <input
              type="radio"
              name="recipe_type"
              id="recipe_component"
              value="component"
              checked={type === "component"}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="recipe_component">Receita de Componente</label>

            <label htmlFor="recipe_name">Nome da Receita</label>
            <input
              type="text"
              name="recipe_name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <label htmlFor="recipe_dec">Descrição da Receita</label>
            <input
              type="text"
              name="recipe_desc"
              value={recipeDesc}
              onChange={(e) => setRecipeDesc(e.target.value)}
            />
          </div>
          <div>
            <h2>{label}</h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                setRecipeList((prev) => [
                  ...prev,
                  { label: "Nova Receita", value: 0, uni: "Uni" },
                ]);
              }}
            >
              Adicionar {label}
            </button>
            <table>
              <thead>
                <th>{label}</th>
                <th>Quantidade</th>
                <th>Unidade</th>
              </thead>
              <tbody>
                {recipelist.map((o, i) => (
                  <tr key={i}>
                    <td>{o.label}</td>
                    <td>{o.value}</td>
                    <td>
                      <p>{o.uni}</p>
                      <button>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
}

export default RecipeRegisterModal;
