import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface InvoiceCardProps {
  title: string;
  amount: string;
  createdDate: string;
  status: "Open" | "Paid" | "Overdue" | "Draft";
  onPress?: () => void;
}

export default function InvoiceCard({
  title,
  amount,
  createdDate,
  status,
  onPress,
}: InvoiceCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Open":
        return "bg-blue-500";
      case "Paid":
        return "bg-green-500";
      case "Overdue":
        return "bg-red-500";
      case "Draft":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xs p-4 mb-3 border border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        {/* Invoice Icon */}
        <View className="bg-primary-100/30 rounded-full p-3 mr-4">
          <Ionicons name="document-text" size={24} color="#1b365d" />
        </View>

        {/* Invoice Details */}
        <View className="flex-1">
          <Text className="text-gray-900 text-lg font-semibold mb-1">
            {title}
          </Text>
          <Text className="text-gray-500 text-sm">Created: {createdDate}</Text>
        </View>

        {/* Amount and Status */}
        <View className="items-end">
          <Text className="text-gray-900 text-lg font-bold mb-1">{amount}</Text>
          <View className="flex-row items-center">
            <View className={`w-2 h-2 rounded-full ${getStatusColor()} mr-2`} />
            <Text className="text-gray-600 text-sm font-medium">{status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
