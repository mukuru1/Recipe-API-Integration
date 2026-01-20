import { useState } from "react";
import {
  useGetRecipesQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} from "@/features/recipe/recipeApi";
import { useGetMeQuery } from "@/features/auth/authApi";
import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import type { Recipe } from "@/types";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: user } = useGetMeQuery();
  // We'll fetch a larger list or handle server-side pagination for real apps,
  // but for this dashboard list lets fetch the first 20.
  const { data: recipesData, isLoading } = useGetRecipesQuery({
    page: 1,
    limit: 20,
  });

  const [addRecipe] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  // Local state for form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    difficulty: "Easy" | "Medium" | "Hard";
    prepTimeMinutes: number;
    cookTimeMinutes: number;
  }>({
    name: "",
    difficulty: "Easy",
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAddNew = () => {
    setEditingRecipe(null);
    setFormData({
      name: "",
      difficulty: "Easy",
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
    });
    setIsFormOpen(true);
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      name: recipe.name,
      difficulty: recipe.difficulty,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      await deleteRecipe(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRecipe) {
        await updateRecipe({
          id: editingRecipe.id,
          ...formData,
        }).unwrap();
      } else {
        await addRecipe({
          ...formData,
          // Add default required fields for valid payload if needed
          userId: user?.id || 1,
          ingredients: [],
          instructions: [],
        }).unwrap();
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to save recipe", error);
      alert("Failed to save recipe");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <Link to="/" className="text-teal-400 font-bold text-xl">
          RecipeHub
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* User Profile Section */}
        {user && (
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-6">
            <img
              src={user.image}
              alt={user.username}
              className="w-20 h-20 rounded-full border-4 border-teal-100"
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-slate-500">@{user.username}</p>
              <p className="text-slate-500">{user.email}</p>
            </div>
          </div>
        )}

        {/* Recipe Management */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">My Recipes</h2>
            <button
              onClick={handleAddNew}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition shadow-sm"
            >
              + Add New Recipe
            </button>
          </div>

          {/* Form (Conditional) */}
          {isFormOpen && (
            <div className="bg-white p-6 rounded-xl shadow mb-8 border border-teal-100">
              <h3 className="text-xl font-bold mb-4">
                {editingRecipe ? "Edit Recipe" : "Create New Recipe"}
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Recipe Name
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Handmade Pizza"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty: e.target.value as "Easy" | "Medium" | "Hard",
                      })
                    }
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    value={formData.prepTimeMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prepTimeMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Cook Time (min)
                  </label>
                  <input
                    type="number"
                    value={formData.cookTimeMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cookTimeMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition"
                  >
                    {editingRecipe ? "Update Recipe" : "Create Recipe"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Recipe List Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {isLoading ? (
              <p className="p-6 text-center text-slate-500">Loading recipes...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 border-b">
                      <th className="p-4 font-semibold">Image</th>
                      <th className="p-4 font-semibold">Name</th>
                      <th className="p-4 font-semibold">Difficulty</th>
                      <th className="p-4 font-semibold">Time</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recipesData?.recipes.map((recipe: Recipe) => (
                      <tr key={recipe.id} className="hover:bg-slate-50">
                        <td className="p-4">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-12 h-12 rounded object-cover bg-slate-200"
                          />
                        </td>
                        <td className="p-4 font-medium text-slate-800">
                          {recipe.name}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${recipe.difficulty === "Easy"
                              ? "bg-green-100 text-green-700"
                              : recipe.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {recipe.difficulty}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">
                          {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleEdit(recipe)}
                            className="text-blue-500 hover:text-blue-700 font-medium mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(recipe.id)}
                            className="text-red-500 hover:text-red-700 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
