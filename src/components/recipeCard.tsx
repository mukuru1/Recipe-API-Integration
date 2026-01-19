import type { Recipe } from "@/types";

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-4 flex flex-col">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-40 w-full object-cover rounded-lg mb-4"
      />

      <h3 className="font-semibold text-slate-800 truncate">
        {recipe.name}
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        Difficulty: {recipe.difficulty}
      </p>

      <div className="mt-auto pt-4">
        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
