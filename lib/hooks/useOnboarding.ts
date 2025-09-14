import { useCallback } from "react";
import type {
  AgencyInfoRequest,
  AgencyLogoRequest,
  FreelancerInfoRequest,
  FreelancerLogoRequest,
  InvoiceTemplateRequest,
  PersonalInfoRequest,
  ProfileTypeRequest, // Add this import
} from "../../interfaces";
import {
  useCompleteOnboardingMutation,
  useSelectInvoiceTemplateMutation,
  useUpdateAgencyInfoMutation,
  useUpdateFreelancerInfoMutation,
  useUpdatePersonalInfoMutation,
  useUpdateProfileTypeMutation,
  useUploadAgencyLogoMutation,
  useUploadFreelancerLogoMutation,
} from "../api/rtkApi";
import { selectUser } from "../store/slices/authSlice";
import { useAppSelector } from "./redux";

export const useOnboarding = () => {
  const user = useAppSelector(selectUser);

  // RTK Query mutations
  const [updatePersonalInfoMutation, { isLoading: isUpdatingPersonalInfo }] =
    useUpdatePersonalInfoMutation();
  const [updateProfileTypeMutation, { isLoading: isUpdatingProfileType }] =
    useUpdateProfileTypeMutation();
  const [updateAgencyInfoMutation, { isLoading: isUpdatingAgencyInfo }] =
    useUpdateAgencyInfoMutation();
  const [
    updateFreelancerInfoMutation,
    { isLoading: isUpdatingFreelancerInfo },
  ] = useUpdateFreelancerInfoMutation();
  const [uploadAgencyLogoMutation, { isLoading: isUploadingAgencyLogo }] =
    useUploadAgencyLogoMutation();
  const [
    uploadFreelancerLogoMutation,
    { isLoading: isUploadingFreelancerLogo },
  ] = useUploadFreelancerLogoMutation();
  const [selectInvoiceTemplateMutation, { isLoading: isSelectingTemplate }] =
    useSelectInvoiceTemplateMutation();
  const [completeOnboardingMutation, { isLoading: isCompletingOnboarding }] =
    useCompleteOnboardingMutation();

  // Update profile type
  const updateProfileType = useCallback(
    async (data: ProfileTypeRequest) => {
      try {
        const result = await updateProfileTypeMutation(data).unwrap();
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to update profile type";
        return { success: false, error: errorMessage };
      }
    },
    [updateProfileTypeMutation]
  );

  // Update personal info
  const updatePersonalInfo = useCallback(
    async (data: PersonalInfoRequest) => {
      try {
        const result = await updatePersonalInfoMutation(data).unwrap();
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to update personal info";
        return { success: false, error: errorMessage };
      }
    },
    [updatePersonalInfoMutation]
  );

  // Update agency info
  const updateAgencyInfo = useCallback(
    async (data: AgencyInfoRequest) => {
      try {
        const result = await updateAgencyInfoMutation(data).unwrap();
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to update agency info";
        return { success: false, error: errorMessage };
      }
    },
    [updateAgencyInfoMutation]
  );

  // Update freelancer info
  const updateFreelancerInfo = useCallback(
    async (data: FreelancerInfoRequest) => {
      try {
        const result = await updateFreelancerInfoMutation(data).unwrap();
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to update freelancer info";
        return { success: false, error: errorMessage };
      }
    },
    [updateFreelancerInfoMutation]
  );

  // Upload agency logo
  const uploadAgencyLogo = useCallback(
    async (data: AgencyLogoRequest) => {
      try {
        const result = await uploadAgencyLogoMutation(data).unwrap();
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to upload agency logo";
        return { success: false, error: errorMessage };
      }
    },
    [uploadAgencyLogoMutation]
  );

  // Upload freelancer logo
  const uploadFreelancerLogo = useCallback(
    async (data: FreelancerLogoRequest) => {
      try {
        const result = await uploadFreelancerLogoMutation(data).unwrap();
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to upload freelancer logo";
        return { success: false, error: errorMessage };
      }
    },
    [uploadFreelancerLogoMutation]
  );

  // Select invoice template
  const selectInvoiceTemplate = useCallback(
    async (data: InvoiceTemplateRequest) => {
      try {
        const result = await selectInvoiceTemplateMutation(data).unwrap();
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to select invoice template";
        return { success: false, error: errorMessage };
      }
    },
    [selectInvoiceTemplateMutation]
  );

  // Complete onboarding
  const completeOnboarding = useCallback(async () => {
    try {
      const result = await completeOnboardingMutation().unwrap();
      return { success: true, data: result };
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to complete onboarding";
      return { success: false, error: errorMessage };
    }
  }, [completeOnboardingMutation]);

  // Helper properties
  const needsOnboarding = user?.onboardingStep !== "complete";
  const currentStep = user?.onboardingStep || "account";

  return {
    // State
    user,
    currentStep,
    needsOnboarding,

    // Functions
    updateProfileType, // Add this to returned functions
    updatePersonalInfo,
    updateAgencyInfo,
    updateFreelancerInfo,
    uploadAgencyLogo,
    uploadFreelancerLogo,
    selectInvoiceTemplate,
    completeOnboarding,

    // Loading states
    isUpdatingProfileType, // Add this loading state
    isUpdatingPersonalInfo,
    isUpdatingAgencyInfo,
    isUpdatingFreelancerInfo,
    isUploadingAgencyLogo,
    isUploadingFreelancerLogo,
    isSelectingTemplate,
    isCompletingOnboarding,

    // Combined loading state
    isLoading:
      isUpdatingProfileType || // Include in combined loading
      isUpdatingPersonalInfo ||
      isUpdatingAgencyInfo ||
      isUpdatingFreelancerInfo ||
      isUploadingAgencyLogo ||
      isUploadingFreelancerLogo ||
      isSelectingTemplate ||
      isCompletingOnboarding,
  };
};
