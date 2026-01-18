import type { Recipe } from "@/types";

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
      <img 
        src={recipe.image} 
        alt={recipe.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{recipe.name}</h3>
        <div className="flex items-center justify-between">
          <span className="bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded-full font-medium uppercase">
            {recipe.difficulty}
          </span>
          <span className="text-gray-500 text-sm flex items-center">
            ⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
