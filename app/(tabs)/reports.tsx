import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportsCharts from "../../components/reports/ReportsCharts";
import ReportsFilters from "../../components/reports/ReportsFilters";
import ReportsHeader from "../../components/reports/ReportsHeader";
import ReportsOverview from "../../components/reports/ReportsOverview";

export default function ReportsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ReportsHeader />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ReportsFilters />
        <ReportsOverview />
        <ReportsCharts />
      </ScrollView>
    </SafeAreaView>
  );
}
