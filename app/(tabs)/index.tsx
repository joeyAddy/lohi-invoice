import { useAuth, useAuthGuard } from "@/lib/hooks/useAuth";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Home = () => {
  // Check authentication and redirect if not logged in
  const { isAuthenticated, isLoading: authGuardLoading } = useAuthGuard();

  // Get user information
  const { user, isLoading: authLoading } = useAuth();

  // Show loading while checking authentication
  if (authGuardLoading || authLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" className="text-primary-500" />
        <Text className="text-b-1 font-playfair-regular text-gray-600 mt-4">
          Loading...
        </Text>
      </View>
    );
  }

  // If not authenticated, the useAuthGuard hook will handle redirect
  // This component will only render for authenticated users
  if (!isAuthenticated) {
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-h-2 font-playfair-bold text-primary-600 text-center mb-4">
        Welcome to Lohi Invoice!
      </Text>

      {user && (
        <View className="items-center mb-8">
          <Text className="text-h-4 font-playfair-bold text-gray-900 mb-2">
            Hello, {user.firstName} {user.lastName}!
          </Text>
          <Text className="text-b-1 font-playfair-regular text-gray-600 text-center">
            Ready to create professional invoices for your business.
          </Text>
        </View>
      )}

      <View className="w-full max-w-md space-y-4">
        <View className="bg-primary-50 p-6 rounded-xl border border-primary-200">
          <Text className="text-h-6 font-playfair-bold text-primary-800 mb-2">
            Quick Actions
          </Text>
          <Text className="text-b-2 font-playfair-regular text-primary-700">
            • Create new invoice
          </Text>
          <Text className="text-b-2 font-playfair-regular text-primary-700">
            • View recent invoices
          </Text>
          <Text className="text-b-2 font-playfair-regular text-primary-700">
            • Manage clients
          </Text>
        </View>

        <View className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <Text className="text-h-6 font-playfair-bold text-gray-800 mb-2">
            Dashboard Stats
          </Text>
          <Text className="text-b-2 font-playfair-regular text-gray-600">
            Your invoice dashboard will appear here once you start creating
            invoices.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
