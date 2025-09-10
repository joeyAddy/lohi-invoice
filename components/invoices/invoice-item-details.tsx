import React from "react";
import { Text, View } from "react-native";
import { Separator } from "../../components/shared";

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
      <Text className="text-gray-900 text-h-6 font-dm-sans-bold mb-4">
        Item Details
      </Text>

      {/* Items Card */}
      <View className="bg-gray-100 rounded-xs p-5">
        {/* Header Row */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 text-xl font-dm-sans-medium">
            Deliverable
          </Text>
          <Text className="text-gray-600 text-xl font-dm-sans-medium">
            Cost
          </Text>
        </View>

        {/* Line Items */}
        <Separator
          orientation="horizontal"
          type="dashed"
          color="border-gray-300"
        />

        <View className="pt-2">
          {lineItems.map((item, index) => (
            <View key={item.id}>
              <View className="flex-row justify-between items-center py-3">
                <Text className="text-gray-700 text-b-1 font-dm-sans flex-1 mr-4">
                  {item.description}
                </Text>
                <Text className="text-gray-900 text-b-1 font-dm-sans-medium">
                  {item.cost}
                </Text>
              </View>
              {index < lineItems.length - 1 && (
                <Separator
                  orientation="horizontal"
                  type="dashed"
                  color="border-gray-300"
                  className="my-1"
                />
              )}
            </View>
          ))}
        </View>

        {/* Total Amount */}
        <Separator
          orientation="horizontal"
          type="dashed"
          color="border-gray-300"
          className="my-2"
        />

        <View className="pt-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-900 text-label-l font-dm-sans-bold">
              Total Amount
            </Text>
            <Text className="text-gray-900 text-h-5 font-dm-sans-bold">
              {totalAmount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
