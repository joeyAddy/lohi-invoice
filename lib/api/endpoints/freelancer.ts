import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type {
  CreateFreelancerRequest,
  FreelancerDetails,
  UpdateFreelancerRequest,
} from "../../../interfaces";
import { ENDPOINTS } from "../constants/endpoints";

export const freelancerEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  getFreelancers: builder.query<FreelancerDetails[], void>({
    query: () => ENDPOINTS.FREELANCERS,
    providesTags: ["Freelancer"],
  }),

  getFreelancerById: builder.query<FreelancerDetails, string>({
    query: (id) => ENDPOINTS.FREELANCER_BY_ID(id),
    providesTags: (_result, _error, id) => [{ type: "Freelancer", id }],
  }),

  createFreelancer: builder.mutation<
    FreelancerDetails,
    CreateFreelancerRequest
  >({
    query: (data) => ({
      url: ENDPOINTS.FREELANCERS,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["Freelancer"],
  }),

  updateFreelancer: builder.mutation<
    FreelancerDetails,
    UpdateFreelancerRequest
  >({
    query: ({ id, ...data }) => ({
      url: ENDPOINTS.FREELANCER_BY_ID(id),
      method: "PUT",
      body: data,
    }),
    invalidatesTags: (_result, _error, { id }) => [
      { type: "Freelancer", id },
      "Freelancer",
    ],
  }),

  deleteFreelancer: builder.mutation<void, string>({
    query: (id) => ({
      url: ENDPOINTS.FREELANCER_BY_ID(id),
      method: "DELETE",
    }),
    invalidatesTags: (_result, _error, id) => [
      { type: "Freelancer", id },
      "Freelancer",
    ],
  }),
});
