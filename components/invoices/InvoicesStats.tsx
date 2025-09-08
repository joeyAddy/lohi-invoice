import React from "react";
import { Text, View } from "react-native";

export default function InvoicesStats() {
  const stats = [
    {
      title: "Total Invoices",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Paid Amount",
      value: "$12,450",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Pending",
      value: "$3,200",
      change: "-5%",
      changeType: "negative" as const,
    },
    {
      title: "Overdue",
      value: "$850",
      change: "0%",
      changeType: "neutral" as const,
    },
  ];

  return (
    <View className="mt-6 mb-6">
      <Text className="text-lg font-semibold text-primary-600 mb-4">
        Overview
      </Text>

      <View className="flex-row flex-wrap gap-3">
        {stats.map((stat, index) => (
          <View
            key={index}
            className="flex-1 min-w-[45%] bg-neutral-100 rounded-lg p-4"
          >
            <Text className="text-xs text-neutral-600 mb-1">{stat.title}</Text>
            <Text className="text-xl font-bold text-primary-600 mb-2">
              {stat.value}
            </Text>
            <View className="flex-row items-center">
              <Text
                className={`text-xs font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-neutral-600"
                }`}
              >
                {stat.change}
              </Text>
              <Text className="text-xs text-neutral-500 ml-1">
                vs last month
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
