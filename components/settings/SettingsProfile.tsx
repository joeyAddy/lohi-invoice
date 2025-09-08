import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function SettingsProfile() {
  // You can get this from your auth state later
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null,
    businessName: "JD Creative",
  };

  return (
    <View className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm border border-neutral-200">
      <View className="flex-row items-center">
        <View className="w-16 h-16 bg-primary-100 rounded-full items-center justify-center mr-4">
          {user.avatar ? (
            // TODO: Add image component when avatar is available
            <View />
          ) : (
            <Text className="text-2xl font-bold text-primary-600">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          )}
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-primary-600">
            {user.name}
          </Text>
          <Text className="text-sm text-neutral-600">{user.email}</Text>
          <Text className="text-sm text-neutral-500">{user.businessName}</Text>
        </View>

        <TouchableOpacity className="p-2">
          <Ionicons name="chevron-forward" size={20} color="#8e8e8e" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
