import { Button } from "@/components/ui";
import {
  CurrencyInput,
  DefaultInput,
  LocationInput,
  TimezoneInput,
} from "@/components/ui/inputs";
import { store } from "@/lib/store";
import { loginSuccess } from "@/lib/store/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/shared/header";
import Badge from "../../components/ui/badge";
import { CreateFreelancerRequest } from "../../interfaces/freelancer";
import { CurrencyData } from "../../lib/data/currencies";
import { TimezoneData } from "../../lib/data/timezones";
import { useOnboarding } from "../../lib/hooks/useOnboarding";
import { validateFreelancerInfoForm } from "../../lib/utils/validation";

// Type definitions
interface LocationData {
  name: string;
  code: string;
  type: "country" | "state" | "city";
}

interface SelectedLocation {
  country: LocationData | null;
  state: LocationData | null;
  city: LocationData | null;
}

export default function FreelancerInfoScreen() {
  const { updateFreelancerInfo, isUpdatingFreelancerInfo } = useOnboarding();

  // Form state
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
    country: null,
    state: null,
    city: null,
  });

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyData>({
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    region: "North America",
    popular: true,
  });

  const [selectedTimezone, setSelectedTimezone] = useState<TimezoneData>({
    value: "America/New_York",
    label: "Eastern Time (New York)",
    offset: "-05:00",
    region: "America",
  });

  const [formData, setFormData] = useState<CreateFreelancerRequest>({
    professionalName: "",
    taxId: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    website: "",
    currency: "USD" as CreateFreelancerRequest["currency"],
    timezone: "America/New_York",
    profession: "",
    bio: "",
    portfolioUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handlers for input components
  const handleLocationChange = (location: SelectedLocation) => {
    setSelectedLocation(location);
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        country: location.country?.name || "",
        state: location.state?.name || "",
        city: location.city?.name || "",
      },
    }));
  };

  const handleCurrencyChange = (currency: CurrencyData) => {
    setSelectedCurrency(currency);
    setFormData((prev) => ({
      ...prev,
      currency: currency.code as CreateFreelancerRequest["currency"],
    }));
  };

  const handleTimezoneChange = (timezone: TimezoneData) => {
    setSelectedTimezone(timezone);
    setFormData((prev) => ({
      ...prev,
      timezone: timezone.value,
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleContinue = async () => {
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
    const validation = validateFreelancerInfoForm(formData);

    if (!validation.isFormValid) {
      const newErrors: Record<string, string> = {};
      if (validation.professionalName.error)
        newErrors.professionalName = validation.professionalName.error;
      if (validation.address.street.error)
        newErrors.street = validation.address.street.error;
      if (validation.address.city.error)
        newErrors.city = validation.address.city.error;
      if (validation.address.state.error)
        newErrors.state = validation.address.state.error;
      if (validation.address.postalCode.error)
        newErrors.postalCode = validation.address.postalCode.error;
      if (validation.address.country.error)
        newErrors.country = validation.address.country.error;
      if (validation.website.error)
        newErrors.website = validation.website.error;

      setErrors(newErrors);
      return;
    }

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

          <View className="space-y-6">
            {/* Business/Professional Name */}
            <DefaultInput
              placeholder="Your professional name or brand"
              value={formData.professionalName}
              onChangeText={(value) =>
                handleInputChange("professionalName", value)
              }
              error={errors.professionalName}
              leftIcon={
                <Ionicons name="person-outline" size={20} color="#102138" />
              }
              className="mb-6"
            />
            {/* Website */}
            <DefaultInput
              placeholder="https://www.portfolio.com (optional)"
              value={formData.website || ""}
              onChangeText={(value) => handleInputChange("website", value)}
              error={errors.website}
              keyboardType="url"
              autoCapitalize="none"
              leftIcon={
                <Ionicons name="globe-outline" size={20} color="#102138" />
              }
              className="mb-6"
            />

            {/* Tax ID */}
            <DefaultInput
              placeholder="e.g., EIN: 12-3456789 (optional)"
              value={formData.taxId || ""}
              onChangeText={(value) => handleInputChange("taxId", value)}
              error={errors.taxId}
              leftIcon={
                <Ionicons name="document-outline" size={20} color="#102138" />
              }
              className="mb-6"
            />

            {/* Street Address */}
            <DefaultInput
              placeholder="Enter your street address"
              value={formData.address.street}
              onChangeText={(value) => handleInputChange("street", value)}
              error={errors.street}
              leftIcon={
                <Ionicons name="location-outline" size={20} color="#102138" />
              }
              className="mb-6"
            />
            {/* Postal Code */}
            <DefaultInput
              placeholder="Enter your postal code"
              value={formData.address.postalCode}
              onChangeText={(value) => handleInputChange("postalCode", value)}
              error={errors.postalCode}
              autoCapitalize="characters"
              leftIcon={
                <Ionicons
                  name="mail-unread-outline"
                  size={20}
                  color="#102138"
                />
              }
              className="mb-6"
            />

            {/* Regional Preferences Section */}
            <View className="border-primary-500 border p-4 rounded-xs">
              <Text className="text-b-1 text-gray-900 mb-4">
                Regional Preferences
              </Text>

              {/* Location Input */}
              <LocationInput
                value={selectedLocation}
                onChangeLocation={handleLocationChange}
                error={errors.country}
                showLabels={false}
                variant="minimal"
                className="mb-0"
              />

              {/* Currency */}
              <CurrencyInput
                value={selectedCurrency}
                onChangeCurrency={handleCurrencyChange}
                variant="minimal"
                className="mb-0"
              />

              {/* Timezone */}
              <TimezoneInput
                value={selectedTimezone}
                onChangeTimezone={handleTimezoneChange}
                variant="minimal"
                className="mb-0"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="w-full mt-6 mb-12">
            <Button
              onPress={handleContinue}
              size="lg"
              disabled={isUpdatingFreelancerInfo}
              isLoading={isUpdatingFreelancerInfo}
            >
              Continue
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
