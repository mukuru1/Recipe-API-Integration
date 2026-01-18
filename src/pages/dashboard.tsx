import { useState } from "react";
import { 
  useGetRecipesQuery, 
  useAddRecipeMutation, 
  useUpdateRecipeMutation, 
  useDeleteRecipeMutation 
} from "@/features/recipe/recipeApi";
import { useGetMeQuery } from "@/features/auth/authApi";
import type { Recipe } from "@/types";
import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery();
  const { data: recipesData, isLoading: recipesLoading } = useGetRecipesQuery({ limit: 10, page: 1 });
  
  const [addRecipe, { isLoading: isAdding }] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  const [newRecipeName, setNewRecipeName] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAdd = async () => {
    if (!newRecipeName) return;
    try {
      await addRecipe({ name: newRecipeName, difficulty: "Medium", prepTimeMinutes: 20, cookTimeMinutes: 30 }).unwrap();
      setNewRecipeName("");
      alert("Recipe added successfully!");
    } catch (err) {
      alert("Failed to add recipe");
    }
  };

  const handleUpdate = async (recipe: Recipe) => {
    try {
      await updateRecipe({ id: recipe.id, name: `${recipe.name} (Updated)` }).unwrap();
      alert("Recipe updated!");
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteRecipe(id).unwrap();
        alert("Recipe deleted!");
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex items-center gap-4">
            {user?.image && <img src={user.image} alt={user.firstName} className="w-12 h-12 rounded-full border-2 border-orange-500" />}
            <div>
              <h2 className="text-xl font-bold">Welcome, {user?.firstName} {user?.lastName}!</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-red-600 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </header>

        <section className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-bold mb-4">Add New Recipe</h3>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={newRecipeName}
              onChange={(e) => setNewRecipeName(e.target.value)}
              placeholder="Recipe Name"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <button 
              onClick={handleAdd}
              disabled={isAdding}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              Add Recipe
            </button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold mb-6">Manage Your Recipes</h3>
          {recipesLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-4">Name</th>
                    <th className="pb-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recipesData?.recipes.map((recipe) => (
                    <tr key={recipe.id} className="border-b last:border-0">
                      <td className="py-4 font-medium">{recipe.name}</td>
                      <td className="py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleUpdate(recipe)}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                          >
                            Update
                          </button>
                          <button 
                            onClick={() => handleDelete(recipe.id)}
                            className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
