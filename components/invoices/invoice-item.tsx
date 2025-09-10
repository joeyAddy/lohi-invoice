import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ClientAvatar } from "../home";
import StatusBadge from "./status-badge";

interface InvoiceItemProps {
  id: string;
  clientName: string;
  clientEmail: string;
  clientAvatar: string;
  amount: string;
  invoiceNumber: string;
  date: string;
  status: "Paid" | "Unpaid" | "Over Due" | "Draft";
  onPress?: () => void;
}

export default function InvoiceItem({
  id,
  clientName,
  clientEmail,
  clientAvatar,
  amount,
  invoiceNumber,
  date,
  status,
  onPress,
}: InvoiceItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-100 rounded-xs p-4 mb-4"
      activeOpacity={0.7}
    >
      {/* Top Section - Client Info and Status */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <ClientAvatar
            imageUri={clientAvatar}
            size={44}
            borderColor="#ffffff"
            borderWidth={2}
          />
          <View className="ml-3 flex-1">
            <Text className="text-gray-900 text-b-1 font-dm-sans-bold mb-1">
              {clientName}
            </Text>
            <Text className="text-gray-500 text-b-3 font-dm-sans">
              {clientEmail}
            </Text>
          </View>
        </View>
        <StatusBadge status={status} />
      </View>

      {/* Bottom Section - Invoice Details */}
      <View className="flex-row justify-between p-4 bg-gray-200 rounded-xs border border-gray-300">
        <View>
          <Text className="text-gray-500 text-label-s font-dm-sans mb-1">
            Amount
          </Text>
          <Text className="text-gray-900 text-b-1 font-dm-sans-bold">
            {amount}
          </Text>
        </View>

        <View>
          <Text className="text-gray-500 text-label-s font-dm-sans mb-1">
            No
          </Text>
          <Text className="text-gray-900 text-b-1 font-dm-sans-bold">
            {invoiceNumber}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-gray-500 text-label-s font-dm-sans mb-1">
            Date
          </Text>
          <Text className="text-gray-900 text-b-1 font-dm-sans-bold">
            {date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
