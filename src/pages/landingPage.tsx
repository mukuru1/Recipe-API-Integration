import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "@/components/recipeCard";
import Pagination from "@/components/pagination";
import { useGetRecipesQuery } from "@/features/recipe/recipeApi";
import { useAuth } from "@/hooks/useAuth";
import type { Recipe } from "@/types";

const LandingPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const limit = 12;

  const { isAuthenticated } = useAuth();

  const { data, isLoading } = useGetRecipesQuery({
    page,
    limit,
    search,
    sortBy,
    order,
  });

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-teal-400">
          RecipeHub
        </Link>

        <div className="flex gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard" className="hover:text-teal-400">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="bg-teal-500 px-4 py-1 rounded">
              Login
            </Link>
          )}
        </div>
      </nav>


      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Amazing Recipes
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Find your next favorite dish from our collection of delicious recipes
          </p>
          <div className="flex justify-center">
            <Link
              to="#recipes"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Recipes
            </Link>
          </div>
        </div>
      </section>


      <div id="recipes" className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full md:w-1/3 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-800 bg-white"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />

          <div className="flex gap-4 items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="prepTimeMinutes">Prep Time</option>
              <option value="cookTimeMinutes">Cook Time</option>
            </select>

            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 mt-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data?.recipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {data && (
              <Pagination
                page={page}
                totalPages={Math.ceil(data.total / limit)}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(Math.ceil(data.total / limit), p + 1))}
              />
            )}
          </>
        )}
      </main>
    </div >
  );
};

export default LandingPage;
