import { Header } from "@/components/shared";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLockScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="App Lock" leftIcon="chevron-back" className="px-4 pt-2" />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            App Lock Settings
          </Text>
          <Text className="text-gray-600 mb-6">
            Set up PIN, pattern, or biometric locks to secure your app.
          </Text>

          <View className="space-y-4">
            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">PIN Lock</Text>
              <Text className="text-sm text-gray-600">
                Set a 4-6 digit PIN to secure the app
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">
                Pattern Lock
              </Text>
              <Text className="text-sm text-gray-600">
                Draw a pattern to unlock the app
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">
                Auto-Lock Timer
              </Text>
              <Text className="text-sm text-gray-600">
                Set when the app should auto-lock
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
