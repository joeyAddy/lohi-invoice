import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import type {
  AuthResponse,
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
} from "../../../interfaces";
import { ENDPOINTS } from "../constants/endpoints";

export const authEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  login: builder.mutation<AuthResponse, LoginRequest>({
    query: (credentials) => ({
      url: ENDPOINTS.LOGIN,
      method: "POST",
      body: credentials,
    }),
    invalidatesTags: ["User"],
  }),

  register: builder.mutation<AuthResponse, RegisterRequest>({
    query: (userData) => ({
      url: ENDPOINTS.REGISTER,
      method: "POST",
      body: userData,
    }),
    invalidatesTags: ["User"],
  }),

  logout: builder.mutation<void, void>({
    query: () => ({
      url: ENDPOINTS.LOGOUT,
      method: "POST",
    }),
    invalidatesTags: ["User"],
  }),

  refreshToken: builder.mutation<RefreshTokenResponse, void>({
    query: () => ({
      url: ENDPOINTS.REFRESH,
      method: "POST",
    }),
  }),

  forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
    query: (data) => ({
      url: ENDPOINTS.FORGOT_PASSWORD,
      method: "POST",
      body: data,
    }),
  }),

  resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
    query: (data) => ({
      url: ENDPOINTS.RESET_PASSWORD,
      method: "POST",
      body: data,
    }),
  }),

  // OTP endpoints
  sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
    query: (data) => ({
      url: ENDPOINTS.SEND_OTP,
      method: "POST",
      body: data,
    }),
  }),

  verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
    query: (data) => ({
      url: ENDPOINTS.VERIFY_OTP,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["User"],
  }),

  resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
    query: (data) => ({
      url: ENDPOINTS.RESEND_OTP,
      method: "POST",
      body: data,
    }),
  }),
});
