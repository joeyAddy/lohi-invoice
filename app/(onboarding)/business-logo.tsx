import { Header } from "@/components/shared";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { useOnboarding } from "@/lib";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AgencyLogo = () => {
  const [logoUri, setLogoUri] = useState<string | null>(null);

  const { uploadAgencyLogo, isUploadingAgencyLogo } = useOnboarding();

  const pickImage = async () => {
    // For now, we'll use a placeholder - you can add expo-image-picker later
    Alert.alert(
      "Image Picker",
      "This feature will be implemented with expo-image-picker"
    );
  };

  const handleContinue = async () => {
    if (!logoUri) {
      // If no logo, just skip to next step
      router.push("/(onboarding)/invoice-template");
      return;
    }

    if (logoUri) {
      const result = await uploadAgencyLogo({
        logo: logoUri,
      });

      if (result.success) {
        router.push("/(onboarding)/invoice-template");
      } else {
        Alert.alert("Error", result.error || "Failed to upload agency logo");
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full p-4">
        {/* Header */}
        <Header
          title="Agency Logo"
          leftIcon="arrow-back"
          onPressLeftIcon={handleBack}
          className="mb-8"
        />

        {/* Step indicator */}
        <View className="mb-8">
          <Badge text="Step 3 of 4" variant="outline" />
        </View>

        {/* Title */}
        <Text className="text-h-3 mb-2 text-gray-900">
          Add your business logo
        </Text>
        <Text className="text-b-1 mb-8 text-gray-600">
          Make your invoices look professional and branded
        </Text>

        {/* Logo upload section */}
        <View className="mb-8">
          <Text className="text-b-1 font-semibold mb-4 text-gray-900">
            Business Logo (optional)
          </Text>

          {logoUri ? (
            <View className="items-center mb-4">
              <Image
                source={{ uri: logoUri }}
                className="w-32 h-32 rounded-lg"
                resizeMode="cover"
              />
              <Pressable
                onPress={() => setLogoUri(null)}
                className="mt-2 px-4 py-2 bg-red-100 rounded-lg"
              >
                <Text className="text-red-600 text-b-2">Remove</Text>
              </Pressable>
            </View>
          ) : (
            <View className="border-2 border-dashed border-gray-300 rounded-lg p-8 items-center">
              <Ionicons name="cloud-upload-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 text-b-2 mb-4 text-center">
                Upload your agency logo
              </Text>
              <Pressable
                onPress={pickImage}
                className="px-6 py-3 bg-primary-500 rounded-lg"
              >
                <Text className="text-white text-b-2 font-semibold">
                  Choose File
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Continue button */}
        <View className="w-full mt-8">
          <Button
            size="lg"
            onPress={handleContinue}
            isLoading={isUploadingAgencyLogo}
          >
            Continue
          </Button>
        </View>

        {/* Skip option */}
        <View className="mt-4 flex-row justify-center">
          <Button
            variant="outline"
            size="lg"
            onPress={() => router.push("/invoice-template")}
          >
            Skip for now
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AgencyLogo;
