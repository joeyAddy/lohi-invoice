import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./constants/endpoints";
import { authEndpoints } from "./endpoints/auth";
import { companyEndpoints } from "./endpoints/company";
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
  tagTypes: ["User", "Company", "Invoice"], // Add more tag types as needed
  endpoints: (builder) => ({
    // Combine all endpoints
    ...authEndpoints(builder),
    ...userEndpoints(builder),
    ...companyEndpoints(builder),
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

  // Company hooks
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useGetCompanyQuery,
  useDeleteCompanyMutation,

  // Onboarding hooks
  useUpdatePersonalInfoMutation,
  useUpdateProfileTypeMutation,
  useUpdateCompanyInfoMutation,
  useUploadCompanyLogoMutation,
  useSelectInvoiceTemplateMutation,
  useCompleteOnboardingMutation,
} = api;
