import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Invoice {
  id: string;
  clientName: string;
  amount: string;
  status: "paid" | "pending" | "overdue" | "draft";
  dueDate: string;
  invoiceNumber: string;
}

export default function InvoicesList() {
  const mockInvoices: Invoice[] = [
    {
      id: "1",
      clientName: "Acme Corporation",
      amount: "$2,500.00",
      status: "paid",
      dueDate: "Aug 15, 2024",
      invoiceNumber: "INV-001",
    },
    {
      id: "2",
      clientName: "Tech Solutions Ltd",
      amount: "$1,800.00",
      status: "pending",
      dueDate: "Sep 10, 2024",
      invoiceNumber: "INV-002",
    },
    {
      id: "3",
      clientName: "Creative Agency",
      amount: "$950.00",
      status: "overdue",
      dueDate: "Aug 25, 2024",
      invoiceNumber: "INV-003",
    },
    {
      id: "4",
      clientName: "Startup Inc",
      amount: "$3,200.00",
      status: "draft",
      dueDate: "Sep 20, 2024",
      invoiceNumber: "INV-004",
    },
  ];

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-neutral-100 text-neutral-600";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "checkmark-circle";
      case "pending":
        return "time";
      case "overdue":
        return "warning";
      case "draft":
        return "document-outline";
      default:
        return "document-outline";
    }
  };

  return (
    <View>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-primary-600">
          Recent Invoices
        </Text>
        <TouchableOpacity>
          <Text className="text-sm text-primary-500 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-3">
        {mockInvoices.map((invoice) => (
          <TouchableOpacity
            key={invoice.id}
            className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm"
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-base font-semibold text-primary-600">
                  {invoice.clientName}
                </Text>
                <Text className="text-sm text-neutral-600">
                  {invoice.invoiceNumber}
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-lg font-bold text-primary-600">
                  {invoice.amount}
                </Text>
                <Text className="text-xs text-neutral-500">
                  Due: {invoice.dueDate}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <View
                className={`flex-row items-center px-3 py-1 rounded-full ${getStatusColor(
                  invoice.status
                )}`}
              >
                <Ionicons
                  name={getStatusIcon(invoice.status) as any}
                  size={12}
                  color={
                    invoice.status === "paid"
                      ? "#16a34a"
                      : invoice.status === "pending"
                        ? "#ca8a04"
                        : invoice.status === "overdue"
                          ? "#dc2626"
                          : "#6b7280"
                  }
                />
                <Text
                  className={`text-xs font-medium ml-1 capitalize ${
                    invoice.status === "paid"
                      ? "text-green-800"
                      : invoice.status === "pending"
                        ? "text-yellow-800"
                        : invoice.status === "overdue"
                          ? "text-red-800"
                          : "text-neutral-600"
                  }`}
                >
                  {invoice.status}
                </Text>
              </View>

              <TouchableOpacity className="p-2">
                <Ionicons
                  name="ellipsis-horizontal"
                  size={16}
                  color="#8e8e8e"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
