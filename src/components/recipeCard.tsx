import type { Recipe } from "@/types";

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <div>
      <h3>{recipe.name}</h3>
      <p>Difficulty: {recipe.difficulty}</p>
    </div>
  );
};

export default RecipeCard;
