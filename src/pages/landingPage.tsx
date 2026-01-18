import { useState } from "react";
import Hero from "@/components/Hero";
import { useGetRecipesQuery } from "@/features/recipes/recipesApi";

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
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="difficulty">Difficulty</option>
      </select>

      <select onChange={(e) => setOrder(e.target.value as "asc" | "desc")}>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data?.recipes.map((recipe) => (
          <div key={recipe.id}>{recipe.name}</div>
        ))
      )}

      <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
        Prev
      </button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </>
  );
};

export default LandingPage;
