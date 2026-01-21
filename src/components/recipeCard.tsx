import type { Recipe } from "@/types";
import { useToast } from "@/hooks/useToast";
import Rating from "./Rating";

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const { showToast } = useToast();
  return (
    <div className="bg-secondary rounded-xl shadow-sm border border-primary/10 hover:shadow-md transition p-4 flex flex-col">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-40 w-full object-cover rounded-lg mb-4"
      />

      <h3 className="font-semibold text-primary truncate">
        {recipe.name}
      </h3>

      <p className="text-sm text-primary/70 mt-1">
        Difficulty: {recipe.difficulty}
      </p>

      <div className="mt-2">
        <Rating rating={recipe.rating} reviewCount={recipe.reviewCount} />
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={() => showToast(`Opening recipe: ${recipe.name}`, "info")}
          className="w-full bg-primary hover:opacity-90 text-secondary py-2 rounded-lg font-medium transition"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
