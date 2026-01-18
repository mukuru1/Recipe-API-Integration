import { useState, ChangeEvent } from "react";
import Hero from "@/components/hero";
import { useGetRecipesQuery } from "@/features/recipe/recipeApi";
import type { Recipe } from "@/types";

const LandingPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading } = useGetRecipesQuery({
    page,
    search,
    sortBy,
    order,
  });

  return (
    <>
      <Hero />

      <input
        placeholder="Search recipes..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />

      <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="difficulty">Difficulty</option>
      </select>

      <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setOrder(e.target.value as "asc" | "desc")}>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data?.recipes.map((recipe: Recipe) => (
          <div key={recipe.id}>{recipe.name}</div>
        ))
      )}

      <button disabled={page === 1} onClick={() => setPage((p: number) => p - 1)}>
        Prev
      </button>
      <button onClick={() => setPage((p: number) => p + 1)}>Next</button>
    </>
  );
};

export default LandingPage;
