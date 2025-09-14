import type { AgencyDetails } from "../agency";
import type { FreelancerDetails } from "../freelancer";

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
  onboardingStep: "account" | "agency" | "freelancer" | "complete"; // Track onboarding progress
}

// User before completing setup
export interface UserAccount extends BaseUser {
  agency: null;
  freelancer: null;
  onboardingStep: "account" | "agency" | "freelancer";
}

// User with completed agency setup
export interface AgencyUser extends BaseUser {
  agency: AgencyDetails;
  freelancer: null;
  onboardingStep: "complete";
}

// User with completed freelancer setup
export interface FreelancerUser extends BaseUser {
  agency: null;
  freelancer: FreelancerDetails;
  onboardingStep: "complete";
}

// Union type for all user states
export type User = UserAccount | AgencyUser | FreelancerUser;

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
  onboardingStep: "account" | "agency" | "freelancer" | "complete";
}
