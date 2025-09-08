import type { AgencyDetails } from "../agency";

// Base user interface
interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  onboardingStep: "account" | "agency" | "complete"; // Track onboarding progress
}

// User before completing agency setup
export interface UserAccount extends BaseUser {
  agency: null;
  onboardingStep: "account" | "agency";
}

// User with completed agency setup
export interface UserWithAgency extends BaseUser {
  agency: AgencyDetails;
  onboardingStep: "complete";
}

// Union type for all user states
export type User = UserAccount | UserWithAgency;

// Request types for user operations
export interface UpdateUserProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Onboarding step update
export interface UpdateOnboardingStepRequest {
  onboardingStep: "account" | "agency" | "complete";
}
