import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type {
  CompanyInfoRequest,
  CompanyLogoRequest,
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
  updateCompanyInfo: builder.mutation<
    OnboardingStepResponse,
    CompanyInfoRequest
  >({
    query: (data) => ({
      url: ENDPOINTS.COMPANY_INFO,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User", "Company"],
  }),

  uploadCompanyLogo: builder.mutation<
    OnboardingStepResponse,
    CompanyLogoRequest
  >({
    query: (data) => ({
      url: ENDPOINTS.COMPANY_LOGO,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User", "Company"],
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
