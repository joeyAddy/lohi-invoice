export const API_BASE_URL = "https://api.lohi-invoice.com/v1";

// API Endpoints
export const ENDPOINTS = {
  // Auth endpoints
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",

  // OTP endpoints
  SEND_OTP: "/auth/send-otp",
  VERIFY_OTP: "/auth/verify-otp",
  RESEND_OTP: "/auth/resend-otp",

  // User endpoints
  USER_PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/profile",
  CHANGE_PASSWORD: "/user/change-password",
  UPDATE_ONBOARDING: "/user/onboarding",

  // Onboarding endpoints
  PERSONAL_INFO: "/onboarding/personal-info",
  COMPANY_INFO: "/onboarding/agency-info",
  COMPANY_LOGO: "/onboarding/agency-logo",
  FREELANCER_INFO: "/onboarding/freelancer-info",
  FREELANCER_LOGO: "/onboarding/freelancer-logo",
  INVOICE_TEMPLATE: "/onboarding/invoice-template",
  COMPLETE_ONBOARDING: "/onboarding/complete",
  PROFILE_TYPE: "/onboarding/profile-type",

  // Agency endpoints
  COMPANIES: "/companies",
  COMPANY_BY_ID: (id: string) => `/companies/${id}`,

  // Freelancer endpoints
  FREELANCERS: "/freelancers",
  FREELANCER_BY_ID: (id: string) => `/freelancers/${id}`,

  // Invoice endpoints (for future use)
  INVOICES: "/invoices",
  INVOICE_BY_ID: (id: string) => `/invoices/${id}`,
} as const;
