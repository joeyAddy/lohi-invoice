import { useCallback } from "react";
import type {
  CompanyInfoRequest,
  CompanyLogoRequest,
  InvoiceTemplateRequest,
  PersonalInfoRequest,
} from "../../interfaces";
import {
  useCompleteOnboardingMutation,
  useSelectInvoiceTemplateMutation,
  useUpdateCompanyInfoMutation,
  useUpdatePersonalInfoMutation,
  useUploadCompanyLogoMutation,
} from "../api/rtkApi";
import { selectUser } from "../store/slices/authSlice";
import { useAppSelector } from "./redux";

export const useOnboarding = () => {
  const user = useAppSelector(selectUser);

  // RTK Query mutations
  const [updatePersonalInfoMutation, { isLoading: isUpdatingPersonalInfo }] =
    useUpdatePersonalInfoMutation();
  const [updateCompanyInfoMutation, { isLoading: isUpdatingCompanyInfo }] =
    useUpdateCompanyInfoMutation();
  const [uploadCompanyLogoMutation, { isLoading: isUploadingLogo }] =
    useUploadCompanyLogoMutation();
  const [selectInvoiceTemplateMutation, { isLoading: isSelectingTemplate }] =
    useSelectInvoiceTemplateMutation();
  const [completeOnboardingMutation, { isLoading: isCompletingOnboarding }] =
    useCompleteOnboardingMutation();

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
    updatePersonalInfo,
    updateCompanyInfo,
    uploadCompanyLogo,
    selectInvoiceTemplate,
    completeOnboarding,

    // Loading states
    isUpdatingPersonalInfo,
    isUpdatingCompanyInfo,
    isUploadingLogo,
    isSelectingTemplate,
    isCompletingOnboarding,

    // Combined loading state
    isLoading:
      isUpdatingPersonalInfo ||
      isUpdatingCompanyInfo ||
      isUploadingLogo ||
      isSelectingTemplate ||
      isCompletingOnboarding,
  };
};
