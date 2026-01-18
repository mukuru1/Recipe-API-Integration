import { useAddRecipeMutation, useDeleteRecipeMutation, } from "@/features/recipe/recipeApi";

const Dashboard: React.FC = () => {
  const [addRecipe] = useAddRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  return (
    <div>
      <h2>Recipe Dashboard</h2>

      <button
        onClick={() =>
          addRecipe({ name: "New Recipe", difficulty: "Easy" })
        }
      >
        Add Recipe
      </button>

      <button onClick={() => deleteRecipe(1)}>Delete Recipe</button>
    </div>
  );
};

export default Dashboard;
