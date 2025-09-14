import { Header } from "@/components/shared";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Notifications"
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
            Notification Preferences
          </Text>
          <Text className="text-gray-600 mb-6">
            Choose which notifications you&apos;d like to receive.
          </Text>

          <View className="space-y-4">
            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">
                Invoice Reminders
              </Text>
              <Text className="text-sm text-gray-600">
                Get notified about overdue invoices
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">
                Payment Received
              </Text>
              <Text className="text-sm text-gray-600">
                Notification when payments are received
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="font-medium text-gray-900 mb-2">
                App Updates
              </Text>
              <Text className="text-sm text-gray-600">
                Get notified about new features
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
