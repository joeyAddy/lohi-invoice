import { Header } from "@/components/shared";
import Button from "@/components/ui/button";
import { ProfileTypeRequest, useOnboarding } from "@/lib";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileType = ProfileTypeRequest["profileType"] | null;

const ProfileTypeSelection = () => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>(null);
  const [profileError, setProfileError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { updateProfileType, isUpdatingProfileType } = useOnboarding();

  const validateInputs = () => {
    // Validate profile selection
    if (!selectedProfile) {
      setProfileError("Please select your profile type");
      return false;
    }
    setProfileError("");
    return true;
  };

  const handleContinue = async () => {
    if (!selectedProfile) return;

    setHasSubmitted(true);

    const isValid = validateInputs();

    if (!isValid) {
      return;
    }

    try {
      // Call your API to update profile type
      const result = await updateProfileType({ profileType: selectedProfile });

      if (result.success) {
        // Navigate to next step
        // router.push("/(onboarding)/next-step"); // Update with your actual next route
      } else {
        Alert.alert("Error", result.error || "Failed to update profile type");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSelectProfile = (profile: ProfileType) => {
    setSelectedProfile(profile);
    if (profileError) setProfileError("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full p-4">
        {/* Header */}
        <Header
          title="Profile Type"
          leftIcon="arrow-back-outline"
          onPressLeftIcon={handleGoBack}
          className="mb-8"
        />

        {/* Title */}
        <Text className="text-h-5 mb-2 text-gray-900">Choose your persona</Text>
        <Text className="text-b-1 mb-8 text-gray-600">
          Help us personalize your invoicing experience
        </Text>

        {/* Profile Selection Cards */}
        <View className="mb-4">
          <Pressable
            onPress={() => handleSelectProfile("freelancer")}
            className={`flex-row gap-6 p-6 mb-6 rounded-xs border ${
              selectedProfile === "freelancer"
                ? "bg-primary-100 border-primary-500"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <Image
              source={require("@/assets/images/freelancer.png")}
              className="size-24"
            />
            <View className="flex-1">
              <Text className="text-h-6 text-gray-900 mb-2">Freelancer</Text>
              <Text className="text-b-1 text-gray-600">
                &quot;I work independently and bill clients directly.&quot;
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => handleSelectProfile("agency")}
            className={`flex-row gap-6 p-6 rounded-xs border ${
              selectedProfile === "agency"
                ? "bg-primary-100 border-primary-500"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            <Image
              source={require("@/assets/images/agency.png")}
              className="size-24"
            />
            <View className="flex-1">
              <Text className="text-h-6 text-gray-900 mb-2">Agency</Text>
              <Text className="text-b-1 text-gray-600">
                &quot;We&apos;re a business managing multiple clients.&quot;
              </Text>
            </View>
          </Pressable>
        </View>

        {profileError && (
          <Text className="text-error-500 text-b-2 mb-4">{profileError}</Text>
        )}

        {/* Continue button - disabled when no profile is selected */}
        <View className="w-full mt-6">
          <Button
            size="lg"
            onPress={handleContinue}
            isLoading={isUpdatingProfileType}
            disabled={!selectedProfile}
          >
            Continue
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileTypeSelection;
