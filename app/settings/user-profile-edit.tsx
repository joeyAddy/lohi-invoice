import { Header } from "@/components/shared";
import { Button } from "@/components/ui";
import { DefaultInput } from "@/components/ui/inputs";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ClientAvatar from "../../components/home/client-avatar";
import { showImagePicker, validateUpdatePersonalInfoForm } from "../../lib";
import { useUpdateProfileMutation } from "../../lib/api/rtkApi";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/redux";
import {
  selectUser,
  updateUserProfile,
} from "../../lib/store/slices/authSlice";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
}

export default function UserProfileEditScreen() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSave = async () => {
    // Validate the form
    const validation = validateUpdatePersonalInfoForm(
      formData.firstName,
      formData.lastName,
      user?.email || "", // Use current email for validation
      formData.phone
    );

    if (!validation.isFormValid) {
      const newErrors: Record<string, string> = {};
      if (validation.firstName.error)
        newErrors.firstName = validation.firstName.error;
      if (validation.lastName.error)
        newErrors.lastName = validation.lastName.error;
      if (validation.phone.error) newErrors.phone = validation.phone.error;

      setErrors(newErrors);
      return;
    }

    try {
      const updateData: any = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim() || undefined,
      };

      // Add avatar if user has changed it
      if (user?.avatar) {
        updateData.avatar = user.avatar;
      }

      await updateProfile(updateData).unwrap();

      // Update Redux state with the saved profile data
      dispatch(
        updateUserProfile({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim() || undefined,
        })
      );

      Alert.alert("Success", "Your profile has been updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      console.error("Profile update error:", error);
      Alert.alert(
        "Error",
        error?.data?.message || "Failed to update profile. Please try again."
      );
    }
  };

  const handleChangeAvatar = async () => {
    try {
      const result = await showImagePicker({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result) {
        // Update the Redux user state with the new avatar
        dispatch(
          updateUserProfile({
            avatar: result.uri,
          })
        );

        // TODO: Here you might want to upload the image to your server
        // and get back a URL, then use that URL instead of the local URI
        console.log("Avatar updated in Redux state:", result.uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  if (!user) {
    return null;
  }

  // Get business name from agency or freelancer profile
  const businessName =
    user.agency?.legalName || user.freelancer?.professionalName || "";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Edit Profile"
        leftIcon="chevron-back"
        onPressLeftIcon={handleGoBack}
        className="px-4 pt-2"
      />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Avatar Section */}
        <View className="items-center mt-6 mb-8">
          <View className="relative">
            <ClientAvatar
              imageUri={
                user.avatar ||
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
              }
              size={100}
              borderColor="#ffffff"
              borderWidth={3}
            />
            <Button
              onPress={handleChangeAvatar}
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary-500 items-center justify-center"
              size="sm"
            >
              <Ionicons name="camera" size={16} color="white" />
            </Button>
          </View>

          {businessName && (
            <Text className="text-sm text-neutral-600 mt-3 text-center">
              {businessName}
            </Text>
          )}
        </View>

        {/* Form Section */}
        <View className="space-y-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </Text>

          {/* First Name */}
          <DefaultInput
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
            error={errors.firstName}
            leftIcon={
              <Ionicons name="person-outline" size={20} color="#102138" />
            }
            className="mb-4"
          />

          {/* Last Name */}
          <DefaultInput
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange("lastName", value)}
            error={errors.lastName}
            leftIcon={
              <Ionicons name="person-outline" size={20} color="#102138" />
            }
            className="mb-4"
          />

          {/* Email - Read Only */}
          <View className="mb-4">
            <View className="flex-row items-center border border-neutral-200 rounded-xs px-xs h-14 bg-neutral-100">
              <View className="mr-3xs">
                <Ionicons name="mail-outline" size={20} color="#bbbbbb" />
              </View>
              <Text className="flex-1 text-label-m text-neutral-500">
                {user.email}
              </Text>
              <View className="mr-2">
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color="#bbbbbb"
                />
              </View>
            </View>
            <Text className="text-xs text-neutral-500 mt-1">
              Email cannot be changed from this screen
            </Text>
          </View>

          {/* Phone */}
          <DefaultInput
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            error={errors.phone}
            keyboardType="phone-pad"
            leftIcon={
              <Ionicons name="call-outline" size={20} color="#102138" />
            }
          />
        </View>

        {/* Save Button */}
        <View className="mt-8">
          <Button
            onPress={handleSave}
            size="lg"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
