import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/hero";
import RecipeCard from "@/components/recipeCard";
import { useGetRecipesQuery } from "@/features/recipe/recipeApi";
import { useAuth } from "@/hooks/useAuth";
import type { Recipe } from "@/types";

const LandingPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
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

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-extrabold text-orange-500"
          >
            RecipeHub
          </Link>

          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold
                       hover:bg-orange-600 transition shadow-sm"
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
        </div>
      </nav>

      <Hero />

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 mt-10">
        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search recipes..."
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300
                       focus:ring-2 focus:ring-orange-500 focus:outline-none"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="px-4 py-3 rounded-lg border border-slate-300 bg-white
                       focus:ring-2 focus:ring-orange-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="prepTimeMinutes">Sort by Time</option>
          </select>

          <select
            className="px-4 py-3 rounded-lg border border-slate-300 bg-white
                       focus:ring-2 focus:ring-orange-500"
            value={order}
            onChange={(e) =>
              setOrder(e.target.value as "asc" | "desc")
            }
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* RECIPES */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-60 bg-slate-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data?.recipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-6 py-2 rounded-lg border border-slate-300
                           hover:border-orange-500 hover:text-orange-500
                           transition disabled:opacity-50"
              >
                Previous
              </button>

              <span className="font-semibold text-slate-700">
                Page {page} of {totalPages || 1}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-2 rounded-lg border border-slate-300
                           hover:border-orange-500 hover:text-orange-500
                           transition disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
