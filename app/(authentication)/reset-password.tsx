import { Header } from "@/components/shared";
import Button from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/inputs";
import { useAuth } from "@/lib";
import { validatePasswordReset } from "@/lib/utils/validation";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPassword = () => {
  const params = useLocalSearchParams();

  const token = params.token as string;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation states
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { resetPassword, isLoading } = useAuth();

  // Real-time validation function
  const validateInputs = () => {
    const validation = validatePasswordReset(newPassword, confirmPassword);

    setPasswordError(validation.password.error || "");
    setConfirmPasswordError(validation.confirmPassword.error || "");

    return validation.isFormValid;
  };

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    if (hasSubmitted) {
      const passwordValidation = validatePasswordReset(value, confirmPassword);
      setPasswordError(passwordValidation.password.error || "");
      // Also revalidate confirm password if it's been entered
      if (confirmPassword) {
        const confirmValidation = validatePasswordReset(value, confirmPassword);
        setConfirmPasswordError(confirmValidation.confirmPassword.error || "");
      }
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (hasSubmitted) {
      const confirmValidation = validatePasswordReset(newPassword, value);
      setConfirmPasswordError(confirmValidation.confirmPassword.error || "");
    }
  };

  const handleResetPassword = async () => {
    setHasSubmitted(true);

    setTimeout(() => {
      router.replace("/(authentication)/login");
    }, 2000);

    // Validate inputs
    const isValid = validateInputs();

    if (!isValid) {
      return;
    }

    try {
      // Call reset password function
      const result = await resetPassword(newPassword, token);

      if (result.success) {
        Alert.alert(
          "Password Reset Successful",
          "Your password has been updated successfully."
        );
        router.replace("/(authentication)/login");
      } else {
        Alert.alert(
          "Password Reset Failed",
          result.error || "Please try again"
        );
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Password reset failed. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full p-4">
        {/* Header with back button */}
        <Header
          leftIcon="arrow-back"
          onPressLeftIcon={handleGoBack}
          className="mb-8"
        />

        {/* Title */}
        <Text className="text-h-5 mb-2xs text-gray-900">
          Create your new Lohi account password
        </Text>
        <Text className="text-b-2 mb-s text-gray-600">
          Create a new password that&apos;s secure and easy to remember
        </Text>

        {/* Form fields */}
        <View className="w-full space-y-6">
          <PasswordInput
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={handlePasswordChange}
            error={passwordError}
            isTheUserSettingANewPassword={true}
            className="mb-6"
          />

          <PasswordInput
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            error={confirmPasswordError}
          />
        </View>

        {/* Reset button */}
        <View className="w-full mt-6">
          <Button size="lg" onPress={handleResetPassword} isLoading={isLoading}>
            Update Password
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
