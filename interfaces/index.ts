// Export all interface types from their respective modules

// User types
export type {
  AgencyUser,
  ChangePasswordRequest,
  FreelancerUser,
  UpdateOnboardingStepRequest,
  UpdateUserProfileRequest,
  User,
  UserAccount,
} from "./user";

// Agency types
export type {
  AgencyDetails,
  CreateAgencyRequest,
  UpdateAgencyRequest,
} from "./agency";

// Freelancer types
export type {
  CreateFreelancerRequest,
  FreelancerDetails,
  UpdateFreelancerRequest,
} from "./freelancer";

// Client types
export type {
  ClientDetails,
  ClientListResponse,
  CreateClientRequest,
  UpdateClientRequest,
} from "./clients";

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
  CompleteAgencyOnboardingRequest,
  CompleteFreelancerOnboardingRequest,
  CompleteOnboardingRequest,
  FreelancerInfoRequest,
  FreelancerLogoRequest,
  InvoiceTemplateRequest,
  OnboardingStepResponse,
  PersonalInfoRequest,
  ProfileTypeRequest,
} from "./onboarding";

// API types
export type { ApiError, ApiResponse, PaginatedResponse } from "./api";
