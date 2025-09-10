import React from "react";
import { Text, View } from "react-native";
import { Separator } from "../shared";

export default function InvoicesStats() {
  const stats = [
    {
      label: "Paid",
      value: "12",
    },
    {
      label: "Unpaid",
      value: "05",
    },
    {
      label: "Over Due",
      value: "07",
    },
    {
      label: "Draft",
      value: "02",
    },
  ];

  return (
    <View className="mt-2 mb-6">
      <View className="bg-primary-500 rounded-xs p-6">
        <View className="flex-row justify-between items-center">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <View className="items-center">
                <Text className="text-white text-h-3 font-dm-sans-bold mb-2">
                  {stat.value}
                </Text>
                <Text className="text-white/80 text-label-s font-dm-sans">
                  {stat.label}
                </Text>
              </View>
              {index < stats.length - 1 && (
                <Separator orientation="vertical" type="solid" />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
}
