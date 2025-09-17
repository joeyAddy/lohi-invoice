import React from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "../../lib/hooks/redux";
import { selectUser } from "../../lib/store/slices/authSlice";
import { Separator } from "../shared";

export default function InvoiceBusinessInfo() {
  const user = useAppSelector(selectUser);

  if (!user) {
    return null;
  }

  const displayName = `${user.firstName} ${user.lastName}`;
  const email = user.email;

  // Generate a dummy invoice number (in real app, this would come from settings/API)
  const invoiceNumber = `No.${Math.floor(Math.random() * 9000000) + 1000000}`;

  return (
    <View className="mx-4 mb-6">
      <View className="bg-gray-100 rounded-xs border border-gray-200 p-6 relative">
        {/* PAID Badge */}
        <View className="absolute top-0 right-0 bg-success-500 rounded-bl-xs rounded-tr-xs px-3 py-1">
          <Text className="text-white text-xs font-bold">VERIFIED</Text>
        </View>

        {/* Main Content Row */}
        <View className="flex-row items-center">
          {/* Business Info Section */}
          <View className="flex-1">
            <Text className="text-gray-600 text-b-2 font-medium mb-1">
              Business Info
            </Text>
            <Text className="text-gray-900 text-lg font-bold mb-3">
              {invoiceNumber}
            </Text>
            <Text className="text-gray-800 text-base font-medium mb-1">
              {displayName}
            </Text>
            <Text className="text-gray-600 text-sm mb-1">{email}</Text>
          </View>

          <Separator
            orientation="vertical"
            color="bg-gray-200"
            type="solid"
            height="100%"
            className="mx-4 h-full"
          />

          {/* Signature Section */}
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-600 text-sm font-medium mb-4">
              SIGNATURE
            </Text>

            {/* Signature placeholder */}
            <View className="items-center justify-center">
              <Text className="text-gray-800 text-3xl font-bold italic transform rotate-12">
                Prof
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
