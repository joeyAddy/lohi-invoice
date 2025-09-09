import { useAuth, useAuthGuard } from "@/lib/hooks/useAuth";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  ClientSection,
  HomeHeader,
  RecentInvoices,
  StatsCard,
  TutorialCard,
} from "../../components/home";

const Home = () => {
  const router = useRouter();

  // Check authentication and redirect if not logged in
  const { isAuthenticated, isLoading: authGuardLoading } = useAuthGuard();

  // Get user information
  const { user, isLoading: authLoading } = useAuth();

  // Sample client data
  const sampleClients = [
    {
      id: "1",
      name: "John Doe",
      imageUri: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      imageUri: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      name: "Mike Johnson",
      imageUri: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      imageUri: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "5",
      name: "Tom Brown",
      imageUri: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: "6",
      name: "Emily Davis",
      imageUri: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: "7",
      name: "Alex Turner",
      imageUri: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];

  // Sample invoice data
  const sampleInvoices = [
    {
      id: "1",
      title: "LendFlow invoice",
      amount: "$56,500.00",
      createdDate: "14 Jan 2023",
      status: "Open" as const,
    },
    {
      id: "2",
      title: "Nike invoice",
      amount: "$500.00",
      createdDate: "12 Jan 2023",
      status: "Paid" as const,
    },
    {
      id: "3",
      title: "Apple invoice",
      amount: "$2,340.00",
      createdDate: "10 Jan 2023",
      status: "Overdue" as const,
    },
    {
      id: "4",
      title: "Google invoice",
      amount: "$1,200.00",
      createdDate: "08 Jan 2023",
      status: "Draft" as const,
    },
  ];

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
      {/* Header Section - Fixed at top */}
      <HomeHeader user={user} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Tutorial Card */}
        <TutorialCard
          title="Watch Tutorial"
          description="How to send an invoice in 1 minute"
          onPress={() => {
            // Handle tutorial video play
            console.log("Play tutorial video");
          }}
        />

        {/* Stats Card */}
        <StatsCard
          totalEarning="$78,264"
          paidThisMonth="$1525.25"
          paidThisMonthPercentage="+12%"
          awaitingPayment="$1525.25"
          awaitingPaymentPercentage="+12%"
        />

        {/* Client Section */}
        <ClientSection
          clients={sampleClients}
          onPress={() => {
            // Handle navigation to clients screen
            console.log("Navigate to clients screen");
          }}
        />

        {/* Recent Invoices Section */}
        <RecentInvoices
          invoices={sampleInvoices}
          onSeeAllPress={() => {
            // Handle navigation to all invoices screen
            console.log("Navigate to all invoices screen");
          }}
          onInvoicePress={(invoice) => {
            // Navigate to invoice details page
            router.push(`/invoices/${invoice.id}`);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
