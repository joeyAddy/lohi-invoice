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
import { CreateFreelancerRequest } from "../../../interfaces/freelancer";
import { CurrencyData } from "../../../lib/data/currencies";
import { TimezoneData } from "../../../lib/data/timezones";
import { validateFreelancerInfoForm } from "../../../lib/utils/validation";

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

interface FreelancerFormProps {
  initialData?: Partial<CreateFreelancerRequest>;
  initialLocation?: SelectedLocation;
  initialCurrency?: CurrencyData;
  initialTimezone?: TimezoneData;
  onSubmit: (data: CreateFreelancerRequest) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
  showOptionalFields?: boolean;
  readOnlyFields?: string[];
}

export default function FreelancerForm({
  initialData,
  initialLocation,
  initialCurrency,
  initialTimezone,
  onSubmit,
  isLoading = false,
  submitButtonText = "Continue",
  showOptionalFields = true,
  readOnlyFields = [],
}: FreelancerFormProps) {
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

  const [formData, setFormData] = useState<CreateFreelancerRequest>({
    professionalName: initialData?.professionalName || "",
    taxId: initialData?.taxId || "",
    address: {
      street: initialData?.address?.street || "",
      city: initialData?.address?.city || "",
      state: initialData?.address?.state || "",
      postalCode: initialData?.address?.postalCode || "",
      country: initialData?.address?.country || "",
    },
    website: initialData?.website || "",
    currency:
      initialData?.currency || ("USD" as CreateFreelancerRequest["currency"]),
    timezone: initialData?.timezone || "America/New_York",
    profession: initialData?.profession || "",
    bio: initialData?.bio || "",
    portfolioUrl: initialData?.portfolioUrl || "",
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
    if (field.includes(".")) {
      // Handle nested fields like address.street
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CreateFreelancerRequest] as object),
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
    const validation = validateFreelancerInfoForm(formData);

    if (!validation.isFormValid) {
      const newErrors: Record<string, string> = {};
      if (validation.professionalName.error)
        newErrors.professionalName = validation.professionalName.error;
      if (validation.address.street.error)
        newErrors["address.street"] = validation.address.street.error;
      if (validation.address.city.error)
        newErrors["address.city"] = validation.address.city.error;
      if (validation.address.state.error)
        newErrors["address.state"] = validation.address.state.error;
      if (validation.address.postalCode.error)
        newErrors["address.postalCode"] = validation.address.postalCode.error;
      if (validation.address.country.error)
        newErrors["address.country"] = validation.address.country.error;
      if (validation.website.error)
        newErrors.website = validation.website.error;
      if (validation.portfolioUrl.error)
        newErrors.portfolioUrl = validation.portfolioUrl.error;

      setErrors(newErrors);
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
      {/* Business/Professional Name */}
      <DefaultInput
        placeholder="Your professional name or brand"
        value={formData.professionalName}
        onChangeText={(value) => handleInputChange("professionalName", value)}
        error={errors.professionalName}
        leftIcon={<Ionicons name="person-outline" size={20} color="#102138" />}
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
        leftIcon={<Ionicons name="globe-outline" size={20} color="#102138" />}
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
        onChangeText={(value) => handleInputChange("address.street", value)}
        error={errors["address.street"]}
        leftIcon={
          <Ionicons name="location-outline" size={20} color="#102138" />
        }
        className="mb-6"
      />

      {/* Postal Code */}
      <DefaultInput
        placeholder="Enter your postal code"
        value={formData.address.postalCode}
        onChangeText={(value) => handleInputChange("address.postalCode", value)}
        error={errors["address.postalCode"]}
        autoCapitalize="characters"
        leftIcon={
          <Ionicons name="mail-unread-outline" size={20} color="#102138" />
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
            placeholder="Professional email (optional)"
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
            placeholder="Profession (optional)"
            value={formData.profession || ""}
            onChangeText={(value) => handleInputChange("profession", value)}
            error={errors.profession}
            leftIcon={
              <Ionicons name="briefcase-outline" size={20} color="#102138" />
            }
            className="mb-6"
          />

          <DefaultInput
            placeholder="Professional bio (optional)"
            value={formData.bio || ""}
            onChangeText={(value) => handleInputChange("bio", value)}
            error={errors.bio}
            multiline
            numberOfLines={3}
            leftIcon={
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#102138"
              />
            }
            className="mb-6"
          />

          <DefaultInput
            placeholder="Portfolio URL (optional)"
            value={formData.portfolioUrl || ""}
            onChangeText={(value) => handleInputChange("portfolioUrl", value)}
            error={errors.portfolioUrl}
            keyboardType="url"
            autoCapitalize="none"
            leftIcon={
              <Ionicons name="albums-outline" size={20} color="#102138" />
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
            error={errors["address.country"]}
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
      )}

      {/* Action Buttons */}
      <View className="w-full mt-6 mb-12">
        <Button
          onPress={handleSubmit}
          size="lg"
          disabled={isLoading}
          isLoading={isLoading}
        >
          {submitButtonText}
        </Button>
      </View>
    </View>
  );
}
