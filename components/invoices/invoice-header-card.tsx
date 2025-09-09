import React from "react";
import { Text, View } from "react-native";
import InvoiceActionButtons from "./invoice-action-buttons";

interface InvoiceHeaderCardProps {
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: string;
  status: "Open" | "Paid" | "Overdue" | "Draft";
  mockInvoiceData?: any; // Pass the entire invoice data for action handlers
}

export default function InvoiceHeaderCard({
  invoiceNumber,
  invoiceDate,
  totalAmount,
  status,
  mockInvoiceData,
}: InvoiceHeaderCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "Paid":
        return "●";
      case "Open":
        return "●";
      case "Overdue":
        return "●";
      case "Draft":
        return "●";
      default:
        return "●";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "Paid":
        return "text-green-500";
      case "Open":
        return "text-blue-500";
      case "Overdue":
        return "text-red-500";
      case "Draft":
        return "text-gray-500";
      default:
        return "text-blue-500";
    }
  };

  const handleShare = () => {
    console.log("Share invoice:", mockInvoiceData.id);
    // Implement share functionality
  };

  const handleEdit = () => {
    console.log("Edit invoice:", mockInvoiceData.id);
    // Navigate to edit invoice screen
    // router.push(`/invoices/edit/${mockInvoiceData.id}`);
  };

  return (
    <View className="mx-4 mb-6">
      <View className="bg-primary-500 justify-between rounded-xs p-6">
        {/* Invoice Number */}
        <Text className="text-white text-2xl font-bold mb-6">
          Invoice #{invoiceNumber}
        </Text>

        {/* Invoice Details Row */}
        <View className="flex-row justify-between mb-6">
          {/* Invoice Date */}
          <View>
            <Text className="text-white/80 text-sm mb-1">Invoice Date</Text>
            <Text className="text-white text-lg font-semibold">
              {invoiceDate}
            </Text>
          </View>

          {/* Total Amount */}
          <View className="items-center">
            <Text className="text-white/80 text-sm mb-1">Total Amount</Text>
            <Text className="text-white text-lg font-semibold">
              {totalAmount}
            </Text>
          </View>

          {/* Status */}
          <View className="items-end">
            <Text className="text-white/80 text-sm mb-1">Status</Text>
            <View className="flex-row items-center">
              <Text className={`text-md mr-1 ${getStatusColor()}`}>
                {getStatusIcon()}
              </Text>
              <Text className="text-white text-lg font-semibold">{status}</Text>
            </View>
          </View>
        </View>
        {/* Action Buttons */}
        <InvoiceActionButtons onShare={handleShare} onEdit={handleEdit} />
      </View>
    </View>
  );
}
