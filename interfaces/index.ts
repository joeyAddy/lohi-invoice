// Export all interface types from their respective modules

// User types
export type {
  ChangePasswordRequest,
  UpdateOnboardingStepRequest,
  UpdateUserProfileRequest,
  User,
  UserAccount,
  UserWithAgency,
} from "./user";

// Agency types
export type {
  AgencyDetails,
  CreateAgencyRequest,
  UpdateAgencyRequest,
} from "./agency";

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
  AgencyInfoRequest,
  AgencyLogoRequest,
  CompleteOnboardingRequest,
  InvoiceTemplateRequest,
  OnboardingStepResponse,
  PersonalInfoRequest,
  ProfileTypeRequest,
} from "./onboarding";

// API types
export type { ApiError, ApiResponse, PaginatedResponse } from "./api";
