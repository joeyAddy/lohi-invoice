// Onboarding step interfaces
import { CreateCompanyRequest } from "../company";

// Personal Info Step
export interface PersonalInfoRequest {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

// Company Info Step - Use the comprehensive company interface
export { CreateCompanyRequest as CompanyInfoRequest } from "../company";

// Company Logo Upload Step
export interface CompanyLogoRequest {
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
  companyInfo: CreateCompanyRequest;
  companyLogo?: CompanyLogoRequest;
  invoiceTemplate: InvoiceTemplateRequest;
}
