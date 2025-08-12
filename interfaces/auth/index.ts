import type { User } from "../user";

// Authentication request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// OTP verification request types
export interface SendOtpRequest {
  email: string;
  purpose: "email_verification" | "password_reset" | "login_verification";
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  purpose: "email_verification" | "password_reset" | "login_verification";
}

export interface ResendOtpRequest {
  email: string;
  purpose: "email_verification" | "password_reset" | "login_verification";
}

// Authentication response types
export interface AuthTokens {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// Refresh token response
export interface RefreshTokenResponse {
  access: {
    token: string;
    expires: string;
  };
}

// OTP verification response types
export interface SendOtpResponse {
  message: string;
  expiresIn: number; // seconds until OTP expires
  canResendIn?: number; // seconds until can resend OTP
}

export interface VerifyOtpResponse {
  message: string;
  verified: boolean;
  token?: string; // verification token for subsequent operations
}

export interface ResendOtpResponse {
  message: string;
  expiresIn: number; // seconds until new OTP expires
  canResendIn: number; // seconds until can resend again
}
