// Onboarding step interfaces
import { CreateAgencyRequest } from "../agency";
import { CreateFreelancerRequest } from "../freelancer";

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

// Freelancer Info Step - Use the comprehensive freelancer interface
export type { CreateFreelancerRequest as FreelancerInfoRequest } from "../freelancer";

// Agency Logo Upload Step
export interface AgencyLogoRequest {
  logo: string; // Base64 encoded image or file path
}

// Freelancer Logo Upload Step
export type { FreelancerLogoRequest } from "../freelancer";

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

// Combined onboarding completion for agency
export interface CompleteAgencyOnboardingRequest {
  personalInfo: PersonalInfoRequest;
  agencyInfo: CreateAgencyRequest;
  agencyLogo?: AgencyLogoRequest;
  invoiceTemplate: InvoiceTemplateRequest;
}

// Combined onboarding completion for freelancer
export interface CompleteFreelancerOnboardingRequest {
  personalInfo: PersonalInfoRequest;
  freelancerInfo: CreateFreelancerRequest;
  freelancerLogo?: { logo: string };
  invoiceTemplate: InvoiceTemplateRequest;
}

// Legacy combined onboarding completion (for backward compatibility)
export interface CompleteOnboardingRequest {
  personalInfo: PersonalInfoRequest;
  agencyInfo: CreateAgencyRequest;
  agencyLogo?: AgencyLogoRequest;
  invoiceTemplate: InvoiceTemplateRequest;
}
