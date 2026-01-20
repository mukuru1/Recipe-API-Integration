import { useState } from "react";
import { useToast } from "@/hooks/useToast";
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
  const { showToast } = useToast();

  const { data: user } = useGetMeQuery();

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
      try {
        await deleteRecipe(id).unwrap();
        showToast("Recipe deleted successfully", "success");
      } catch (error) {
        showToast("Failed to delete recipe", "error");
      }
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
        showToast("Recipe updated successfully", "success");
      } else {
        await addRecipe({
          ...formData,
          // Add default required fields for valid payload if needed
          userId: user?.id || 1,
          ingredients: [],
          instructions: [],
        }).unwrap();
        showToast("Recipe created successfully", "success");
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to save recipe", error);
      showToast("Failed to save recipe", "error");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Top Navigation */}
      <nav className="bg-indigo-950/50 backdrop-blur-md border-b border-indigo-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white tracking-wide">
            Recipe<span className="text-rose-500">Hub</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-indigo-200">
              Welcome, {user?.firstName || "Chef"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-indigo-800 hover:bg-rose-500 text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-rose-500/20"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-10">
        {/* Profile Hero Section */}
        {user && (
          <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 rounded-3xl p-8 shadow-xl border border-indigo-700 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative">
              <img
                src={user.image}
                alt={user.username}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-rose-500 shadow-lg object-cover bg-indigo-950"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-4 border-indigo-800"></div>
            </div>

            <div className="text-center md:text-left z-0">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-indigo-200 text-lg mb-1">@{user.username}</p>
              <p className="text-indigo-300/80">{user.email}</p>
            </div>

            <div className="md:ml-auto flex gap-4">
              <div className="text-center bg-indigo-950/50 p-4 rounded-xl border border-indigo-700/50">
                <p className="text-2xl font-bold text-white">{recipesData?.total || 0}</p>
                <p className="text-xs text-indigo-300 uppercase tracking-wider">Recipes</p>
              </div>
            </div>
          </div>
        )}

        {/* Recipe Management Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <span className="w-2 h-8 bg-rose-500 rounded-full"></span>
            My Recipes
          </h2>
          <button
            onClick={handleAddNew}
            className="group flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-rose-500/20 transform hover:-translate-y-0.5"
          >
            <span className="text-xl leading-none">+</span> Add New Recipe
          </button>
        </div>

        {/* Recipe Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipesData?.recipes.map((recipe: Recipe) => (
              <div
                key={recipe.id}
                className="group bg-indigo-950 rounded-2xl overflow-hidden border border-indigo-800 hover:border-rose-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/50 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {recipe.difficulty}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-rose-400 transition-colors">
                    {recipe.name}
                  </h3>

                  <div className="flex items-center gap-4 text-indigo-300 text-sm mb-6">
                    <span className="flex items-center gap-1">
                      ⌚ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                    </span>
                    <span className="flex items-center gap-1">
                      🔥 {recipe.caloriesPerServing} cal
                    </span>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleEdit(recipe)}
                      className="bg-indigo-900 hover:bg-indigo-800 text-indigo-100 py-2.5 rounded-lg font-medium transition-colors border border-indigo-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className="bg-transparent hover:bg-rose-500/10 text-rose-500 hover:text-rose-400 py-2.5 rounded-lg font-medium transition-colors border border-rose-500/30 hover:border-rose-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-indigo-950/80 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          ></div>
          <div className="bg-indigo-900 border border-indigo-700 w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-indigo-800 bg-indigo-950/50 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                {editingRecipe ? "Edit Recipe" : "Create New Recipe"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-indigo-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-300 mb-2">Recipe Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-indigo-950 border border-indigo-700 rounded-xl p-3 text-white placeholder-indigo-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="e.g. Spicy Ramen"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-300 mb-2">Difficulty</label>
                    <div className="relative">
                      <select
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                        className="w-full bg-indigo-950 border border-indigo-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none cursor-pointer"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                      <div className="absolute right-3 top-3.5 text-indigo-400 pointer-events-none">▼</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-indigo-300 mb-2">Prep Time (min)</label>
                    <input
                      type="number"
                      value={formData.prepTimeMinutes}
                      onChange={(e) => setFormData({ ...formData, prepTimeMinutes: Number(e.target.value) })}
                      className="w-full bg-indigo-950 border border-indigo-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-indigo-300 mb-2">Cook Time (min)</label>
                    <input
                      type="number"
                      value={formData.cookTimeMinutes}
                      onChange={(e) => setFormData({ ...formData, cookTimeMinutes: Number(e.target.value) })}
                      className="w-full bg-indigo-950 border border-indigo-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4 border-t border-indigo-800/50 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-rose-500/20"
                >
                  {editingRecipe ? "Update Recipe" : "Create Recipe"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 bg-transparent hover:bg-indigo-800 text-indigo-300 hover:text-white py-3 rounded-xl font-bold transition border border-indigo-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
