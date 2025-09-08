// Onboarding step interfaces
import { CreateAgencyRequest } from "../agency";

// Personal Info Step
export interface PersonalInfoRequest {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

// Profile Type Step
export interface ProfileTypeRequest {
  profileType: "freelancer" | "agency";
}

// Agency Info Step - Use the comprehensive agency interface
export { CreateAgencyRequest as AgencyInfoRequest } from "../agency";

// Agency Logo Upload Step
export interface AgencyLogoRequest {
  logo: string; // Base64 encoded image or file path
}

// Invoice Template Selection Step
export interface InvoiceTemplateRequest {
  templateId: string;
  templateName: string;
}

// Response types
export interface OnboardingStepResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Combined onboarding completion
export interface CompleteOnboardingRequest {
  personalInfo: PersonalInfoRequest;
  agencyInfo: CreateAgencyRequest;
  agencyLogo?: AgencyLogoRequest;
  invoiceTemplate: InvoiceTemplateRequest;
}
