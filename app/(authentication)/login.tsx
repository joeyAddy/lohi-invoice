import Button from "@/components/ui/button";
import {
  CheckboxInput,
  DefaultInput,
  PasswordInput,
} from "@/components/ui/inputs";
import { useAuth } from "@/lib";
import { validateLoginForm } from "@/lib/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { login, isLoading, error } = useAuth();

  // Real-time validation function
  const validateInputs = () => {
    const validation = validateLoginForm(email, password);

    setEmailError(validation.email.error || "");
    setPasswordError(validation.password.error || "");

    return validation.isFormValid;
  };

  // Handle input changes with validation
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (hasSubmitted) {
      // Re-validate if user has already submitted
      const emailValidation = validateLoginForm(value, password);
      setEmailError(emailValidation.email.error || "");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (hasSubmitted) {
      // Re-validate if user has already submitted
      const passwordValidation = validateLoginForm(email, value);
      setPasswordError(passwordValidation.password.error || "");
    }
  };

  const handleLogin = async () => {
    setHasSubmitted(true);

    // Validate inputs
    const isValid = validateInputs();

    if (!isValid) {
      return;
    }

    const result = await login({ email: email.trim(), password });

    if (result.success) {
      // Navigation will be handled by auth state changes
      console.log("Login successful");
    } else {
      Alert.alert("Login Failed", result.error || "Please try again");
    }
  };

  const handleNavigateToRegister = () => {
    router.push("/(authentication)/register");
  };

  const handleGoToForgotPassword = () => {
    router.push("/(authentication)/forgot-password");
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View className="w-full p-4">
        <Text className="text-h-4 text-center mb-m">Welcome back!</Text>
        <View className="mt-4 w-full">
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
          <PasswordInput
            placeholder="Enter your password"
            value={password}
            onChangeText={handlePasswordChange}
            error={passwordError}
          />
        </View>
        <View className="my-6 flex-row justify-between items-center">
          <CheckboxInput
            label="Remember me"
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
          <Pressable onPress={handleGoToForgotPassword}>
            <Text className="text-b-1 font-dm-sans-bold text-primary">
              Forgot your password?
            </Text>
          </Pressable>
        </View>
        {error && (
          <Text className="text-error-500 text-b-2 text-center mb-4">
            {error}
          </Text>
        )}
        <View className="w-full mt-2">
          <Button size="lg" onPress={handleLogin} isLoading={isLoading}>
            Login
          </Button>
        </View>
        <View className="flex-row gap-s my-8 w-full justify-center items-center">
          <View className="h-px flex-1 bg-primary-600" />
          <Text className="text-b-1 font-semibold text-primary">Or</Text>
          <View className="h-px flex-1 bg-primary-600" />
        </View>
        <Button
          variant="outline"
          size="lg"
          imageIcon={require("../../assets/images/google.png")}
        >
          Google
        </Button>

        <View className="mt-8 flex-row justify-center items-center">
          <Text className="text-b-1 text-primary">
            Don&apos;t have an account?{" "}
          </Text>
          <Pressable onPress={handleNavigateToRegister}>
            <Text className="text-b-1 font-dm-sans-bold text-primary">
              Create an account
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
