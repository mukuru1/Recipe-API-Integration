import { useState } from "react";
import { useGetRecipesQuery, useAddRecipeMutation, useUpdateRecipeMutation, useDeleteRecipeMutation,} from "@/features/recipe/recipeApi";
import { useGetMeQuery } from "@/features/auth/authApi";
import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import type { Recipe } from "@/types";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: user } = useGetMeQuery();
  const { data: recipesData } = useGetRecipesQuery({ page: 1, limit: 10 });

  const [addRecipe] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  const [newRecipeName, setNewRecipeName] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-teal-400 font-bold text-lg">
          RecipeHub
        </Link>

        <div className="flex items-center gap-4">
          <span>{user?.username}</span>
          <button onClick={handleLogout} className="text-red-400">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Product Dashboard</h1>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <input
            value={newRecipeName}
            onChange={(e) => setNewRecipeName(e.target.value)}
            placeholder="Recipe name"
            className="border px-3 py-2 rounded mr-4"
          />
          <button
            onClick={() =>
              addRecipe({
                name: newRecipeName,
                difficulty: "Medium",
                prepTimeMinutes: 20,
                cookTimeMinutes: 30,
              })
            }
            className="bg-teal-500 text-white px-4 py-2 rounded"
          >
            Add Recipe
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <tbody>
              {recipesData?.recipes.map((recipe: Recipe) => (
                <tr key={recipe.id} className="border-b">
                  <td className="p-4">{recipe.name}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() =>
                        updateRecipe({
                          id: recipe.id,
                          name: recipe.name + " (Updated)",
                        })
                      }
                      className="text-blue-500 mr-4"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
