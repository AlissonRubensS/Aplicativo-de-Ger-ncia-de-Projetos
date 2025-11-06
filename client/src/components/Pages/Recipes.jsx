import NavBar from "../Ui/NavBar";
import RecipeHeader from "../Ui/RecipeHeader";
import RecipeCard from "../Ui/RecipeCard";
import { useState } from "react";

function Recipes() {
  const [recipeCards, setRecipeCards] = useState([
    { id: Date.now(), name: "", type: "", values: [] },
  ]);

  const addBlankCard = () => {
    setRecipeCards((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), name: "", type: "", values: [] },
    ]);
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col space-y-8">
        <NavBar select_index={5} />
        <div className="flex flex-col space-y-4">
          <RecipeHeader onAddCard={addBlankCard} />
          {recipeCards.map((card) => (
            <RecipeCard
              key={card.id}
              name={card.name}
              type={card.type}
              values={card.values}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Recipes;
