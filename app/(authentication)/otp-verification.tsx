import { Header } from "@/components/shared";
import OtpInput, { type OtpInputRef } from "@/components/ui/inputs/otp-input";
import type { ResendOtpRequest, VerifyOtpRequest } from "@/interfaces";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/lib/api/rtkApi";
import { maskEmail, validateOtp } from "@/lib/hooks/useOtp";
import type { Href } from "expo-router";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const OtpVerification = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const otpInputRef = useRef<OtpInputRef>(null);

  // Get email and purpose from route params
  const email = params.email as string;
  const purpose =
    (params.purpose as
      | "email_verification"
      | "password_reset"
      | "login_verification") || "email_verification";

  // State for OTP
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // RTK Query mutations
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  // Ensure keyboard opens when screen is focused
  useFocusEffect(
    useCallback(() => {
      // Small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        if (otpInputRef.current) {
          // Force focus on the OTP input to ensure keyboard opens
          otpInputRef.current.focus?.();
        }
      }, 100);

      return () => clearTimeout(timer);
    }, [])
  );

  // Timer for resend countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (timeLeft > 0 && !canResend) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeLeft, canResend]);

  // Handle OTP verification
  const handleVerifyOtp = useCallback(async () => {
    // For testing UI routing - navigate to personal info page
    setTimeout(() => {
      router.replace("/(onboarding)/personal-info" as Href);
    }, 1000);

    const validation = validateOtp(otp);

    if (!validation.isValid) {
      Alert.alert("Error", validation.error);
      return;
    }

    const otpCode = otp.join("");

    try {
      const verifyData: VerifyOtpRequest = {
        email,
        otp: otpCode,
        purpose,
      };

      const result = await verifyOtp(verifyData).unwrap();

      if (result.verified) {
        Alert.alert(
          "Success",
          result.message || "Email verified successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate based on purpose
                if (purpose === "email_verification") {
                  // Navigate to onboarding after email verification
                  router.replace("/(onboarding)/personal-info" as Href);
                } else if (purpose === "password_reset") {
                  // Navigate to login for password reset
                  router.replace("/(authentication)/login" as Href);
                } else {
                  // Default navigation to home
                  router.replace("/(tabs)/" as Href);
                }
              },
            },
          ]
        );
      } else {
        Alert.alert("Error", "Invalid OTP code. Please try again.");
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "OTP verification failed";
      Alert.alert("Error", errorMessage);
      setOtp(["", "", "", "", "", ""]);
    }
  }, [otp, email, purpose, verifyOtp, router]);

  // Auto-verify when OTP is complete
  useEffect(() => {
    const isOtpComplete = otp.every((digit) => digit !== "");
    if (isOtpComplete && !isVerifying) {
      handleVerifyOtp();
    }
  }, [otp, isVerifying, handleVerifyOtp]);

  // Handle resend OTP
  const handleResendOtp = async () => {
    try {
      const resendData: ResendOtpRequest = {
        email,
        purpose,
      };

      const result = await resendOtp(resendData).unwrap();

      setTimeLeft(result.canResendIn || 60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);

      Alert.alert("Success", result.message || "OTP sent successfully");
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to resend OTP";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 px-6 pt-16">
        {/* Header */}
        <View className="mb-8">
          <Header
            leftIcon="arrow-back"
            onPressLeftIcon={handleGoBack}
            className="mb-8"
          />
          <Text className="text-h-4 font-playfair-bold text-gray-900 mb-4">
            Enter OTP code
          </Text>

          <Text className="text-b-1 text-gray-600 leading-6">
            A one time OTP code has been sent to your email ({maskEmail(email)}
            ). Enter the code below to verify your account.
          </Text>
        </View>

        {/* OTP Input */}
        <View className="mb-4">
          <OtpInput
            ref={otpInputRef}
            otp={otp}
            setOtp={setOtp}
            autoFocus={true}
            disabled={isVerifying}
            className="mb-6"
          />
        </View>

        {/* Resend Section */}
        <View className="items-center">
          {!canResend ? (
            <Text className="text-b-2 text-gray-600 mb-4">
              You can resend code in {timeLeft} seconds
            </Text>
          ) : (
            <Text className="text-b-2 text-gray-600 mb-4">
              Didn&apos;t receive the code?
            </Text>
          )}

          <TouchableOpacity
            onPress={handleResendOtp}
            disabled={!canResend || isResending}
            className="py-2"
          >
            {isResending ? (
              <ActivityIndicator size="small" color="#2563EB" />
            ) : (
              <Text
                className={`text-b-1 ${
                  canResend ? "text-primary-600" : "text-gray-400"
                }`}
              >
                Resend code
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;
