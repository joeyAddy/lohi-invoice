import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function ReportsOverview() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$18,450",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: "trending-up",
      description: "vs last month",
    },
    {
      title: "Invoices Sent",
      value: "47",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: "document-text",
      description: "vs last month",
    },
    {
      title: "Payment Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: "checkmark-circle",
      description: "vs last month",
    },
    {
      title: "Avg. Payment Time",
      value: "12 days",
      change: "-1.5 days",
      changeType: "positive" as const,
      icon: "time",
      description: "vs last month",
    },
  ];

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-primary-600 mb-4">
        Key Metrics
      </Text>

      <View className="space-y-4">
        {metrics.map((metric, index) => (
          <View
            key={index}
            className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm"
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary-100 rounded-full items-center justify-center mr-3">
                  <Ionicons
                    name={metric.icon as any}
                    size={20}
                    color="#1b365d"
                  />
                </View>
                <View>
                  <Text className="text-sm text-neutral-600">
                    {metric.title}
                  </Text>
                  <Text className="text-xs text-neutral-500">
                    {metric.description}
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-xl font-bold text-primary-600">
                  {metric.value}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons
                    name={
                      metric.changeType === "positive"
                        ? "arrow-up"
                        : "arrow-down"
                    }
                    size={12}
                    color={
                      metric.changeType === "positive" ? "#16a34a" : "#dc2626"
                    }
                  />
                  <Text
                    className={`text-xs font-medium ml-1 ${
                      metric.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
