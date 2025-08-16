import { Header } from "@/components/shared";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import {
  DefaultInput,
  PhoneInput,
  type CountryData,
} from "@/components/ui/inputs";
import { useAuth, useOnboarding } from "@/lib";
import { validatePersonalInfoForm } from "@/lib/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PersonalInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );

  // Validation states
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { updatePersonalInfo, isUpdatingPersonalInfo } = useOnboarding();
  const { logout } = useAuth();

  const validateInputs = () => {
    const validation = validatePersonalInfoForm(
      firstName,
      lastName,
      phoneNumber
    );

    setFirstNameError(validation.firstName.error || "");
    setLastNameError(validation.lastName.error || "");
    setPhoneNumberError(validation.phoneNumber.error || "");

    return validation.isFormValid;
  };

  const handleContinue = async () => {
    setTimeout(() => {
      router.push("/(onboarding)/profile-type");
    }, 2000); // Wait 2 seconds before navigating

    setHasSubmitted(true);

    const isValid = validateInputs();

    if (!isValid) {
      return;
    }

    // Format phone number with country code if available
    const fullPhoneNumber =
      selectedCountry && phoneNumber
        ? `+${selectedCountry.phonecode}${phoneNumber}`
        : phoneNumber;

    const result = await updatePersonalInfo({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: fullPhoneNumber.trim() || undefined,
    });

    if (result.success) {
      // Navigate to next step
      router.push("/(onboarding)/company-info");
    } else {
      Alert.alert("Error", result.error || "Failed to update personal info");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/(authentication)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full p-4">
        {/* Header */}
        <Header
          title="Personal Info"
          leftIcon="log-out-outline"
          onPressLeftIcon={handleLogout}
          className="mb-8"
        />

        {/* Step indicator */}
        <View className="mb-8">
          <Badge text="step 1 of 4" leftIcon="person-outline" />
        </View>

        {/* Title */}
        <Text className="text-h-5 mb-2 text-gray-900">
          Tell us about yourself
        </Text>
        <Text className="text-b-1 mb-8 text-gray-600">
          Help us personalize your invoicing experience
        </Text>

        {/* Form fields */}
        <View className="w-full space-y-6">
          <DefaultInput
            placeholder="First name"
            value={firstName}
            onChangeText={(value) => {
              setFirstName(value);
              if (hasSubmitted) {
                const validation = validatePersonalInfoForm(
                  value,
                  lastName,
                  phoneNumber
                );
                setFirstNameError(validation.firstName.error || "");
              }
            }}
            error={firstNameError}
            leftIcon={
              <Ionicons name="person-outline" size={20} color="#a4a4a4" />
            }
            autoCapitalize="words"
            className="mb-6"
          />

          <DefaultInput
            placeholder="Last name"
            value={lastName}
            onChangeText={(value) => {
              setLastName(value);
              if (hasSubmitted) {
                const validation = validatePersonalInfoForm(
                  firstName,
                  value,
                  phoneNumber
                );
                setLastNameError(validation.lastName.error || "");
              }
            }}
            error={lastNameError}
            leftIcon={
              <Ionicons name="person-outline" size={20} color="#a4a4a4" />
            }
            autoCapitalize="words"
            className="mb-6"
          />

          <PhoneInput
            placeholder="Phone number"
            value={phoneNumber}
            onChangeText={(value) => {
              setPhoneNumber(value);
              if (hasSubmitted) {
                const validation = validatePersonalInfoForm(
                  firstName,
                  lastName,
                  value
                );
                setPhoneNumberError(validation.phoneNumber.error || "");
              }
            }}
            onChangeCountry={setSelectedCountry}
            error={phoneNumberError}
            defaultCountry="US"
          />
        </View>

        {/* Continue button */}
        <View className="w-full mt-8">
          <Button
            size="lg"
            onPress={handleContinue}
            isLoading={isUpdatingPersonalInfo}
          >
            Continue
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfo;
