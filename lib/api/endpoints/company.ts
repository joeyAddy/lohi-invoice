import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type {
  CompanyDetails,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "../../../interfaces";
import { ENDPOINTS } from "../constants/endpoints";

export const companyEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  createCompany: builder.mutation<CompanyDetails, CreateCompanyRequest>({
    query: (data) => ({
      url: ENDPOINTS.COMPANIES,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User", "Company"],
  }),

  updateCompany: builder.mutation<CompanyDetails, UpdateCompanyRequest>({
    query: ({ id, ...data }) => ({
      url: ENDPOINTS.COMPANY_BY_ID(id),
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["User", "Company"],
  }),

  getCompany: builder.query<CompanyDetails, string>({
    query: (id) => ({
      url: ENDPOINTS.COMPANY_BY_ID(id),
      method: "GET",
    }),
    providesTags: ["Company"],
  }),

  deleteCompany: builder.mutation<{ message: string }, string>({
    query: (id) => ({
      url: ENDPOINTS.COMPANY_BY_ID(id),
      method: "DELETE",
    }),
    invalidatesTags: ["User", "Company"],
  }),
});
