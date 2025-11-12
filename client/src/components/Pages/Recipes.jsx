import NavBar from "../Ui/NavBar";
import RecipeHeader from "../Ui/RecipeHeader";
import RecipeCard from "../Ui/RecipeCard";
import { useState } from "react";

function Recipes() {
  // estado temporario
  const [recipeCards, setRecipeCards] = useState([
    {
      id: Date.now(),
      name: "",
      type: "",
      recipeItens: [{ id: null, label: "", qtd: 0, value: 0.0, uni: "uni" }],
    },
  ]);

  const addBlankCard = () => {
    setRecipeCards((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        name: "",
        type: "",
        recipeItens: [{ id: null, label: "", qtd: 0, value: 0.0, uni: "uni" }],
      },
    ]);
  };
  return (
    <>
      <div className="h-screen max-w-screen flex flex-col space-y-8 mb-28 overflow-x-hidden">
        <NavBar select_index={5} />
        <div className="flex flex-col space-y-4 text-sm">
          <RecipeHeader onAddCard={addBlankCard} />
          {recipeCards.map((card) => (
            <RecipeCard
              key={card.id}
              name={card.name}
              type={card.type}
              values={card.recipeItens}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Recipes;
