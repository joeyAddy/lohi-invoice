import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type {
  AgencyDetails,
  CreateAgencyRequest,
  UpdateAgencyRequest,
} from "../../../interfaces";
import { ENDPOINTS } from "../constants/endpoints";

export const agencyEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  createAgency: builder.mutation<AgencyDetails, CreateAgencyRequest>({
    query: (data) => ({
      url: ENDPOINTS.COMPANIES,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User", "Agency"],
  }),

  updateAgency: builder.mutation<AgencyDetails, UpdateAgencyRequest>({
    query: ({ id, ...data }) => ({
      url: ENDPOINTS.COMPANY_BY_ID(id),
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["User", "Agency"],
  }),

  getAgency: builder.query<AgencyDetails, string>({
    query: (id) => ({
      url: ENDPOINTS.COMPANY_BY_ID(id),
      method: "GET",
    }),
    providesTags: ["Agency"],
  }),

  deleteAgency: builder.mutation<{ message: string }, string>({
    query: (id) => ({
      url: ENDPOINTS.COMPANY_BY_ID(id),
      method: "DELETE",
    }),
    invalidatesTags: ["User", "Agency"],
  }),
});
