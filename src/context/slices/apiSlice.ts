import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Officer } from "src/utils/types";

interface GetUserResponse {
  officer_name: string;
  positions: {
    division_onchain_id: string;
    division_name: string;
    position_index: number;
    position_name: string;
    position_role: number;
  }[];
}

interface DraftsListItem {
  id: number;
  name: string;
  drafter_username: string;
  drafter_name: string;
  document_name: string;
  updated_at: {
    nanos_since_epoch: number;
    secs_since_epoch: number;
  };
}

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
            divisionOnchainId: serverPosition.division_onchain_id,
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
    createDraft: builder.mutation<
      Record<string, never>,
      {
        divisionOnchainId: number;
        positionIndex: number;
        draftName: string;
        documentNo: string;
        documentName: string;
        documentType: number;
        documentContent: File;
      }
    >({
      query: ({
        divisionOnchainId,
        positionIndex,
        draftName,
        documentNo,
        documentName,
        documentType,
        documentContent,
      }) => {
        const formData = new FormData();
        formData.append("doc", documentContent);

        const draftInfo = {
          division_onchain_id: divisionOnchainId,
          position_index: positionIndex,
          name: draftName,
          document_no: documentNo,
          document_name: documentName,
          document_type: documentType,
        };
        const reqDraftInfo = new Blob([JSON.stringify(draftInfo)], { type: "application/json" });
        formData.append("info", reqDraftInfo);

        return {
          url: "/draft/create",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      // invalidatesTags: ["User"],
    }),
    docTypes: builder.query<{ id: number; name: string }[], Record<string, never>>({
      query: () => ({
        url: "/doc-types",
        method: "GET",
      }),
    }),
    draftsList: builder.query<
      DraftsListItem[],
      { divisionOnchainId: string; positionIndex: number }
    >({
      query: ({ divisionOnchainId, positionIndex }) => ({
        url: "/draft/list",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          division_onchain_id: divisionOnchainId,
          position_index: positionIndex,
        }),
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUserQuery,
  useLoginMutation,
  useCreateDraftMutation,
  useDocTypesQuery,
  useDraftsListQuery,
} = apiSlice;
