import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetUserResponse, Officer } from "src/utils/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_HOST,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    user: builder.query<Officer, Record<string, never>>({
      query: () => ({
        url: "/login-cookie",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (serverResponse: GetUserResponse) => {
        const officer: Officer = {
          officerName: serverResponse.officer_name,
          positions: serverResponse.positions.map((serverPosition) => ({
            positionIndex: serverPosition.position_index,
            positionName: serverPosition.position_name,
            positionRole: serverPosition.position_role,
            divisionId: serverPosition.division_id,
            divisionName: serverPosition.division_name,
          })),
        };
        return officer;
      },
      providesTags: ["User"],
    }),
    login: builder.mutation<Record<string, never>, { username: string; password: string }>({
      query: (authInfo) => {
        return {
          url: "/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authInfo),
          credentials: "include",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUserQuery, useLoginMutation } = apiSlice;
