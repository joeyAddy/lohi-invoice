import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type {
  ChangePasswordRequest,
  UpdateOnboardingStepRequest,
  UpdateUserProfileRequest,
  User,
} from "../../../interfaces";
import { ENDPOINTS } from "../constants/endpoints";

export const userEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  getUserProfile: builder.query<User, void>({
    query: () => ({
      url: ENDPOINTS.USER_PROFILE,
      method: "GET",
    }),
    providesTags: ["User"],
  }),

  updateProfile: builder.mutation<User, UpdateUserProfileRequest>({
    query: (data) => ({
      url: ENDPOINTS.UPDATE_PROFILE,
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["User"],
  }),

  changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
    query: (data) => ({
      url: ENDPOINTS.CHANGE_PASSWORD,
      method: "POST",
      body: data,
    }),
  }),

  updateOnboardingStep: builder.mutation<User, UpdateOnboardingStepRequest>({
    query: (data) => ({
      url: ENDPOINTS.UPDATE_ONBOARDING,
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["User"],
  }),
});
