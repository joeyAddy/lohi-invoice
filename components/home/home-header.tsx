import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import type { User } from "../../interfaces/user";

interface HeaderProps {
  user?: User | null;
}

export default function Header({ user }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View className="flex-row items-center justify-between px-4 pt-10 pb-4 bg-white">
      {/* User Info Section */}
      <View className="flex-row items-center">
        {/* Profile Image */}
        <View className="w-14 h-14 rounded-full bg-gray-100 mr-3 overflow-hidden">
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-gray-100 items-center justify-center">
              <Ionicons name="person" size={24} color="#6b7280" />
            </View>
          )}
        </View>

        {/* Greeting Text */}
        <View>
          <Text className="text-gray-900 text-lg font-dm-sans-bold">
            Hi {user?.firstName || "User"}
          </Text>
          <Text className="text-gray-500 text-sm font-dm-sans">
            {getGreeting()}
          </Text>
        </View>
      </View>

      {/* Notification Bell */}
      <Pressable className="w-12 h-12 bg-gray-100 rounded-xs items-center justify-center">
        <Ionicons name="notifications-outline" size={20} color="#374151" />
      </Pressable>
    </View>
  );
}
