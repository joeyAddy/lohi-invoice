import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { getCurrencyByCode } from "../../lib/data/currencies";
import type { RootState } from "../../lib/store";
import { formatCurrencySmart } from "../../lib/utils/currency";
import { Separator } from "../shared";

export interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface InvoiceItemDetailsCreateProps {
  items: InvoiceItem[];
  onAddItem: () => void;
  onEditItem?: (item: InvoiceItem) => void;
  onDeleteItem?: (itemId: string) => void;
}

export default function InvoiceItemDetailsCreate({
  onAddItem,
  items,
  onEditItem,
  onDeleteItem,
}: InvoiceItemDetailsCreateProps) {
  console.log("InvoiceItemDetailsCreate rendering with items:", items.length);

  // Get user's currency from Redux state
  const user = useSelector((state: RootState) => state.auth.user);

  // Determine currency code from user profile with fallback
  const currencyCode =
    user?.agency?.currency || user?.freelancer?.currency || "USD";

  // Get currency data with fallback
  const currency = getCurrencyByCode(currencyCode) || getCurrencyByCode("USD");

  console.log("Currency info:", { currencyCode, currency: currency?.symbol });

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  const calculateCharge = (subtotal: number) => {
    return subtotal * 0.04; // 4% charge
  };

  const calculateTotal = (subtotal: number, charge: number) => {
    return subtotal + charge;
  };

  const formatPrice = (price: number) => {
    // We should always have a currency at this point, but just in case
    if (!currency) {
      console.warn("No currency found, falling back to USD");
      return `$${price.toFixed(2)}`;
    }
    return formatCurrencySmart(price, currency);
  };

  if (items.length === 0) {
    return (
      <View className="mx-4 mb-6">
        {/* Section Title */}
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Item Details
        </Text>

        {/* Empty State Card */}
        <View className="bg-gray-100 rounded-xs p-6 border border-gray-200">
          <View className="items-center justify-center py-8">
            <FontAwesome
              name="list-ul"
              size={48}
              color="#6b7280"
              className="mb-4"
            />
            <Text className="text-gray-600 text-b-1 font-medium text-center mb-2">
              Add items to your invoice
            </Text>
            <Text className="text-gray-500 text-b-2 text-center mb-6">
              Add services, products or any billable items
            </Text>
            <TouchableOpacity
              onPress={onAddItem}
              className="bg-primary-500 px-6 py-3 rounded-xs flex-row items-center"
            >
              <FontAwesome name="plus" size={16} color="white" />
              <Text className="text-white font-medium ml-2">Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="mx-4 mb-6">
      {/* Section Title with Add Button */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-gray-900">Item Details</Text>
        <TouchableOpacity
          onPress={onAddItem}
          className="flex-row items-center bg-primary-500 px-4 py-2 rounded-xs"
        >
          <FontAwesome name="plus" size={14} color="white" />
          <Text className="text-white font-medium ml-2 text-sm">Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Items Card */}
      <View className="bg-gray-100 rounded-xs p-5 border border-gray-200">
        {/* Header Row */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 text-b-1 font-medium">Service</Text>
          <Text className="text-gray-600 text-b-1 font-medium">Cost</Text>
        </View>

        {/* Line Items */}
        <Separator
          orientation="horizontal"
          type="dashed"
          color="border-gray-300"
        />

        <View className="pt-2">
          {items.map((item, index) => (
            <View key={item.id}>
              <View className="flex-row justify-between items-start py-3">
                <View className="flex-1 mr-4">
                  <Text className="text-gray-900 text-b-1 font-semibold">
                    {item.name}
                  </Text>
                  {item.description && (
                    <Text className="text-gray-600 text-b-2 mt-1">
                      {item.description}
                    </Text>
                  )}
                </View>
                <View className="items-end">
                  <Text className="text-gray-900 text-b-1 font-medium mb-1">
                    {formatPrice(item.price)}
                  </Text>
                  {/* Action Buttons */}
                  <View className="flex-row items-center">
                    {onEditItem && (
                      <TouchableOpacity
                        onPress={() => onEditItem(item)}
                        className="p-1 mr-2 pt-1.5"
                      >
                        <FontAwesome
                          name="pencil-square-o"
                          size={16}
                          color="#6b7280"
                        />
                      </TouchableOpacity>
                    )}
                    {onDeleteItem && (
                      <TouchableOpacity
                        onPress={() => onDeleteItem(item.id)}
                        className="p-1"
                      >
                        <FontAwesome name="trash-o" size={16} color="#ef4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
              {index < items.length - 1 && (
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
          {(() => {
            try {
              console.log("Calculating totals for items:", items);
              const subtotal = calculateSubtotal();
              const charge = calculateCharge(subtotal);
              const total = calculateTotal(subtotal, charge);
              console.log("Calculations done:", { subtotal, charge, total });

              return (
                <>
                  {/* Subtotal */}
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-700 text-b-1 font-medium">
                      Subtotal
                    </Text>
                    <Text className="text-gray-900 text-b-1 font-medium">
                      {formatPrice(subtotal)}
                    </Text>
                  </View>

                  {/* Charge (4%) */}
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-gray-700 text-b-1 font-medium">
                      Charge (4%)
                    </Text>
                    <Text className="text-gray-900 text-b-1 font-medium">
                      {formatPrice(charge)}
                    </Text>
                  </View>

                  {/* Separator before total */}
                  <Separator
                    orientation="horizontal"
                    type="dashed"
                    color="border-gray-300"
                    className="mb-3"
                  />

                  {/* Total */}
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-900 text-b-1 font-bold">
                      Total Amount
                    </Text>
                    <Text className="text-gray-900 text-h-5 font-bold">
                      {formatPrice(total)}
                    </Text>
                  </View>
                </>
              );
            } catch (error) {
              console.error("Error in calculations:", error);
              return <Text>Error calculating totals</Text>;
            }
          })()}
        </View>
      </View>
    </View>
  );
}
