import { Button } from "@/components/ui";
import {
  CurrencyInput,
  DefaultInput,
  LocationInput,
  TimezoneInput,
} from "@/components/ui/inputs";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { CreateAgencyRequest } from "../../../interfaces/agency";
import { CurrencyData } from "../../../lib/data/currencies";
import { TimezoneData } from "../../../lib/data/timezones";
import { validateAgencyInfoForm } from "../../../lib/utils/validation";

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

interface AgencyFormProps {
  initialData?: Partial<CreateAgencyRequest>;
  initialLocation?: SelectedLocation;
  initialCurrency?: CurrencyData;
  initialTimezone?: TimezoneData;
  onSubmit: (data: CreateAgencyRequest) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
  showOptionalFields?: boolean;
  readOnlyFields?: string[];
}

export default function AgencyForm({
  initialData,
  initialLocation,
  initialCurrency,
  initialTimezone,
  onSubmit,
  isLoading = false,
  submitButtonText = "Continue",
  showOptionalFields = true,
  readOnlyFields = [],
}: AgencyFormProps) {
  // Form state
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>(
    initialLocation || {
      country: null,
      state: null,
      city: null,
    }
  );

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyData>(
    initialCurrency || {
      code: "USD",
      name: "US Dollar",
      symbol: "$",
      region: "North America",
      popular: true,
    }
  );

  const [selectedTimezone, setSelectedTimezone] = useState<TimezoneData>(
    initialTimezone || {
      value: "America/New_York",
      label: "Eastern Time (New York)",
      offset: "-05:00",
      region: "America",
    }
  );

  const [formData, setFormData] = useState<CreateAgencyRequest>({
    legalName: initialData?.legalName || "",
    displayName: initialData?.displayName || "",
    taxId: initialData?.taxId || "",
    address: {
      street: initialData?.address?.street || "",
      city: initialData?.address?.city || "",
      state: initialData?.address?.state || "",
      postalCode: initialData?.address?.postalCode || "",
      country: initialData?.address?.country || "",
    },
    website: initialData?.website || "",
    currency: initialData?.currency || "USD",
    timezone: initialData?.timezone || "America/New_York",
    businessType: initialData?.businessType || "",
    industry: initialData?.industry || "",
  });

  const [errors, setErrors] = useState<Record<string, any>>({});

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

  const handleSubmit = async () => {
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

    await onSubmit(formData);
  };

  const ReadOnlyField = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string;
    icon: string;
  }) => (
    <View className="mb-6">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      <View className="flex-row items-center border border-neutral-200 rounded-xs px-xs h-14 bg-neutral-100">
        <View className="mr-3xs">
          <Ionicons name={icon as any} size={20} color="#bbbbbb" />
        </View>
        <Text className="flex-1 text-label-m text-neutral-500">
          {value || "Not set"}
        </Text>
        <View className="mr-2">
          <Ionicons name="lock-closed-outline" size={16} color="#bbbbbb" />
        </View>
      </View>
      <Text className="text-xs text-neutral-500 mt-1">
        This field cannot be changed from this screen
      </Text>
    </View>
  );

  return (
    <View>
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

      {showOptionalFields && (
        <DefaultInput
          placeholder="Display name (optional)"
          value={formData.displayName}
          onChangeText={(value) => handleInputChange("displayName", value)}
          error={errors.displayName}
          leftIcon={
            <Ionicons name="storefront-outline" size={20} color="#102138" />
          }
          className="mb-6"
        />
      )}

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

      {/* Postal Code */}
      <DefaultInput
        placeholder="Enter your agency postal code"
        value={formData.address.postalCode}
        onChangeText={(value) => handleInputChange("address.postalCode", value)}
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

      {showOptionalFields && (
        <>
          <DefaultInput
            placeholder="Phone (optional)"
            value={formData.phone || ""}
            onChangeText={(value) => handleInputChange("phone", value)}
            error={errors.phone}
            keyboardType="phone-pad"
            leftIcon={
              <Ionicons name="call-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />

          <DefaultInput
            placeholder="Business email (optional)"
            value={formData.email || ""}
            onChangeText={(value) => handleInputChange("email", value)}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={
              <Ionicons name="mail-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />

          <DefaultInput
            placeholder="Website (optional)"
            value={formData.website}
            onChangeText={(value) => handleInputChange("website", value)}
            error={errors.website}
            keyboardType="url"
            autoCapitalize="none"
            leftIcon={
              <Ionicons name="globe-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />

          <DefaultInput
            placeholder="Business type (optional)"
            value={formData.businessType}
            onChangeText={(value) => handleInputChange("businessType", value)}
            error={errors.businessType}
            leftIcon={
              <Ionicons name="briefcase-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />

          <DefaultInput
            placeholder="Industry (optional)"
            value={formData.industry}
            onChangeText={(value) => handleInputChange("industry", value)}
            error={errors.industry}
            leftIcon={
              <Ionicons name="layers-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />
        </>
      )}

      {/* Regional Preferences Section */}
      {readOnlyFields.includes("currency") ||
      readOnlyFields.includes("timezone") ? (
        <>
          <Text className="text-base font-medium text-gray-900 mb-4 mt-6">
            Regional Settings
          </Text>
          {readOnlyFields.includes("currency") && (
            <ReadOnlyField
              label="Currency"
              value={formData.currency}
              icon="card-outline"
            />
          )}
          {readOnlyFields.includes("timezone") && (
            <ReadOnlyField
              label="Timezone"
              value={formData.timezone}
              icon="time-outline"
            />
          )}
        </>
      ) : (
        <View className="border-primary-500 border p-4 rounded-xs mb-6">
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
      )}

      <View className="w-full mt-6 mb-12">
        <Button
          size="lg"
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {submitButtonText}
        </Button>
      </View>
    </View>
  );
}
