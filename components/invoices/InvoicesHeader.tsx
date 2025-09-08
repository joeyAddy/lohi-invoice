import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function InvoicesHeader() {
  return (
    <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-neutral-200">
      <View>
        <Text className="text-2xl font-bold text-primary-600">Invoices</Text>
        <Text className="text-sm text-neutral-600 mt-1">
          Manage your invoices and payments
        </Text>
      </View>

      <View className="flex-row space-x-3">
        <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center">
          <Ionicons name="search-outline" size={20} color="#1b365d" />
        </View>
        <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center">
          <Ionicons name="filter-outline" size={20} color="#1b365d" />
        </View>
      </View>
    </View>
  );
}
