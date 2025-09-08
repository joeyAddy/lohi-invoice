import React from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface StatsCardProps {
  totalEarning: string;
  paidThisMonth: string;
  paidThisMonthPercentage: string;
  awaitingPayment: string;
  awaitingPaymentPercentage: string;
}

export default function StatsCard({
  totalEarning,
  paidThisMonth,
  paidThisMonthPercentage,
  awaitingPayment,
  awaitingPaymentPercentage,
}: StatsCardProps) {
  // Chart data for the bar chart - making bars white
  const barData = [
    { value: 20, frontColor: "#ffffff" },
    { value: 8, frontColor: "#ffffff" },
    { value: 15, frontColor: "#ffffff" },
    { value: 12, frontColor: "#ffffff" },
    { value: 25, frontColor: "#ffffff" },
    { value: 10, frontColor: "#ffffff" },
    { value: 18, frontColor: "#ffffff" },
    { value: 6, frontColor: "#ffffff" },
    { value: 22, frontColor: "#ffffff" },
    { value: 14, frontColor: "#ffffff" },
    { value: 28, frontColor: "#ffffff" },
    { value: 16, frontColor: "#ffffff" },
    { value: 8, frontColor: "#ffffff" },
  ];

  return (
    <View className="mx-4 mb-6">
      <View className="bg-primary-600 rounded-xs p-6">
        <View className="flex-row justify-between">
          {/* Left Side - Chart and Total Earning */}
          <View className="flex-[0.3] pr-4 justify-between">
            {/* Chart Section */}
            <View className="-ml-3">
              <BarChart
                data={barData}
                width={140}
                height={48}
                barWidth={4}
                spacing={4}
                roundedTop
                roundedBottom
                hideRules={true}
                hideYAxisText={true}
                disableScroll={true}
                backgroundColor="transparent"
                barBorderRadius={2}
                noOfSections={3}
                maxValue={30}
                showXAxisIndices={false}
                showYAxisIndices={false}
                xAxisThickness={0}
                yAxisThickness={0}
              />
            </View>

            {/* Total Earning */}
            <View>
              <Text className="text-white/80 text-sm mb-1">Total Earning</Text>
              <Text className="text-white text-3xl font-bold">
                {totalEarning}
              </Text>
            </View>
          </View>

          {/* Right Side - Two Stat Cards */}
          <View className="flex-[0.7] justify-between">
            {/* Paid this month card */}
            <View className="relative">
              <View className="bg-primary-100/10 rounded-xs p-4 pr-16">
                <Text className="text-white/80 text-xs mb-1">
                  Paid this month
                </Text>
                <Text className="text-white text-xl font-bold">
                  {paidThisMonth}
                </Text>
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
                  <Text className="text-green-400 text-xs font-bold">
                    {paidThisMonthPercentage}
                  </Text>
                </View>
              </View>
            </View>

            {/* Awaiting payment card */}
            <View className="relative mt-4">
              <View className="bg-primary-100/10 rounded-xs p-4 pr-16">
                <Text className="text-white/80 text-xs mb-1">
                  Awaiting payment
                </Text>
                <Text className="text-white text-xl font-bold">
                  {awaitingPayment}
                </Text>
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
                  <Text className="text-green-400 text-xs font-bold">
                    {awaitingPaymentPercentage}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
