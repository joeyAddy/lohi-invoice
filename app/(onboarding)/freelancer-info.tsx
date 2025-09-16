import { FreelancerForm } from "@/components/ui";
import { store } from "@/lib/store";
import { loginSuccess } from "@/lib/store/slices/authSlice";
import { router } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/shared/header";
import Badge from "../../components/ui/badge";
import { CreateFreelancerRequest } from "../../interfaces/freelancer";
import { useOnboarding } from "../../lib/hooks/useOnboarding";

export default function FreelancerInfoScreen() {
  const { updateFreelancerInfo, isUpdatingFreelancerInfo } = useOnboarding();

  const handleSubmit = async (formData: CreateFreelancerRequest) => {
    // Temporary: Set up dummy authenticated state for UI testing
    setTimeout(() => {
      // Create dummy user with completed freelancer setup
      const dummyUser = {
        id: "dummy-user-123",
        firstName: "John",
        lastName: "Doe",
        email: "john@johndoedev.com",
        isEmailVerified: true,
        avatar: undefined,
        phone: "+1 (555) 123-4567",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        onboardingStep: "complete" as const,
        agency: null,
        freelancer: {
          id: "dummy-freelancer-456",
          professionalName: "John Doe",
          taxId: "123-45-6789",
          address: {
            street: "123 Creative Lane",
            city: "San Francisco",
            state: "CA",
            postalCode: "94102",
            country: "United States",
          },
          phone: "+1 (555) 123-4567",
          email: "john@johndoedev.com",
          website: "https://johndoedev.com",
          logoUrl: undefined,
          currency: "USD" as const,
          timezone: "America/Los_Angeles",
          profession: "Full Stack Developer",
          bio: "Passionate developer specializing in React, Node.js, and mobile app development with 5+ years of experience.",
          portfolioUrl: "https://portfolio.johndoedev.com",
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
        },
      };

      // Dispatch dummy login success to Redux store
      store.dispatch(
        loginSuccess({
          user: dummyUser,
          token: "dummy-jwt-token-for-testing",
          refreshToken: "dummy-refresh-token-for-testing",
        })
      );

      // Navigate to tabs
      router.push("/(tabs)" as any);
    }, 2000); // Wait 2 seconds before navigating

    try {
      await updateFreelancerInfo(formData);
    } catch {
      Alert.alert(
        "Error",
        "Failed to save freelancer information. Please try again."
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white p-4">
        <Header
          title="Profile Setup"
          leftIcon="arrow-back"
          onPressLeftIcon={() => router.back()}
        />

        <ScrollView
          className="flex-1 pt-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8">
            <Badge text="Step 3 of 3" />
            <Text className="text-2xl font-playfair-bold text-gray-900 mt-4 mb-2">
              Tell us about your business
            </Text>
            <Text className="text-gray-600 text-base leading-6 font-playfair-regular">
              Set up your business profile for professional invoicing.
            </Text>
          </View>

          <FreelancerForm
            onSubmit={handleSubmit}
            isLoading={isUpdatingFreelancerInfo}
            submitButtonText="Continue"
            showOptionalFields={false}
            readOnlyFields={[]}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
