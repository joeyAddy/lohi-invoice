import { Header } from "@/components/shared";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentMethodsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Payment Methods"
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
            Configure Payment Methods
          </Text>
          <Text className="text-gray-600">
            Set up payment methods you accept for invoices (Bank transfer,
            PayPal, Stripe, etc.)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
