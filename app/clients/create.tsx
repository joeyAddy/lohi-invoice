import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ClientAvatar from "../../components/home/client-avatar";
import { Header } from "../../components/shared";
import { Button } from "../../components/ui";
import { DefaultInput } from "../../components/ui/inputs";
import type { CreateClientRequest } from "../../interfaces";
import { showImagePicker, validateClientForm } from "../../lib";
import { useCreateClientMutation } from "../../lib/api/rtkApi";

export default function CreateClient() {
  const [createClient, { isLoading }] = useCreateClientMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
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
        setFormData((prev) => ({ ...prev, avatar: result.uri }));
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const handleSave = async () => {
    // Validate the form
    const validation = validateClientForm({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      address: formData.address,
    });

    if (!validation.isFormValid) {
      const newErrors: Record<string, string> = {};
      if (validation.firstName.error)
        newErrors.firstName = validation.firstName.error;
      if (validation.lastName.error)
        newErrors.lastName = validation.lastName.error;
      if (validation.email.error) newErrors.email = validation.email.error;
      if (validation.phone.error) newErrors.phone = validation.phone.error;

      setErrors(newErrors);
      return;
    }

    try {
      const clientData: CreateClientRequest = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        address: formData.address.trim() || undefined,
        avatar: formData.avatar || undefined,
      };

      await createClient(clientData).unwrap();

      Alert.alert("Success", "Client created successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      console.error("Client creation error:", error);
      Alert.alert(
        "Error",
        error?.data?.message || "Failed to create client. Please try again."
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Create Client"
        leftIcon="chevron-back"
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
                formData.avatar ||
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
        </View>

        {/* Form Fields */}
        <View className="space-y-6">
          {/* First Name and Last Name */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <DefaultInput
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={(value: string) =>
                  handleInputChange("firstName", value)
                }
                error={errors.firstName}
                leftIcon={
                  <Ionicons name="person-outline" size={20} color="#102138" />
                }
                className="mb-4"
              />
            </View>
            <View className="flex-1">
              <DefaultInput
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={(value: string) =>
                  handleInputChange("lastName", value)
                }
                error={errors.lastName}
                leftIcon={
                  <Ionicons name="person-outline" size={20} color="#102138" />
                }
                className="mb-4"
              />
            </View>
          </View>

          {/* Email */}
          <DefaultInput
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(value: string) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon={
              <Ionicons name="mail-outline" size={20} color="#102138" />
            }
            className="mb-4"
          />

          {/* Company */}
          <DefaultInput
            placeholder="Company (Optional)"
            value={formData.company}
            onChangeText={(value: string) =>
              handleInputChange("company", value)
            }
            leftIcon={
              <Ionicons name="business-outline" size={20} color="#102138" />
            }
            className="mb-4"
          />

          {/* Phone */}
          <DefaultInput
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChangeText={(value: string) => handleInputChange("phone", value)}
            keyboardType="phone-pad"
            leftIcon={
              <Ionicons name="call-outline" size={20} color="#102138" />
            }
            className="mb-4"
          />

          {/* Address */}
          <DefaultInput
            placeholder="Address (Optional)"
            value={formData.address}
            onChangeText={(value: string) =>
              handleInputChange("address", value)
            }
            leftIcon={
              <Ionicons name="location-outline" size={20} color="#102138" />
            }
            className="mb-4"
          />
        </View>

        {/* Action Buttons */}
        <View className="mt-5 flex-row gap-4">
          <Button
            onPress={handleSave}
            className="flex-1"
            size="lg"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create Client
          </Button>

          <Button
            onPress={() => router.back()}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            Cancel
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
