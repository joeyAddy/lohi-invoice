import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type {
  ClientDetails,
  ClientListResponse,
  CreateClientRequest,
  UpdateClientRequest,
} from "../../../interfaces";
import { ENDPOINTS } from "../constants/endpoints";

export const clientEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  createClient: builder.mutation<ClientDetails, CreateClientRequest>({
    query: (data) => ({
      url: ENDPOINTS.CLIENTS,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["Client"],
  }),

  updateClient: builder.mutation<ClientDetails, UpdateClientRequest>({
    query: ({ id, ...data }) => ({
      url: ENDPOINTS.CLIENT_BY_ID(id),
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["Client"],
  }),

  getClient: builder.query<ClientDetails, string>({
    query: (id) => ({
      url: ENDPOINTS.CLIENT_BY_ID(id),
      method: "GET",
    }),
    providesTags: ["Client"],
  }),

  getClients: builder.query<
    ClientListResponse,
    { page?: number; limit?: number }
  >({
    query: ({ page = 1, limit = 10 } = {}) => ({
      url: `${ENDPOINTS.CLIENTS}?page=${page}&limit=${limit}`,
      method: "GET",
    }),
    providesTags: ["Client"],
  }),

  deleteClient: builder.mutation<{ message: string }, string>({
    query: (id) => ({
      url: ENDPOINTS.CLIENT_BY_ID(id),
      method: "DELETE",
    }),
    invalidatesTags: ["Client"],
  }),
});
