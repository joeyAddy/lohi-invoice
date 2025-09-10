import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function ReportsCharts() {
  const [selectedPeriod] = useState("Monthly");

  // Revenue data for area chart (in thousands)
  const data1 = [
    { value: 8, label: "Jan" },
    { value: 15, label: "Feb" },
    { value: 22, label: "Mar" },
    { value: 35, label: "Apr" },
    { value: 42, label: "Jun" },
    { value: 48, label: "Jul" },
    { value: 53, label: "Aug" },
    { value: 57, label: "Sep" },
  ];

  // Secondary revenue stream data
  const data2 = [
    { value: 5 },
    { value: 12 },
    { value: 18 },
    { value: 28 },
    { value: 32 },
    { value: 38 },
    { value: 45 },
    { value: 50 },
  ];

  return (
    <View>
      {/* Revenue Chart Card */}
      <View className="bg-gray-50 rounded-xs border border-gray-200">
        {/* Header with total and period selector */}
        <View className="flex-row items-center justify-between mb-4 p-4">
          <View>
            <View className="flex-row items-center">
              <Text className="text-gray-900 text-h-2 font-dm-sans-bold">
                $53,200
              </Text>
              <Text className="text-gray-500 text-b-2 font-dm-sans ml-2">
                (2.1%)
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="flex-row items-center bg-gray-50 px-3 py-2 rounded-xs"
            onPress={() => {
              // Handle period selection
              console.log("Open period selector");
            }}
          >
            <Text className="text-gray-700 text-b-2 font-dm-sans-medium mr-1">
              {selectedPeriod}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
        {/* Revenue Trend Chart */}
        <View
          className="px-2 py-4 overflow-hidden"
          style={{ alignItems: "center", width: "100%" }}
        >
          <LineChart
            areaChart
            curved
            data={data1}
            data2={data2}
            hideDataPoints={false}
            dataPointsColor1="#3b82f6"
            dataPointsColor2="#10b981"
            dataPointsRadius={3}
            spacing={38}
            color1="#3b82f6" // Light blue
            color2="#10b981" // Light green
            startFillColor1="#3b82f6"
            startFillColor2="#10b981"
            endFillColor1="#3b82f6"
            endFillColor2="#10b981"
            startOpacity={0.8}
            endOpacity={0.1}
            initialSpacing={10}
            endSpacing={10}
            noOfSections={4}
            maxValue={60}
            yAxisColor="transparent"
            yAxisThickness={0}
            rulesType="solid"
            rulesColor="#f1f5f9"
            yAxisTextStyle={{
              color: "#94a3b8",
              fontSize: 11,
              fontFamily: "DMSans-Regular",
            }}
            yAxisLabelSuffix="k"
            xAxisColor="transparent"
            xAxisLabelTextStyle={{
              color: "#94a3b8",
              fontSize: 11,
              fontFamily: "DMSans-Regular",
            }}
            width={Dimensions.get("screen").width - 48}
            height={180}
            hideAxesAndRules={false}
            showVerticalLines={false}
            thickness1={2}
            thickness2={2}
            isAnimated={true}
            animationDuration={1000}
          />
        </View>
      </View>
    </View>
  );
}
