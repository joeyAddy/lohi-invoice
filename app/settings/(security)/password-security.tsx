import { Header } from "@/components/shared";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PasswordSecurityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Password & Security"
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
            Password Management
          </Text>
          <Text className="text-gray-600 mb-6">
            Change your password and manage security settings.
          </Text>

          <View className="space-y-4">
            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">
                Change Password
              </Text>
              <Text className="text-sm text-gray-600">
                Update your account password
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">
                Two-Factor Authentication
              </Text>
              <Text className="text-sm text-gray-600">
                Add an extra layer of security
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
