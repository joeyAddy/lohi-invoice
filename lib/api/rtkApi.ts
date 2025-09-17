import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./constants/endpoints";
import { agencyEndpoints } from "./endpoints/agency";
import { authEndpoints } from "./endpoints/auth";
import { clientEndpoints } from "./endpoints/client";
import { freelancerEndpoints } from "./endpoints/freelancer";
import { onboardingEndpoints } from "./endpoints/onboarding";
import { userEndpoints } from "./endpoints/user";

// Define the API slice
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the auth slice
      const state = getState() as any;
      const token = state.auth?.token;

      // If we have a token, add it to the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // Set content type
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: ["User", "Agency", "Freelancer", "Client", "Invoice"], // Add more tag types as needed
  endpoints: (builder) => ({
    // Combine all endpoints
    ...authEndpoints(builder),
    ...userEndpoints(builder),
    ...agencyEndpoints(builder),
    ...freelancerEndpoints(builder),
    ...clientEndpoints(builder),
    ...onboardingEndpoints(builder),
  }),
});

// Export hooks for usage in functional components
export const {
  // Auth hooks
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,

  // User hooks
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUpdateOnboardingStepMutation,

  // Agency hooks
  useCreateAgencyMutation,
  useUpdateAgencyMutation,
  useGetAgencyQuery,
  useDeleteAgencyMutation,

  // Freelancer hooks
  useGetFreelancersQuery,
  useGetFreelancerByIdQuery,
  useCreateFreelancerMutation,
  useUpdateFreelancerMutation,
  useDeleteFreelancerMutation,

  // Client hooks
  useCreateClientMutation,
  useUpdateClientMutation,
  useGetClientQuery,
  useGetClientsQuery,
  useDeleteClientMutation,

  // Onboarding hooks
  useUpdatePersonalInfoMutation,
  useUpdateProfileTypeMutation,
  useUpdateAgencyInfoMutation,
  useUpdateFreelancerInfoMutation,
  useUploadAgencyLogoMutation,
  useUploadFreelancerLogoMutation,
  useSelectInvoiceTemplateMutation,
  useCompleteOnboardingMutation,
} = api;
