import React from "react";
import { Text, View } from "react-native";

export default function ReportsCharts() {
  // Mock data for chart representation
  const revenueData = [
    { month: "Jan", value: 85 },
    { month: "Feb", value: 72 },
    { month: "Mar", value: 68 },
    { month: "Apr", value: 92 },
    { month: "May", value: 88 },
    { month: "Jun", value: 95 },
  ];

  const maxValue = Math.max(...revenueData.map((d) => d.value));

  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-primary-600 mb-4">
        Revenue Trend
      </Text>

      <View className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm font-medium text-neutral-600">
            Monthly Revenue ($K)
          </Text>
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center">
              <View className="w-3 h-3 bg-primary-500 rounded-full mr-2" />
              <Text className="text-xs text-neutral-600">Revenue</Text>
            </View>
          </View>
        </View>

        {/* Simple bar chart representation */}
        <View className="h-40 flex-row items-end justify-between space-x-2">
          {revenueData.map((data, index) => (
            <View key={index} className="flex-1 items-center">
              <View
                className="bg-primary-500 rounded-t w-full mb-2"
                style={{
                  height: (data.value / maxValue) * 120,
                }}
              />
              <Text className="text-xs text-neutral-600 text-center">
                {data.month}
              </Text>
              <Text className="text-xs text-neutral-500 text-center">
                ${data.value}K
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Invoice Status Distribution */}
      <View className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm mt-4">
        <Text className="text-sm font-medium text-neutral-600 mb-4">
          Invoice Status Distribution
        </Text>

        <View className="space-y-3">
          {[
            {
              status: "Paid",
              count: 32,
              percentage: 68,
              color: "bg-green-500",
            },
            {
              status: "Pending",
              count: 12,
              percentage: 26,
              color: "bg-yellow-500",
            },
            { status: "Overdue", count: 3, percentage: 6, color: "bg-red-500" },
          ].map((item, index) => (
            <View key={index} className="flex-row items-center">
              <View className="w-16">
                <Text className="text-xs text-neutral-600">{item.status}</Text>
              </View>
              <View className="flex-1 mx-3">
                <View className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <View
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </View>
              </View>
              <View className="w-12 items-end">
                <Text className="text-xs font-medium text-neutral-800">
                  {item.count}
                </Text>
              </View>
              <View className="w-12 items-end">
                <Text className="text-xs text-neutral-600">
                  {item.percentage}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
