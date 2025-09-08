import { useAuth, useAuthGuard } from "@/lib/hooks/useAuth";
import React from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { HomeHeader, StatsCard } from "../../components/home";

const Home = () => {
  // Check authentication and redirect if not logged in
  const { isAuthenticated, isLoading: authGuardLoading } = useAuthGuard();

  // Get user information
  const { user, isLoading: authLoading } = useAuth();

  // Show loading while checking authentication
  if (authGuardLoading || authLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1b365d" />
          <Text className="text-gray-600 mt-4">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // If not authenticated, the useAuthGuard hook will handle redirect
  // This component will only render for authenticated users
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header Section */}
        <HomeHeader user={user} />

        {/* Stats Card */}
        <StatsCard
          totalEarning="$78,264"
          paidThisMonth="$1525.25"
          paidThisMonthPercentage="+12%"
          awaitingPayment="$1525.25"
          awaitingPaymentPercentage="+12%"
        />

        {/* Main Content Area */}
        <View className="flex-1 bg-gray-50 rounded-t-3xl px-6 py-6 border-t border-gray-200">
          <Text className="text-gray-800 text-lg font-semibold">
            Dashboard Content
          </Text>
          <Text className="text-gray-600 mt-2">
            Your invoice dashboard content will go here...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
