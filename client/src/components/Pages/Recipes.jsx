import NavBar from "../Ui/NavBar";
import RecipeHeader from "../Ui/RecipeHeader";
import RecipeCard from "../Ui/RecipeCard";

function Recipes() {

  return (
    <>
      <div className="h-screen w-screen flex flex-col space-y-8">
        <NavBar select_index={5} />
        <div className="flex flex-col space-y-4">
          <RecipeHeader />
          <RecipeCard />
        </div>
      </div>
    </>
  );
}

export default Recipes;
