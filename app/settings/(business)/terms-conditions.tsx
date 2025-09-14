import { Header } from "@/components/shared";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsConditionsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Terms & Conditions"
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
            Default Terms & Conditions
          </Text>
          <Text className="text-gray-600">
            Set default terms and conditions that will appear on your invoices.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
