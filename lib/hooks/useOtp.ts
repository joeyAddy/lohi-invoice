import type {
  ResendOtpRequest,
  SendOtpRequest,
  VerifyOtpRequest,
} from "@/interfaces";
import {
  useResendOtpMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/lib/api/rtkApi";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export interface UseOtpProps {
  email: string;
  purpose: "email_verification" | "password_reset" | "login_verification";
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
}

export const useOtp = ({ email, purpose, onSuccess, onError }: UseOtpProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // RTK Query mutations
  const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  // Send initial OTP
  const sendInitialOtp = useCallback(async () => {
    try {
      const sendData: SendOtpRequest = {
        email,
        purpose,
      };

      const result = await sendOtp(sendData).unwrap();
      setTimeLeft(result.canResendIn || 60);
      setCanResend(false);

      return { success: true, data: result };
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to send OTP";
      if (onError) onError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [email, purpose, sendOtp, onError]);

  // Verify OTP
  const verifyOtpCode = useCallback(
    async (otpCode: string) => {
      try {
        const verifyData: VerifyOtpRequest = {
          email,
          otp: otpCode,
          purpose,
        };

        const result = await verifyOtp(verifyData).unwrap();

        if (result.verified) {
          if (onSuccess) onSuccess(result);
          return { success: true, data: result };
        } else {
          const errorMessage = "Invalid OTP code. Please try again.";
          if (onError) onError(errorMessage);
          return { success: false, error: errorMessage };
        }
      } catch (error: any) {
        const errorMessage = error?.data?.message || "OTP verification failed";
        if (onError) onError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [email, purpose, verifyOtp, onSuccess, onError]
  );

  // Resend OTP
  const resendOtpCode = useCallback(async () => {
    try {
      const resendData: ResendOtpRequest = {
        email,
        purpose,
      };

      const result = await resendOtp(resendData).unwrap();

      setTimeLeft(result.canResendIn || 60);
      setCanResend(false);

      return { success: true, data: result };
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to resend OTP";
      if (onError) onError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [email, purpose, resendOtp, onError]);

  // Navigate to OTP verification screen
  const navigateToOtpVerification = useCallback(() => {
    router.push({
      pathname: "/(authentication)/otp-verification",
      params: { email, purpose },
    });
  }, [email, purpose]);

  // Handle OTP success based on purpose
  const handleOtpSuccess = useCallback(
    (result: any) => {
      switch (purpose) {
        case "email_verification":
          Alert.alert("Success", "Email verified successfully!", [
            { text: "OK", onPress: () => router.replace("/(tabs)") },
          ]);
          break;
        case "password_reset":
          router.replace({
            pathname: "/(authentication)/login",
            params: { token: result.token, email },
          });
          break;
        case "login_verification":
          router.replace("/(tabs)");
          break;
        default:
          router.replace("/(tabs)");
      }
    },
    [purpose, email]
  );

  return {
    // State
    timeLeft,
    canResend,
    isLoading: isSending || isVerifying || isResending,
    isSending,
    isVerifying,
    isResending,

    // Actions
    sendInitialOtp,
    verifyOtpCode,
    resendOtpCode,
    navigateToOtpVerification,
    handleOtpSuccess,

    // Setters
    setTimeLeft,
    setCanResend,
  };
};

// Utility function to mask email
export const maskEmail = (email: string): string => {
  const [username, domain] = email.split("@");
  if (username.length <= 3) return email;

  const maskedUsername = username.slice(0, 3) + "*".repeat(username.length - 3);
  return `${maskedUsername}@${domain}`;
};

// Utility function to validate OTP
export const validateOtp = (
  otp: string[]
): { isValid: boolean; error?: string } => {
  if (otp.some((digit) => digit === "")) {
    return {
      isValid: false,
      error: "Please enter the complete 6-digit OTP code",
    };
  }

  if (otp.some((digit) => !/^\d$/.test(digit))) {
    return { isValid: false, error: "OTP should contain only numbers" };
  }

  return { isValid: true };
};
