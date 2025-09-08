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

export default function AgencyInfoScreen() {
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
      currency: currency.code as "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY",
    }));
  };

  const handleTimezoneChange = (timezone: TimezoneData) => {
    setSelectedTimezone(timezone);
    setFormData((prev) => ({
      ...prev,
      timezone: timezone.value,
    }));
  };

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
    currency: "USD",
    timezone: "America/New_York",
  });

  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      // Handle nested fields like address.street
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CreateAgencyRequest] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleContinue = async () => {
    const validation = validateAgencyInfoForm(formData);

    if (!validation.isFormValid) {
      setErrors({
        legalName: validation.legalName.error || "",
        displayName: "", // Optional field, no errors
        taxId: "", // Optional field, no errors
        "address.street": validation.address.street.error || "",
        "address.city": validation.address.city.error || "",
        "address.state": validation.address.state.error || "",
        "address.postalCode": validation.address.postalCode.error || "",
        "address.country": validation.address.country.error || "",
        website: validation.website.error || "",
        currency: validation.currency.error || "",
        timezone: validation.timezone.error || "",
      });
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

          {/* Legal Name */}
          <DefaultInput
            placeholder="Enter your legal agency name"
            value={formData.legalName}
            onChangeText={(value) => handleInputChange("legalName", value)}
            error={errors.legalName}
            leftIcon={
              <Ionicons name="business-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />

          <DefaultInput
            placeholder="Enter your agency street address"
            value={formData.address.street}
            onChangeText={(value) => handleInputChange("address.street", value)}
            error={errors["address.street"]}
            leftIcon={
              <Ionicons name="location-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />

          {/* Postal Code and Country */}
          <DefaultInput
            placeholder="Enter your agency postal code"
            value={formData.address.postalCode}
            onChangeText={(value) =>
              handleInputChange("address.postalCode", value)
            }
            autoCapitalize="characters"
            error={errors["address.postalCode"]}
            leftIcon={
              <Ionicons name="mail-unread-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />
          <DefaultInput
            placeholder="Tax Id e.g., 12-3456789 or VAT123456789"
            value={formData.taxId}
            onChangeText={(value) => handleInputChange("taxId", value)}
            error={errors.taxId}
            leftIcon={
              <Ionicons name="document-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />

          <View className="border-primary-500 border p-4 rounded-xs">
            <Text className="text-b-1 text-gray-900 mb-4">
              Regional Preferences
            </Text>

            {/* Location Input */}
            <LocationInput
              value={selectedLocation}
              onChangeLocation={handleLocationChange}
              className="mb-0"
              showLabels={false}
              variant="minimal"
            />

            {/* Currency Input */}
            <CurrencyInput
              value={selectedCurrency}
              onChangeCurrency={handleCurrencyChange}
              className="mb-3"
              label=""
              variant="minimal"
            />

            {/* Timezone Input */}
            <TimezoneInput
              value={selectedTimezone}
              onChangeTimezone={handleTimezoneChange}
              className="mb-0"
              label=""
              variant="minimal"
            />
          </View>

          <View className="w-full mt-6 mb-12">
            <Button
              size="lg"
              onPress={handleContinue}
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
