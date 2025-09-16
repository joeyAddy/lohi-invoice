import { AgencyForm } from "@/components/ui";
import { store } from "@/lib/store";
import { loginSuccess } from "@/lib/store/slices/authSlice";
import { router } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/shared/header";
import Badge from "../../components/ui/badge";
import { CreateAgencyRequest } from "../../interfaces/agency";
import { useOnboarding } from "../../lib/hooks/useOnboarding";

export default function AgencyInfoScreen() {
  const { updateAgencyInfo, isUpdatingAgencyInfo } = useOnboarding();

  const handleSubmit = async (formData: CreateAgencyRequest) => {
    // Temporary: Set up dummy authenticated state for UI testing
    setTimeout(() => {
      // Create dummy user with completed agency setup
      const dummyUser = {
        id: "dummy-user-123",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        isEmailVerified: true,
        avatar: undefined,
        phone: "+1 (555) 123-4567",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        onboardingStep: "complete" as const,
        freelancer: null,
        agency: {
          id: "dummy-agency-456",
          legalName: "John Doe Freelancing",
          displayName: "JD Creative",
          taxId: "123-45-6789",
          address: {
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "United States",
          },
          phone: "+1 (555) 123-4567",
          website: "https://jdcreative.com",
          logoUrl: undefined,
          currency: "USD" as const,
          timezone: "America/New_York",
          userId: "dummy-user-123",
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
      await updateAgencyInfo(formData);
    } catch {
      Alert.alert(
        "Error",
        "Failed to save agency information. Please try again."
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
              Tell us about your agency
            </Text>
            <Text className="text-b-2 leading-6">
              Set up your agency details for professional invoicing.
            </Text>
          </View>

          <AgencyForm
            onSubmit={handleSubmit}
            isLoading={isUpdatingAgencyInfo}
            submitButtonText="Continue"
            showOptionalFields={false}
            readOnlyFields={[]}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
