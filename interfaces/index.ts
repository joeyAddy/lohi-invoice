// Export all interface types from their respective modules

// User types
export type {
  ChangePasswordRequest,
  UpdateOnboardingStepRequest,
  UpdateUserProfileRequest,
  User,
  UserAccount,
  UserWithCompany,
} from "./user";

// Company types
export type {
  CompanyDetails,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "./company";

// Auth types
export type {
  AuthResponse,
  AuthTokens,
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenResponse,
  RegisterRequest,
  ResendOtpRequest,
  ResendOtpResponse,
  ResetPasswordRequest,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "./auth";

// Onboarding types
export type {
  CompanyInfoRequest,
  CompanyLogoRequest,
  CompleteOnboardingRequest,
  InvoiceTemplateRequest,
  OnboardingStepResponse,
  PersonalInfoRequest,
  ProfileTypeRequest,
} from "./onboarding";

// API types
export type { ApiError, ApiResponse, PaginatedResponse } from "./api";
