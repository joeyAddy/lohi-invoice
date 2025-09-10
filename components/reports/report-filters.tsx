import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ReportsFilters() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const periods = [
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "quarter", label: "This Quarter" },
    { id: "year", label: "This Year" },
  ];

  return (
    <View className="mt-6 mb-6">
      <Text className="text-lg font-semibold text-primary-600 mb-4">
        Time Period
      </Text>

      <View className="flex-row flex-wrap gap-2">
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            onPress={() => setSelectedPeriod(period.id)}
            className={`px-4 py-2 rounded-full border ${
              selectedPeriod === period.id
                ? "bg-primary-500 border-primary-500"
                : "bg-white border-neutral-300"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selectedPeriod === period.id ? "text-white" : "text-neutral-600"
              }`}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
