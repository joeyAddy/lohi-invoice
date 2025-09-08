import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TutorialCardProps {
  title?: string;
  description?: string;
  onPress?: () => void;
}

export default function TutorialCard({
  title = "Watch Tutorial",
  description = "How to send an invoice in 1 minute",
  onPress,
}: TutorialCardProps) {
  return (
    <View className="mx-4 mb-6">
      <TouchableOpacity
        onPress={onPress}
        className="bg-primary-100/20 rounded-xs p-5 flex-row items-center justify-between"
        activeOpacity={0.7}
      >
        <View className="flex-1">
          <Text className="text-primary-900 text-lg font-semibold mb-1">
            {title}
          </Text>
          <Text className="text-primary-700 text-base">{description}</Text>
        </View>

        <View className="ml-4">
          <View className="bg-primary-500 rounded-full w-12 h-12 items-center justify-center shadow-lg">
            <Ionicons
              name="play"
              size={20}
              color="white"
              style={{ marginLeft: 2 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
