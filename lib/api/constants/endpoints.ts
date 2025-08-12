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
  COMPANY_INFO: "/onboarding/company-info",
  COMPANY_LOGO: "/onboarding/company-logo",
  INVOICE_TEMPLATE: "/onboarding/invoice-template",
  COMPLETE_ONBOARDING: "/onboarding/complete",

  // Company endpoints
  COMPANIES: "/companies",
  COMPANY_BY_ID: (id: string) => `/companies/${id}`,

  // Invoice endpoints (for future use)
  INVOICES: "/invoices",
  INVOICE_BY_ID: (id: string) => `/invoices/${id}`,
} as const;
