import React from "react";
import { Text, View } from "react-native";
import { Separator } from "../shared";

export default function ReportsOverview() {
  const stats = [
    {
      label: "Paid",
      value: "1,500",
    },
    {
      label: "Unpaid",
      value: "123",
      change: "+3.4%",
    },
    {
      label: "Overdue",
      value: "320",
      change: "+4%",
    },
  ];

  return (
    <View className="mt-2">
      {/* Over View Section Title */}
      <Text className="text-gray-900 text-h-6 font-dm-sans-bold mb-4">
        Over View
      </Text>

      {/* November Invoicing Summary Card */}
      <View className="bg-primary-500 rounded-xs p-6 mb-6">
        <Text className="text-white text-h-4 font-dm-sans-bold mb-6">
          November Invoicing Summary
        </Text>

        <View className="flex-row justify-between items-center">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <View className="items-center">
                <Text className="text-white/80 text-label-s font-dm-sans mb-1">
                  {stat.label}
                </Text>
                <Text className="text-white text-h-3 font-dm-sans-bold mb-2">
                  {stat.value}{" "}
                  {stat.change && (
                    <Text className="text-white/90 text-xs font-dm-sans">
                      {stat.change}
                    </Text>
                  )}
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
