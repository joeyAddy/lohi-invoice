import React from "react";
import { Text, View } from "react-native";

interface StatItemProps {
  title: string;
  amount: string;
  percentage: string;
}

export default function StatItem({ title, amount, percentage }: StatItemProps) {
  return (
    <View className="relative">
      <View className="bg-primary-100/10 rounded-xs p-4 pr-16">
        <Text className="text-white/80 text-xs mb-1">{title}</Text>
        <Text className="text-white text-xl font-bold">{amount}</Text>
      </View>

      {/* Curved cutout with percentage */}
      <View
        className="absolute bg-primary-600 rounded-l-full items-center justify-center px-3 py-2"
        style={{
          right: 0,
          top: "50%",
          marginTop: -16,
          minWidth: 50,
          height: 32,
        }}
      >
        <View className="flex-row items-center">
          <View className="w-2 h-2 bg-green-400 rounded-full mr-2" />
          <Text className="text-green-400 text-xs font-bold">{percentage}</Text>
        </View>
      </View>
    </View>
  );
}
