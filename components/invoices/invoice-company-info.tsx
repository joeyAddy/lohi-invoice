import React from "react";
import { Text, View } from "react-native";

interface InvoiceCompanyInfoProps {
  fromCompany: string;
  taxId: string;
}

export default function InvoiceCompanyInfo({
  fromCompany,
  taxId,
}: InvoiceCompanyInfoProps) {
  return (
    <View className="mx-4 mb-6">
      <View className="bg-gray-100 rounded-xs p-5">
        <View className="flex-row justify-between">
          {/* From Company */}
          <View>
            <Text className="text-gray-600 text-label-s font-dm-sans mb-1">
              From
            </Text>
            <Text className="text-gray-900 text-b-1 font-dm-sans-medium">
              {fromCompany}
            </Text>
          </View>

          {/* Tax ID */}
          <View className="items-end">
            <Text className="text-gray-600 text-label-s font-dm-sans mb-1">
              TAX ID
            </Text>
            <Text className="text-gray-900 text-b-1 font-dm-sans-medium">
              {taxId}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
