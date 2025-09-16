import { Header } from "@/components/shared";
import { Button } from "@/components/ui";
import { DefaultInput } from "@/components/ui/inputs";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ClientAvatar from "../../../components/home/client-avatar";
import { showImagePicker } from "../../../lib";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks/redux";
import { selectUser } from "../../../lib/store/slices/authSlice";

interface BrandFormData {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string;
  tagline: string;
  website: string;
}

export default function BrandScreen() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  // Get current brand data from user's agency or freelancer profile
  const currentBrand = user?.agency || user?.freelancer;

  const [formData, setFormData] = useState<BrandFormData>({
    primaryColor: "#3B82F6", // Default blue
    secondaryColor: "#64748B", // Default gray
    accentColor: "#EF4444", // Default red
    logoUrl: currentBrand?.logoUrl || "",
    tagline: "",
    website: currentBrand?.website || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const colorPresets = [
    {
      name: "Blue",
      primary: "#3B82F6",
      secondary: "#64748B",
      accent: "#EF4444",
    },
    {
      name: "Green",
      primary: "#10B981",
      secondary: "#6B7280",
      accent: "#F59E0B",
    },
    {
      name: "Purple",
      primary: "#8B5CF6",
      secondary: "#6B7280",
      accent: "#EF4444",
    },
    {
      name: "Orange",
      primary: "#F97316",
      secondary: "#6B7280",
      accent: "#3B82F6",
    },
    {
      name: "Pink",
      primary: "#EC4899",
      secondary: "#6B7280",
      accent: "#10B981",
    },
    {
      name: "Indigo",
      primary: "#6366F1",
      secondary: "#6B7280",
      accent: "#F59E0B",
    },
  ];

  const handleInputChange = (field: keyof BrandFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleColorPresetSelect = (preset: (typeof colorPresets)[0]) => {
    setFormData((prev) => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    }));
  };

  const handleLogoChange = async () => {
    try {
      const result = await showImagePicker({
        allowsEditing: true,
        aspect: [3, 1], // Wide aspect ratio for logos
        quality: 0.9,
      });

      if (result) {
        setFormData((prev) => ({ ...prev, logoUrl: result.uri }));
        // TODO: Upload to server and get URL
        console.log("Logo selected:", result.uri);
      }
    } catch (error) {
      console.error("Error selecting logo:", error);
      Alert.alert("Error", "Failed to select logo. Please try again.");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate color format (hex)
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    if (!hexColorRegex.test(formData.primaryColor)) {
      newErrors.primaryColor = "Please enter a valid hex color (e.g., #3B82F6)";
    }

    if (!hexColorRegex.test(formData.secondaryColor)) {
      newErrors.secondaryColor =
        "Please enter a valid hex color (e.g., #64748B)";
    }

    if (!hexColorRegex.test(formData.accentColor)) {
      newErrors.accentColor = "Please enter a valid hex color (e.g., #EF4444)";
    }

    // Validate website URL if provided
    if (formData.website && formData.website.trim()) {
      const urlRegex =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlRegex.test(formData.website.trim())) {
        newErrors.website = "Please enter a valid website URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement brand settings save API call
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      Alert.alert(
        "Success",
        "Your brand settings have been updated successfully!",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update brand settings. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const ColorInput = ({
    label,
    value,
    onChangeText,
    error,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
  }) => (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      <View className="flex-row items-center space-x-3">
        <View
          className="w-12 h-12 rounded-lg border border-gray-300"
          style={{ backgroundColor: value }}
        />
        <View className="flex-1">
          <DefaultInput
            placeholder="#3B82F6"
            value={value}
            onChangeText={onChangeText}
            error={error}
            autoCapitalize="none"
            leftIcon={
              <Ionicons
                name="color-palette-outline"
                size={20}
                color="#102138"
              />
            }
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Brand Settings"
        leftIcon="chevron-back"
        className="px-4 pt-2"
      />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Brand Identity
          </Text>
          <Text className="text-gray-600 mb-6">
            Customize your brand colors, logo, and identity for invoices and
            documents.
          </Text>

          {/* Logo Section */}
          <View className="mb-8">
            <Text className="text-base font-medium text-gray-900 mb-4">
              Logo
            </Text>
            <View className="items-center">
              <View className="relative mb-4">
                {formData.logoUrl ? (
                  <ClientAvatar
                    imageUri={formData.logoUrl}
                    size={120}
                    borderColor="#e5e7eb"
                    borderWidth={2}
                  />
                ) : (
                  <View className="w-30 h-30 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center">
                    <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                    <Text className="text-sm text-gray-500 mt-2">No logo</Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={handleLogoChange}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 rounded-full items-center justify-center"
                >
                  <Ionicons name="camera" size={16} color="white" />
                </TouchableOpacity>
              </View>
              <Text className="text-sm text-gray-600 text-center">
                Recommended: 300x100px or wider aspect ratio
              </Text>
            </View>
          </View>

          {/* Color Presets */}
          <View className="mb-8">
            <Text className="text-base font-medium text-gray-900 mb-4">
              Color Presets
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              <View className="flex-row space-x-3">
                {colorPresets.map((preset, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleColorPresetSelect(preset)}
                    className="items-center"
                  >
                    <View className="flex-row space-x-1 mb-2">
                      <View
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <View
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <View
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </View>
                    <Text className="text-xs text-gray-600">{preset.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Custom Colors */}
          <View className="mb-8">
            <Text className="text-base font-medium text-gray-900 mb-4">
              Custom Colors
            </Text>

            <ColorInput
              label="Primary Color"
              value={formData.primaryColor}
              onChangeText={(value) => handleInputChange("primaryColor", value)}
              error={errors.primaryColor}
            />

            <ColorInput
              label="Secondary Color"
              value={formData.secondaryColor}
              onChangeText={(value) =>
                handleInputChange("secondaryColor", value)
              }
              error={errors.secondaryColor}
            />

            <ColorInput
              label="Accent Color"
              value={formData.accentColor}
              onChangeText={(value) => handleInputChange("accentColor", value)}
              error={errors.accentColor}
            />
          </View>

          {/* Brand Details */}
          <View className="mb-8">
            <Text className="text-base font-medium text-gray-900 mb-4">
              Brand Details
            </Text>

            <DefaultInput
              placeholder="Your business tagline (optional)"
              value={formData.tagline}
              onChangeText={(value) => handleInputChange("tagline", value)}
              error={errors.tagline}
              leftIcon={
                <Ionicons name="chatbubble-outline" size={20} color="#102138" />
              }
              className="mb-4"
            />

            <DefaultInput
              placeholder="https://www.yourbusiness.com"
              value={formData.website}
              onChangeText={(value) => handleInputChange("website", value)}
              error={errors.website}
              keyboardType="url"
              autoCapitalize="none"
              leftIcon={
                <Ionicons name="globe-outline" size={20} color="#102138" />
              }
            />
          </View>

          {/* Preview Section */}
          <View className="mb-8 p-4 bg-gray-50 rounded-lg">
            <Text className="text-base font-medium text-gray-900 mb-4">
              Preview
            </Text>
            <View
              className="p-4 rounded-lg border-2"
              style={{
                backgroundColor: formData.primaryColor + "10", // 10% opacity
                borderColor: formData.primaryColor,
              }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text
                  className="text-lg font-bold"
                  style={{ color: formData.primaryColor }}
                >
                  {user?.agency?.legalName ||
                    user?.freelancer?.professionalName ||
                    "Your Business"}
                </Text>
                <View
                  className="px-3 py-1 rounded"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  <Text className="text-white text-sm font-medium">
                    INVOICE
                  </Text>
                </View>
              </View>
              {formData.tagline && (
                <Text
                  className="text-sm mb-2"
                  style={{ color: formData.secondaryColor }}
                >
                  {formData.tagline}
                </Text>
              )}
              <Text
                className="text-sm"
                style={{ color: formData.secondaryColor }}
              >
                This is how your brand colors will appear on invoices
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <Button
            onPress={handleSave}
            size="lg"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Save Brand Settings
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
