import { Button } from "@/components/ui";
import {
  CurrencyInput,
  DefaultInput,
  LocationInput,
  TimezoneInput,
} from "@/components/ui/inputs";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/shared/header";
import Badge from "../../components/ui/badge";
import { CreateAgencyRequest } from "../../interfaces/agency";
import { CurrencyData } from "../../lib/data/currencies";
import { TimezoneData } from "../../lib/data/timezones";
import { useOnboarding } from "../../lib/hooks/useOnboarding";
import { validateAgencyInfoForm } from "../../lib/utils/validation";

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
  const { updateAgencyInfo, isUpdatingAgencyInfo } = useOnboarding();

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

  const [formData, setFormData] = useState<CreateAgencyRequest>({
    legalName: "",
    displayName: "",
    taxId: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    website: "",
    currency: "USD" as CreateAgencyRequest["currency"],
    timezone: "America/New_York",
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
      currency: currency.code as CreateAgencyRequest["currency"],
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
    const validation = validateAgencyInfoForm(formData);

    if (!validation.isFormValid) {
      const newErrors: Record<string, string> = {};
      if (validation.legalName.error)
        newErrors.legalName = validation.legalName.error;
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

    setTimeout(() => {
      router.replace("/(tabs)" as any);
    }, 2000); // Wait 2 seconds before navigating to home

    try {
      await updateAgencyInfo(formData);
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
              placeholder="Your business or professional name"
              value={formData.legalName}
              onChangeText={(value) => handleInputChange("legalName", value)}
              error={errors.legalName}
              leftIcon={
                <Ionicons name="person-outline" size={20} color="#102138" />
              }
              className="mb-6"
            />

            {/* Display Name */}
            <DefaultInput
              placeholder="How clients see your name"
              value={formData.displayName || ""}
              onChangeText={(value) => handleInputChange("displayName", value)}
              error={errors.displayName}
              leftIcon={
                <Ionicons name="text-outline" size={20} color="#102138" />
              }
              className="mb-6"
            />

            {/* Tax ID */}
            <DefaultInput
              placeholder="e.g., 123-45-6789 or EIN: 12-3456789"
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
              placeholder="Enter your business street address"
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

            {/* Website */}
            <DefaultInput
              placeholder="https://www.yourportfolio.com"
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
              disabled={isUpdatingAgencyInfo}
              isLoading={isUpdatingAgencyInfo}
            >
              Continue
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
