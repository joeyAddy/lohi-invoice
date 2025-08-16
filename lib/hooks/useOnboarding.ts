import { useCallback } from "react";
import type {
  CompanyInfoRequest,
  CompanyLogoRequest,
  InvoiceTemplateRequest,
  PersonalInfoRequest,
  ProfileTypeRequest, // Add this import
} from "../../interfaces";
import {
  useCompleteOnboardingMutation,
  useSelectInvoiceTemplateMutation,
  useUpdateCompanyInfoMutation,
  useUpdatePersonalInfoMutation,
  useUpdateProfileTypeMutation,
  useUploadCompanyLogoMutation,
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
  const [updateCompanyInfoMutation, { isLoading: isUpdatingCompanyInfo }] =
    useUpdateCompanyInfoMutation();
  const [uploadCompanyLogoMutation, { isLoading: isUploadingLogo }] =
    useUploadCompanyLogoMutation();
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

  // Update company info
  const updateCompanyInfo = useCallback(
    async (data: CompanyInfoRequest) => {
      try {
        const result = await updateCompanyInfoMutation(data).unwrap();
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to update company info";
        return { success: false, error: errorMessage };
      }
    },
    [updateCompanyInfoMutation]
  );

  // Upload company logo
  const uploadCompanyLogo = useCallback(
    async (data: CompanyLogoRequest) => {
      try {
        const result = await uploadCompanyLogoMutation(data).unwrap();
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to upload company logo";
        return { success: false, error: errorMessage };
      }
    },
    [uploadCompanyLogoMutation]
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
    updateCompanyInfo,
    uploadCompanyLogo,
    selectInvoiceTemplate,
    completeOnboarding,

    // Loading states
    isUpdatingProfileType, // Add this loading state
    isUpdatingPersonalInfo,
    isUpdatingCompanyInfo,
    isUploadingLogo,
    isSelectingTemplate,
    isCompletingOnboarding,

    // Combined loading state
    isLoading:
      isUpdatingProfileType || // Include in combined loading
      isUpdatingPersonalInfo ||
      isUpdatingCompanyInfo ||
      isUploadingLogo ||
      isSelectingTemplate ||
      isCompletingOnboarding,
  };
};
