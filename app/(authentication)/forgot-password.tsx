import { Header } from "@/components/shared";
import Button from "@/components/ui/button";
import { DefaultInput } from "@/components/ui/inputs";
import { useAuth, validateEmail } from "@/lib";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  // State to hold the email input value and any validation error.
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { sendPasswordResetEmail, isLoading } = useAuth();

  // Handles real-time validation as the user types, if they have already submitted once.
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (hasSubmitted) {
      const error = validateEmail(value);
      setEmailError(error.error ?? "");
    }
  };

  // Handles the submission of the form.
  const handleSendResetLink = async () => {
    setTimeout(() => {
      router.push({
        pathname: "/(authentication)/otp-verification",
        params: {
          email: email.trim(),
          purpose: "password_reset",
        },
      });
    }, 2000);
    // Set submission state to trigger real-time validation.
    setHasSubmitted(true);

    // Validate the email before proceeding.
    const error = validateEmail(email);
    setEmailError(error.error ?? "");

    if (error) {
      return;
    }

    try {
      // Call the password reset function from the useAuth hook.
      // The `trim()` method removes any leading or trailing whitespace.
      const result = await sendPasswordResetEmail(email.trim());

      if (result.success) {
        Alert.alert(
          "Success",
          "A password reset link has been sent to your email address."
        );
        // Navigate back to the login screen after successful submission.
        router.replace("/(authentication)/login");
      } else {
        // Show an alert if there was an error sending the link.
        Alert.alert("Reset Failed", result.error || "Please try again.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Reset Failed",
        "An unexpected error occurred. Please try again."
      );
    }
  };

  // Function to navigate back to the login screen.
  const handleNavigateBack = () => {
    router.replace("/(authentication)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full p-4 flex-1">
        {/* Header with back button */}
        <Header
          leftIcon="arrow-back"
          onPressLeftIcon={handleNavigateBack}
          className="mb-8"
        />
        {/* Title */}
        <Text className="text-h-5 mb-s text-gray-900">Forgot Password</Text>
        <Text className="text-b-2 text-primary-600 mb-s">
          Quickly reset password by verifying your the email address used to set
          up this account.
        </Text>

        {/* Email input field */}
        <View className="w-full">
          <DefaultInput
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            error={emailError}
            leftIcon={
              <Ionicons name="mail-outline" size={20} color="#a4a4a4" />
            }
            className="mb-6"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Updated button to send the reset link */}
        <View className="w-full mt-auto mb-xs">
          <Button size="lg" onPress={handleSendResetLink} isLoading={isLoading}>
            Submit
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
