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
    <div className="min-h-screen bg-secondary text-primary">
      <nav className="bg-primary text-secondary px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <Link to="/" className="text-xl font-bold hover:text-secondary/80 transition">
          RecipeHub
        </Link>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard" className="hover:text-secondary/80 font-medium">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="bg-secondary text-primary px-4 py-2 rounded-lg font-bold hover:bg-secondary/90 transition">
              Login
            </Link>
          )}
        </div>
      </nav>

      <section className="bg-primary text-secondary py-24 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Discover Amazing Recipes
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-secondary/80 max-w-2xl mx-auto">
            Find your next favorite dish from our collection of delicious recipes
          </p>
          <div className="flex justify-center">
            <Link
              to="#recipes"
              className="bg-secondary text-primary px-8 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Recipes
            </Link>
          </div>
        </div>
      </section>

      <div id="recipes" className="max-w-7xl mx-auto px-6 mt-12 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full md:w-1/3 px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary bg-white shadow-sm"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />

          <div className="flex gap-4 items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-white shadow-sm cursor-pointer"
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="prepTimeMinutes">Prep Time</option>
              <option value="cookTimeMinutes">Cook Time</option>
            </select>

            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
              className="px-4 py-3 rounded-xl border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary text-primary bg-white shadow-sm cursor-pointer"
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
