import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type {
  AgencyInfoRequest,
  AgencyLogoRequest,
  FreelancerInfoRequest,
  FreelancerLogoRequest,
  InvoiceTemplateRequest,
  OnboardingStepResponse,
  PersonalInfoRequest,
  ProfileTypeRequest,
} from "../../../interfaces";
import { ENDPOINTS } from "../constants/endpoints";

export const onboardingEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  updatePersonalInfo: builder.mutation<
    OnboardingStepResponse,
    PersonalInfoRequest
  >({
    query: (data) => ({
      url: ENDPOINTS.PERSONAL_INFO,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User"],
  }),
  updateProfileType: builder.mutation<
    OnboardingStepResponse,
    ProfileTypeRequest
  >({
    query: (data) => ({
      url: ENDPOINTS.PROFILE_TYPE, // Make sure to add this to your ENDPOINTS constants
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User"],
  }),
  updateAgencyInfo: builder.mutation<OnboardingStepResponse, AgencyInfoRequest>(
    {
      query: (data) => ({
        url: ENDPOINTS.COMPANY_INFO,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Agency"],
    }
  ),

  updateFreelancerInfo: builder.mutation<
    OnboardingStepResponse,
    FreelancerInfoRequest
  >({
    query: (data) => ({
      url: ENDPOINTS.FREELANCER_INFO,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User", "Freelancer"],
  }),

  uploadAgencyLogo: builder.mutation<OnboardingStepResponse, AgencyLogoRequest>(
    {
      query: (data) => ({
        url: ENDPOINTS.COMPANY_LOGO,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Agency"],
    }
  ),

  uploadFreelancerLogo: builder.mutation<
    OnboardingStepResponse,
    FreelancerLogoRequest
  >({
    query: (data) => ({
      url: ENDPOINTS.FREELANCER_LOGO,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User", "Freelancer"],
  }),

  selectInvoiceTemplate: builder.mutation<
    OnboardingStepResponse,
    InvoiceTemplateRequest
  >({
    query: (data) => ({
      url: ENDPOINTS.INVOICE_TEMPLATE,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User"],
  }),

  completeOnboarding: builder.mutation<OnboardingStepResponse, void>({
    query: () => ({
      url: ENDPOINTS.COMPLETE_ONBOARDING,
      method: "POST",
    }),
    invalidatesTags: ["User"],
  }),
});
