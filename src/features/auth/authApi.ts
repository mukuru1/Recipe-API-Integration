import { api } from "@/api/api";
import { User, LoginResponse } from "@/types/auth";

// Define the LoginRequest type locally if not in types
interface LoginRequest {
  username: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
