import { Header } from "@/components/shared";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BiometricsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Biometrics"
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
            Biometric Authentication
          </Text>
          <Text className="text-gray-600 mb-6">
            Use your fingerprint or face ID to securely access the app.
          </Text>

          <View className="space-y-4">
            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">Touch ID</Text>
              <Text className="text-sm text-gray-600">
                Use fingerprint to unlock the app
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">Face ID</Text>
              <Text className="text-sm text-gray-600">
                Use face recognition to unlock the app
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
