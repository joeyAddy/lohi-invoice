import { Header } from "@/components/shared";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { useOnboarding } from "@/lib";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InvoiceTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const {
    selectInvoiceTemplate,
    completeOnboarding,
    isSelectingTemplate,
    isCompletingOnboarding,
  } = useOnboarding();

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional professional layout",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant style",
    },
  ];

  const handleSelectTemplate = (templateId: string, templateName: string) => {
    setSelectedTemplate(templateId);
  };

  const handleFinish = async () => {
    if (!selectedTemplate) {
      Alert.alert(
        "Please select a template",
        "Choose an invoice template to continue"
      );
      return;
    }

    const selectedTemplateData = templates.find(
      (t) => t.id === selectedTemplate
    );
    if (!selectedTemplateData) return;

    // First select the template
    const templateResult = await selectInvoiceTemplate({
      templateId: selectedTemplate,
      templateName: selectedTemplateData.name,
    });

    if (templateResult.success) {
      // Then complete onboarding
      const onboardingResult = await completeOnboarding();

      if (onboardingResult.success) {
        // Navigate to main app
        router.replace("/(tabs)");
      } else {
        Alert.alert(
          "Error",
          onboardingResult.error || "Failed to complete onboarding"
        );
      }
    } else {
      Alert.alert("Error", templateResult.error || "Failed to select template");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isLoading = isSelectingTemplate || isCompletingOnboarding;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full p-4">
        {/* Header */}
        <Header
          title="Invoice Template"
          leftIcon="arrow-back"
          onPressLeftIcon={handleBack}
          className="mb-8"
        />

        {/* Step indicator */}
        <View className="mb-8">
          <Badge text="step 4 of 4" leftIcon="document-text-outline" />
        </View>

        {/* Title */}
        <Text className="text-h-3 mb-2 text-gray-900">
          Choose your invoice template
        </Text>
        <Text className="text-b-1 mb-8 text-gray-600">
          Select a design that matches your brand
        </Text>

        {/* Template selection */}
        <View className="flex-1">
          <View className="gap-4">
            {templates.map((template) => (
              <Pressable
                key={template.id}
                onPress={() => handleSelectTemplate(template.id, template.name)}
                className={`border-2 rounded-lg p-4 flex-row items-center ${
                  selectedTemplate === template.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <View className="w-16 h-20 bg-gray-100 rounded mr-4 items-center justify-center">
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color={
                      selectedTemplate === template.id ? "#3B82F6" : "#6B7280"
                    }
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-b-1 font-semibold text-gray-900 mb-1">
                    {template.name}
                  </Text>
                  <Text className="text-b-3 text-gray-600">
                    {template.description}
                  </Text>
                </View>
                {selectedTemplate === template.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Finish button */}
        <View className="w-full mt-8">
          <Button
            size="lg"
            onPress={handleFinish}
            isLoading={isLoading}
            disabled={!selectedTemplate}
          >
            Get Started
          </Button>
        </View>

        {/* Skip option */}
        <View className="mt-4 flex-row justify-center">
          <Button
            variant="outline"
            size="lg"
            onPress={() => router.replace("/(tabs)")}
          >
            Skip template selection
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceTemplate;
