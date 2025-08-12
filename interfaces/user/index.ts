import type { CompanyDetails } from "../company";

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
  onboardingStep: "account" | "company" | "complete"; // Track onboarding progress
}

// User before completing company setup
export interface UserAccount extends BaseUser {
  company: null;
  onboardingStep: "account" | "company";
}

// User with completed company setup
export interface UserWithCompany extends BaseUser {
  company: CompanyDetails;
  onboardingStep: "complete";
}

// Union type for all user states
export type User = UserAccount | UserWithCompany;

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
  onboardingStep: "account" | "company" | "complete";
}
