import React from "react";
import { Text, View } from "react-native";

interface LineItemData {
  id: string;
  description: string;
  cost: string;
}

interface InvoiceItemDetailsProps {
  lineItems: LineItemData[];
  totalAmount: string;
}

export default function InvoiceItemDetails({
  lineItems,
  totalAmount,
}: InvoiceItemDetailsProps) {
  return (
    <View className="mx-4 mb-6">
      {/* Section Title */}
      <Text className="text-gray-900 text-sm font-semibold mb-3">
        Item Details
      </Text>

      {/* Items Card */}
      <View className="bg-gray-100 rounded-xs p-5">
        {/* Header Row */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 text-lg font-medium">Deliverable</Text>
          <Text className="text-gray-600 text-lg font-medium">Cost</Text>
        </View>

        {/* Line Items */}
        <View className="border-t border-gray-200 pt-1">
          {lineItems.map((item, index) => (
            <View key={item.id}>
              <View className="flex-row justify-between items-center py-3">
                <Text className="text-gray-700 text-base flex-1 mr-4">
                  {item.description}
                </Text>
                <Text className="text-gray-900 text-base font-semibold">
                  {item.cost}
                </Text>
              </View>
              {index < lineItems.length - 1 && (
                <View className="border-t border-gray-200" />
              )}
            </View>
          ))}
        </View>

        {/* Total Amount */}
        <View className="border-t border-gray-200 pt-4 mt-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-900 text-lg font-bold">
              Total Amount
            </Text>
            <Text className="text-gray-900 text-xl font-bold">
              {totalAmount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
