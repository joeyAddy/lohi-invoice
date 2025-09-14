import { Header } from "@/components/shared";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaxSettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Tax Settings"
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
            Tax Configuration
          </Text>
          <Text className="text-gray-600">
            Configure tax rates, VAT settings, and tax-related preferences for
            your invoices.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
