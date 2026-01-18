import { api } from "@/api/api";
import type { Recipe, PaginatedResponse } from "@/types";

interface RecipesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

type RecipesResponse = PaginatedResponse<Recipe>;

export const recipesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipesResponse, RecipesQueryParams>({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        sortBy = "name",
        order = "asc",
      }) => {
        const params: any = {
          limit,
          skip: (page - 1) * limit,
        };
        
       
        if (search) {
          return {
            url: "/recipes/search",
            params: { ...params, q: search },
          };
        }

       
        return {
          url: "/recipes",
          params: { ...params, sortBy, order },
        };
      },
      providesTags: ["Recipes"],
    }),

    addRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (recipe) => ({
        url: "/recipes/add",
        method: "POST",
        body: recipe,
      }),
      invalidatesTags: ["Recipes"],
    }),

    updateRecipe: builder.mutation<
      Recipe,
      { id: number } & Partial<Recipe>
    >({
      query: ({ id, ...data }) => ({
        url: `/recipes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Recipes"],
    }),

    deleteRecipe: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApi;
