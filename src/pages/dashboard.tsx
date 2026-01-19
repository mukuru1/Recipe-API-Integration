import { useState } from "react";
import {
  useGetRecipesQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} from "@/features/recipe/recipeApi";
import { useGetMeQuery } from "@/features/auth/authApi";
import type { Recipe } from "@/types";
import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery();
  const { data } = useGetRecipesQuery({ limit: 10, page: 1 });

  const [addRecipe] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();
  const [newRecipeName, setNewRecipeName] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center mb-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-slate-800">
              Welcome, {user?.firstName}
            </h2>
            <p className="text-slate-500 text-sm">{user?.email}</p>
          </div>

          <div className="flex items-center gap-4">
            {/* RecipeHub Button */}
            <Link
              to="/"
              className="px-5 py-2 rounded-lg border border-orange-500
                         text-orange-500 font-semibold
                         hover:bg-orange-50 transition"
            >
              RecipeHub
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-orange-500 font-semibold hover:underline"
            >
              Logout
            </button>
          </div>
        </header>

        {/* ADD RECIPE */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="font-bold mb-4 text-slate-800">
            Add New Recipe
          </h3>
          <div className="flex gap-4">
            <input
              value={newRecipeName}
              onChange={(e) => setNewRecipeName(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg
                         focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Recipe name"
            />
            <button
              onClick={() =>
                addRecipe({
                  name: newRecipeName,
                  difficulty: "Medium",
                })
              }
              className="bg-orange-500 text-white px-6 py-2 rounded-lg
                         hover:bg-orange-600 transition"
            >
              Add
            </button>
          </div>
        </section>

        {/* MANAGE RECIPES */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold mb-4 text-slate-800">
            Manage Recipes
          </h3>

          <table className="w-full border-collapse">
            <tbody>
              {data?.recipes.map((recipe: Recipe) => (
                <tr
                  key={recipe.id}
                  className="border-b last:border-0"
                >
                  <td className="py-4 font-medium text-slate-700">
                    {recipe.name}
                  </td>
                  <td className="py-4 text-right space-x-2">
                    <button
                      onClick={() =>
                        updateRecipe({
                          id: recipe.id,
                          name: `${recipe.name} (Updated)`,
                        })
                      }
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded
                                 hover:bg-blue-200 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded
                                 hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
