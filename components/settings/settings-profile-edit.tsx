import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import ClientAvatar from "../home/client-avatar";

export default function SettingsProfileEdit() {
  const user = {
    name: "Jansen Ackless",
    email: "Jansen@gmail.com",
    avatar: null,
    businessName: "",
  };

  return (
    <View className="bg-gray-100 mt-4 rounded-xs p-4 shadow-sm border border-gray-200">
      <View className="flex-row items-center">
        <View className="mr-4">
          <ClientAvatar
            imageUri={
              user.avatar ||
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
            }
            size={56}
            borderColor="#ffffff"
            borderWidth={2}
          />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-bold text-neutral-900">
            {user.name}
          </Text>
          <Text className="text-sm text-neutral-600">{user.email}</Text>
        </View>

        <Pressable className="p-2">
          <FontAwesome
            name="pencil-square-o"
            size={20}
            className="text-primary-500"
          />
        </Pressable>
      </View>
    </View>
  );
}
