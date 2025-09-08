import React from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import StatItem from "./stat-item";

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

  // Stat items data array
  const statItems = [
    {
      title: "Paid this month",
      amount: paidThisMonth,
      percentage: paidThisMonthPercentage,
    },
    {
      title: "Awaiting payment",
      amount: awaitingPayment,
      percentage: awaitingPaymentPercentage,
    },
  ];

  return (
    <View className="mx-4 mb-6">
      <View className="bg-primary-600 rounded-xs p-6">
        <View className="flex-row justify-between">
          {/* Left Side - Chart and Total Earning */}
          <View className="flex-[0.4] pr-4 justify-between">
            {/* Chart Section */}
            <View className="-ml-4">
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
          {/* Right side - Stat Items */}
          <View className="flex-[0.6] gap-3">
            {statItems.map((item, index) => (
              <StatItem
                key={index}
                title={item.title}
                amount={item.amount}
                percentage={item.percentage}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
