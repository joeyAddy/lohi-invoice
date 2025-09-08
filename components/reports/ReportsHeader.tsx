import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ReportsHeader() {
  return (
    <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-neutral-200">
      <View>
        <Text className="text-2xl font-bold text-primary-600">Reports</Text>
        <Text className="text-sm text-neutral-600 mt-1">
          Analytics and insights for your business
        </Text>
      </View>

      <View className="flex-row space-x-3">
        <TouchableOpacity className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center">
          <Ionicons name="download-outline" size={20} color="#1b365d" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center">
          <Ionicons name="share-outline" size={20} color="#1b365d" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
