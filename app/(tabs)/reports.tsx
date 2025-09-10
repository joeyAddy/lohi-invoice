import { Header } from "@/components/shared";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportsCharts from "../../components/reports/report-charts";
import ReportsOverview from "../../components/reports/reports-overview";

export default function ReportsScreen() {
  const handleBack = () => {
    console.log("Go back");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Statistics"
        leftIcon="chevron-back"
        onPressLeftIcon={handleBack}
        rightIcon="ellipsis-horizontal"
        onPressRightIcon={() => {
          console.log("Show menu");
        }}
        className="px-4 pt-2"
      />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ReportsOverview />
        <ReportsCharts />
      </ScrollView>
    </SafeAreaView>
  );
}
