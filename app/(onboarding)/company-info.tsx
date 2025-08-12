import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/shared/header";
import Badge from "../../components/ui/badge";
import { CreateCompanyRequest } from "../../interfaces/company";
import { useOnboarding } from "../../lib/hooks/useOnboarding";
import { validateCompanyInfoForm } from "../../lib/utils/validation";

// Common currencies for easy selection
const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
] as const;

// Common timezones
const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "GMT (London)" },
  { value: "Europe/Paris", label: "CET (Paris)" },
  { value: "Asia/Tokyo", label: "JST (Tokyo)" },
  { value: "Australia/Sydney", label: "AEST (Sydney)" },
] as const;

export default function CompanyInfoScreen() {
  const { updateCompanyInfo, isUpdatingCompanyInfo } = useOnboarding();

  const [formData, setFormData] = useState<CreateCompanyRequest>({
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
    phone: "",
    email: "",
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
          ...(prev[parent as keyof CreateCompanyRequest] as object),
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
    const validation = validateCompanyInfoForm(formData);

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
        phone: validation.phone.error || "",
        email: validation.email.error || "",
        website: validation.website.error || "",
        currency: validation.currency.error || "",
        timezone: validation.timezone.error || "",
      });
      return;
    }

    try {
      await updateCompanyInfo(formData);
      router.push("/(onboarding)/company-logo");
    } catch {
      Alert.alert(
        "Error",
        "Failed to save company information. Please try again."
      );
    }
  };

  const handleSkip = () => {
    router.push("/(onboarding)/company-logo");
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Company Information"
        leftIcon="arrow-back"
        onPressLeftIcon={() => router.back()}
      />

      <ScrollView className="flex-1 px-6 pt-8">
        <View className="mb-8">
          <Badge text="Step 2 of 4" variant="outline" />
          <Text className="text-2xl font-playfair-bold text-gray-900 mt-4 mb-2">
            Tell us about your company
          </Text>
          <Text className="text-gray-600 text-base leading-6 font-playfair-regular">
            Set up your company details for professional invoicing.
          </Text>
        </View>

        <View className="space-y-6">
          {/* Legal Name */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Legal Company Name *
            </Text>
            <TextInput
              className={`w-full p-4 rounded-lg border ${
                errors.legalName ? "border-red-500" : "border-gray-300"
              } bg-white`}
              placeholder="Enter your legal company name"
              value={formData.legalName}
              onChangeText={(value) => handleInputChange("legalName", value)}
              autoCapitalize="words"
            />
            {errors.legalName ? (
              <Text className="text-red-500 text-sm mt-1">
                {errors.legalName}
              </Text>
            ) : null}
          </View>

          {/* Display Name */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Display Name (on invoices)
            </Text>
            <TextInput
              className={`w-full p-4 rounded-lg border ${
                errors.displayName ? "border-red-500" : "border-gray-300"
              } bg-white`}
              placeholder="How clients see your company name"
              value={formData.displayName}
              onChangeText={(value) => handleInputChange("displayName", value)}
              autoCapitalize="words"
            />
            {errors.displayName ? (
              <Text className="text-red-500 text-sm mt-1">
                {errors.displayName}
              </Text>
            ) : null}
          </View>

          {/* Tax ID */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Tax ID (EIN, VAT, GST)
            </Text>
            <TextInput
              className={`w-full p-4 rounded-lg border ${
                errors.taxId ? "border-red-500" : "border-gray-300"
              } bg-white`}
              placeholder="e.g., 12-3456789 or VAT123456789"
              value={formData.taxId}
              onChangeText={(value) => handleInputChange("taxId", value)}
              autoCapitalize="characters"
            />
            {errors.taxId ? (
              <Text className="text-red-500 text-sm mt-1">{errors.taxId}</Text>
            ) : null}
          </View>

          {/* Address Section */}
          <View>
            <Text className="text-lg font-playfair-bold text-gray-900 mb-4">
              Business Address
            </Text>

            {/* Street */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </Text>
              <TextInput
                className={`w-full p-4 rounded-lg border ${
                  errors["address.street"]
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-white`}
                placeholder="123 Main Street"
                value={formData.address.street}
                onChangeText={(value) =>
                  handleInputChange("address.street", value)
                }
                autoCapitalize="words"
              />
              {errors["address.street"] ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors["address.street"]}
                </Text>
              ) : null}
            </View>

            {/* City and State */}
            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  City *
                </Text>
                <TextInput
                  className={`w-full p-4 rounded-lg border ${
                    errors["address.city"]
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-white`}
                  placeholder="City"
                  value={formData.address.city}
                  onChangeText={(value) =>
                    handleInputChange("address.city", value)
                  }
                  autoCapitalize="words"
                />
                {errors["address.city"] ? (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors["address.city"]}
                  </Text>
                ) : null}
              </View>

              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  State/Province *
                </Text>
                <TextInput
                  className={`w-full p-4 rounded-lg border ${
                    errors["address.state"]
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-white`}
                  placeholder="State/Province"
                  value={formData.address.state}
                  onChangeText={(value) =>
                    handleInputChange("address.state", value)
                  }
                  autoCapitalize="words"
                />
                {errors["address.state"] ? (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors["address.state"]}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Postal Code and Country */}
            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Postal Code *
                </Text>
                <TextInput
                  className={`w-full p-4 rounded-lg border ${
                    errors["address.postalCode"]
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-white`}
                  placeholder="12345"
                  value={formData.address.postalCode}
                  onChangeText={(value) =>
                    handleInputChange("address.postalCode", value)
                  }
                  autoCapitalize="characters"
                />
                {errors["address.postalCode"] ? (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors["address.postalCode"]}
                  </Text>
                ) : null}
              </View>

              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Country *
                </Text>
                <TextInput
                  className={`w-full p-4 rounded-lg border ${
                    errors["address.country"]
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-white`}
                  placeholder="United States"
                  value={formData.address.country}
                  onChangeText={(value) =>
                    handleInputChange("address.country", value)
                  }
                  autoCapitalize="words"
                />
                {errors["address.country"] ? (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors["address.country"]}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>

          {/* Contact Information */}
          <View>
            <Text className="text-lg font-playfair-bold text-gray-900 mb-4">
              Contact Information
            </Text>

            {/* Phone */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </Text>
              <TextInput
                className={`w-full p-4 rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } bg-white`}
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
                keyboardType="phone-pad"
              />
              {errors.phone ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </Text>
              ) : null}
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Company Email
              </Text>
              <TextInput
                className={`w-full p-4 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-white`}
                placeholder="contact@yourcompany.com"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.email}
                </Text>
              ) : null}
            </View>

            {/* Website */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Website
              </Text>
              <TextInput
                className={`w-full p-4 rounded-lg border ${
                  errors.website ? "border-red-500" : "border-gray-300"
                } bg-white`}
                placeholder="https://www.yourcompany.com"
                value={formData.website}
                onChangeText={(value) => handleInputChange("website", value)}
                autoCapitalize="none"
                keyboardType="url"
              />
              {errors.website ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.website}
                </Text>
              ) : null}
            </View>
          </View>

          {/* Business Settings */}
          <View>
            <Text className="text-lg font-playfair-bold text-gray-900 mb-4">
              Business Settings
            </Text>

            {/* Currency */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Default Currency *
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {CURRENCIES.map((currency) => (
                  <TouchableOpacity
                    key={currency.code}
                    onPress={() => handleInputChange("currency", currency.code)}
                    className={`px-4 py-2 rounded-lg border ${
                      formData.currency === currency.code
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        formData.currency === currency.code
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {currency.symbol} {currency.code}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.currency ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.currency}
                </Text>
              ) : null}
            </View>

            {/* Timezone */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Timezone *
              </Text>
              <View className="space-y-2">
                {TIMEZONES.map((tz) => (
                  <TouchableOpacity
                    key={tz.value}
                    onPress={() => handleInputChange("timezone", tz.value)}
                    className={`p-3 rounded-lg border ${
                      formData.timezone === tz.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        formData.timezone === tz.value
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {tz.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.timezone ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.timezone}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        <View className="flex-row space-x-3 mt-8 mb-8">
          <TouchableOpacity
            onPress={handleSkip}
            className="flex-1 py-4 rounded-lg border border-gray-300"
            disabled={isUpdatingCompanyInfo}
          >
            <Text className="text-gray-700 text-center font-medium">
              Skip for now
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleContinue}
            className={`flex-1 py-4 rounded-lg ${
              isUpdatingCompanyInfo ? "bg-gray-400" : "bg-blue-600"
            }`}
            disabled={isUpdatingCompanyInfo}
          >
            <Text className="text-white text-center font-medium">
              {isUpdatingCompanyInfo ? "Saving..." : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
