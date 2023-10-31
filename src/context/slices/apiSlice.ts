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
  drafterUsername: string;
  drafterName: string;
  documentName: string;
  updatedAt: {
    nanosSinceEpoch: number;
    secsSinceEpoch: number;
  };
}

interface PublishableDraft {
  id: number;
  name: string;
}

interface OfficerPrivateKey {
  onchainAddress: string;
  privateKey: string;
}

interface DraftDetail {
  id: number;
  name: string;
  documentNo: string;
  documentName: string;
  documentType: string;
  fileName: string;
  updatedAt: number;
  docUri: string;
  drafterUsername: string;
  drafterName: string;
}

interface DraftSignature {
  signerName: string;
  positionName: string;
  signature: string;
}

interface PublishedDoc {
  contentHash: string;
  number: string;
  name: string;
  publisher: string;
  publishedDate: number;
}

interface PublishedDocDetail {
  contentHash: string;
  number: string;
  name: string;
  docType: string;
  publisher: string;
  publishedDate: number;
  resourceUri: string;
}

interface PublishedDocSig {
  signerName: string;
  positionName: string;
}

export interface SignerPositions {
  signerAddress: string;
  signerName: string;
  positions: { positionIndex: number; positionName: string }[];
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_HOST,
  }),
  tagTypes: ["User", "Draft", "Publishable"],
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
        divisionOnchainId: string;
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
      invalidatesTags: ["Draft"],
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
      transformResponse: (
        response: {
          id: number;
          name: string;
          drafter_username: string;
          drafter_name: string;
          document_name: string;
          updated_at: {
            nanos_since_epoch: number;
            secs_since_epoch: number;
          };
        }[]
      ) => {
        return response.map((item) => ({
          id: item.id,
          name: item.name,
          drafterUsername: item.drafter_username,
          drafterName: item.drafter_name,
          documentName: item.document_name,
          updatedAt: {
            nanosSinceEpoch: item.updated_at.nanos_since_epoch,
            secsSinceEpoch: item.updated_at.secs_since_epoch,
          },
        }));
      },
      providesTags: ["User", "Draft"],
    }),
    draftDetail: builder.query<
      DraftDetail,
      { divisionOnchainId: string; positionIndex: number; draftId: number }
    >({
      query: ({ divisionOnchainId, positionIndex, draftId }) => ({
        url: `/draft/detail/${draftId}`,
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
      transformResponse: (response: {
        id: number;
        name: string;
        document_no: string;
        document_name: string;
        document_type: string;
        file_name: string;
        updated_at: {
          nanos_since_epoch: number;
          secs_since_epoch: number;
        };
        doc_uri: string;
        drafter_username: string;
        drafter_name: string;
      }) => {
        return {
          id: response.id,
          name: response.name,
          documentNo: response.document_no,
          documentName: response.document_name,
          documentType: response.document_type,
          fileName: response.file_name,
          updatedAt: response.updated_at.secs_since_epoch,
          docUri: response.doc_uri,
          drafterUsername: response.drafter_username,
          drafterName: response.drafter_name,
        };
      },
      providesTags: ["User"],
    }),
    publishableDraft: builder.query<
      PublishableDraft[],
      { divisionOnchainId: string; positionIndex: number }
    >({
      query: ({ divisionOnchainId, positionIndex }) => ({
        url: "/draft/publishable",
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
      transformResponse: (
        response: {
          id: number;
          name: string;
        }[]
      ) => {
        return response.map((item) => ({
          ...item,
        }));
      },
      providesTags: ["User", "Draft", "Publishable"],
    }),
    draftSignatures: builder.query<
      DraftSignature[],
      { divisionOnchainId: string; positionIndex: number; draftId: number }
    >({
      query: ({ divisionOnchainId, positionIndex, draftId }) => ({
        url: `/draft/signatures/${draftId}`,
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
      transformResponse: (
        response: { signer_name: string; position_name: string; signature: string }[]
      ) => {
        return response.map((res) => ({
          signerName: res.signer_name,
          positionName: res.position_name,
          signature: res.signature,
        }));
      },
      providesTags: ["User"],
    }),
    privateKey: builder.query<
      OfficerPrivateKey,
      { divisionOnchainId: string; positionIndex: number }
    >({
      query: ({ divisionOnchainId, positionIndex }) => ({
        url: `/officer/key`,
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
      transformResponse: (response: { onchain_address: string; private_key: string }) => {
        return {
          onchainAddress: response.onchain_address,
          privateKey: response.private_key,
        };
      },
      providesTags: ["User"],
    }),
    publishedDocs: builder.query<
      PublishedDoc[],
      { divisionOnchainId: string; positionIndex: number }
    >({
      query: ({ divisionOnchainId, positionIndex }) => ({
        url: "/published/list",
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
      transformResponse: (
        response: {
          content_hash: string;
          number: string;
          name: string;
          publisher: string;
          published_date: number;
        }[]
      ) => {
        return response.map((item) => ({
          contentHash: item.content_hash,
          number: item.number,
          name: item.name,
          publisher: item.publisher,
          publishedDate: item.published_date,
        }));
      },
      providesTags: ["User"],
    }),
    publishedDocDetail: builder.query<
      PublishedDocDetail,
      { divisionOnchainId: string; positionIndex: number; docContentHash: string }
    >({
      query: ({ divisionOnchainId, positionIndex, docContentHash }) => ({
        url: `/published/detail/${docContentHash}`,
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
      transformResponse: (response: {
        content_hash: string;
        number: string;
        name: string;
        doc_type: string;
        publisher: string;
        published_date: number;
        resource_uri: string;
      }) => {
        return {
          contentHash: response.content_hash,
          number: response.number,
          name: response.name,
          docType: response.doc_type,
          publisher: response.publisher,
          publishedDate: response.published_date,
          resourceUri: response.resource_uri,
        };
      },
      providesTags: ["User"],
    }),
    publishedDocSigs: builder.query<
      PublishedDocSig[],
      { divisionOnchainId: string; positionIndex: number; docContentHash: string }
    >({
      query: ({ divisionOnchainId, positionIndex, docContentHash }) => ({
        url: `/published/signatures/${docContentHash}`,
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
      transformResponse: (response: { signer_name: string; position_name: string }[]) => {
        return response.map((res) => ({
          signerName: res.signer_name,
          positionName: res.position_name,
        }));
      },
      providesTags: ["User"],
    }),
    signerNotSigned: builder.query<
      SignerPositions[],
      { divisionOnchainId: string; positionIndex: number; draftId: number }
    >({
      query: ({ divisionOnchainId, positionIndex, draftId }) => ({
        url: `/draft/not-signed/${draftId}`,
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
      transformResponse: (
        response: {
          signer_address: string;
          signer_name: string;
          positions: { position_index: number; position_name: string }[];
        }[]
      ) => {
        return response.map((res) => ({
          signerAddress: res.signer_address,
          signerName: res.signer_name,
          positions: res.positions.map((pos) => ({
            positionIndex: pos.position_index,
            positionName: pos.position_name,
          })),
        }));
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useUserQuery,
  useLoginMutation,
  useCreateDraftMutation,
  useDocTypesQuery,
  useDraftsListQuery,
  useDraftDetailQuery,
  usePublishableDraftQuery,
  useDraftSignaturesQuery,
  usePrivateKeyQuery,
  usePublishedDocsQuery,
  usePublishedDocDetailQuery,
  usePublishedDocSigsQuery,
  useSignerNotSignedQuery,
  util: apiSliceUtil,
} = apiSlice;
