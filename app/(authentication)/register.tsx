import { Header } from "@/components/shared";
import Button from "@/components/ui/button";
import {
  CheckboxInput,
  DefaultInput,
  PasswordInput,
} from "@/components/ui/inputs";
import { useAuth } from "@/lib";
import { useSendOtpMutation } from "@/lib/api/rtkApi";
import { validateRegisterForm } from "@/lib/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { register, isLoading, error } = useAuth();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();

  // Real-time validation function
  const validateInputs = () => {
    const validation = validateRegisterForm(email, password, confirmPassword);

    setEmailError(validation.email.error || "");
    setPasswordError(validation.password.error || "");
    setConfirmPasswordError(validation.confirmPassword.error || "");

    return validation.isFormValid;
  };

  // Handle input changes with validation
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (hasSubmitted) {
      const emailValidation = validateRegisterForm(
        value,
        password,
        confirmPassword
      );
      setEmailError(emailValidation.email.error || "");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (hasSubmitted) {
      const passwordValidation = validateRegisterForm(
        email,
        value,
        confirmPassword
      );
      setPasswordError(passwordValidation.password.error || "");
      // Also revalidate confirm password if it's been entered
      if (confirmPassword) {
        const confirmValidation = validateRegisterForm(
          email,
          value,
          confirmPassword
        );
        setConfirmPasswordError(confirmValidation.confirmPassword.error || "");
      }
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (hasSubmitted) {
      const confirmValidation = validateRegisterForm(email, password, value);
      setConfirmPasswordError(confirmValidation.confirmPassword.error || "");
    }
  };

  const handleRegister = async () => {
    // Temporary: Navigate immediately for UI testing
    setTimeout(() => {
      router.push({
        pathname: "/(authentication)/otp-verification",
        params: {
          email: email.trim(),
          purpose: "email_verification",
        },
      });
    }, 2000); // Wait 2 seconds before navigating

    setHasSubmitted(true);

    // Validate inputs
    const isValid = validateInputs();

    if (!isValid) {
      return;
    }

    try {
      // Step 1: Register the user
      const result = await register({
        email: email.trim(),
        password,
      });

      if (result.success) {
        // Step 2: Send OTP for email verification
        await sendOtp({
          email: email.trim(),
          purpose: "email_verification",
        }).unwrap();

        // Step 3: Navigate to OTP verification
        router.push({
          pathname: "/(authentication)/otp-verification",
          params: {
            email: email.trim(),
            purpose: "email_verification",
          },
        });

        Alert.alert(
          "Registration Successful",
          `Please check your email (${email.trim()}) for the verification code.`
        );
      } else {
        Alert.alert("Registration Failed", result.error || "Please try again");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Registration failed. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleNavigateToLogin = () => {
    router.push("/(authentication)/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full p-4">
        {/* Header with back button */}
        <Header
          title="Sign up"
          leftIcon="arrow-back"
          onPressLeftIcon={handleGoBack}
          className="mb-8"
        />

        {/* Title */}
        <Text className="text-h-4 mb-m text-gray-900">Create an account</Text>

        {/* Form fields */}
        <View className="w-full space-y-6">
          <DefaultInput
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            error={emailError}
            leftIcon={
              <Ionicons name="mail-outline" size={20} color="#a4a4a4" />
            }
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-6"
          />

          <PasswordInput
            placeholder="Enter your password"
            value={password}
            onChangeText={handlePasswordChange}
            error={passwordError}
            isTheUserSettingANewPassword={true}
            className="mb-6"
          />

          <PasswordInput
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            error={confirmPasswordError}
          />
        </View>

        {/* Remember me checkbox */}
        <View className="my-6">
          <CheckboxInput
            label="Remember me"
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
        </View>

        {/* Error message */}
        {error && (
          <Text className="text-error-500 text-b-2 text-center mb-4">
            {error}
          </Text>
        )}

        {/* Continue button */}
        <View className="w-full mt-2">
          <Button
            size="lg"
            onPress={handleRegister}
            isLoading={isLoading || isSendingOtp}
          >
            Continue
          </Button>
        </View>

        {/* Divider */}
        <View className="flex-row gap-s my-8 w-full justify-center items-center">
          <View className="h-px flex-1 bg-primary-600" />
          <Text className="text-b-1 font-semibold text-primary">or</Text>
          <View className="h-px flex-1 bg-primary-600" />
        </View>

        {/* Google sign up button */}
        <Button
          variant="outline"
          size="lg"
          imageIcon={require("../../assets/images/google.png")}
        >
          Google
        </Button>
      </View>
      <View className="mt-4 flex-row justify-center items-center">
        <Text className="text-b-1 text-primary">Already have an account? </Text>
        <Pressable onPress={handleNavigateToLogin}>
          <Text className="text-b-1 font-dm-sans-bold text-primary">Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Register;
