import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import InvoiceCard from "./home-invoice-card";

interface Invoice {
  id: string;
  title: string;
  amount: string;
  createdDate: string;
  status: "Open" | "Paid" | "Overdue" | "Draft";
}

interface RecentInvoicesProps {
  invoices: Invoice[];
  onSeeAllPress?: () => void;
  onInvoicePress?: (invoice: Invoice) => void;
}

export default function RecentInvoices({
  invoices,
  onSeeAllPress,
  onInvoicePress,
}: RecentInvoicesProps) {
  // Show only the first 3 invoices for recent list
  const recentInvoices = invoices.slice(0, 3);

  return (
    <View className="mx-4 mb-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-gray-900 text-h-6 font-dm-sans-bold">
          Recent invoices
        </Text>
        <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7}>
          <Text className="text-primary-600 text-base font-medium">
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* Invoice Cards */}
      <View>
        {recentInvoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            title={invoice.title}
            amount={invoice.amount}
            createdDate={invoice.createdDate}
            status={invoice.status}
            onPress={() => onInvoicePress?.(invoice)}
          />
        ))}
      </View>

      {/* Show message if no invoices */}
      {invoices.length === 0 && (
        <View className="bg-gray-50 rounded-xl p-6 items-center">
          <Text className="text-gray-500 text-base">
            No recent invoices found
          </Text>
          <Text className="text-gray-400 text-sm mt-1">
            Create your first invoice to get started
          </Text>
        </View>
      )}
    </View>
  );
}
