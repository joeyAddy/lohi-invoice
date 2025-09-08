import React from "react";
import { Text, View } from "react-native";

export default function SettingsHeader() {
  return (
    <View className="px-4 py-4 bg-white border-b border-neutral-200">
      <Text className="text-2xl font-bold text-primary-600">Settings</Text>
      <Text className="text-sm text-neutral-600 mt-1">
        Manage your account and preferences
      </Text>
    </View>
  );
}
