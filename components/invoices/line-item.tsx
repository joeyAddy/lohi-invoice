import React from "react";
import { Text, View } from "react-native";

interface LineItemProps {
  description: string;
  cost: string;
}

export default function LineItem({ description, cost }: LineItemProps) {
  return (
    <View className="flex-row justify-between items-center py-3">
      <Text className="text-gray-700 text-base flex-1 mr-4">{description}</Text>
      <Text className="text-gray-900 text-base font-semibold">{cost}</Text>
    </View>
  );
}
