import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface InvoiceActionButtonsProps {
  onShare?: () => void;
  onEdit?: () => void;
}

export default function InvoiceActionButtons({
  onShare,
  onEdit,
}: InvoiceActionButtonsProps) {
  return (
    <View className="flex-row gap-4">
      {/* Share Button */}
      <TouchableOpacity
        onPress={onShare}
        className="flex-1 bg-primary-400 rounded-xs py-2 flex-row items-center justify-center"
        activeOpacity={0.8}
      >
        <Ionicons name="share-outline" size={20} color="white" />
        <Text className="text-white text-lg font-semibold ml-2">Share</Text>
      </TouchableOpacity>

      {/* Edit Button */}
      <TouchableOpacity
        onPress={onEdit}
        className="flex-1 bg-white border-2 border-primary-500 rounded-xs py-2 flex-row items-center justify-center"
        activeOpacity={0.8}
      >
        <Ionicons name="create-outline" size={20} color="#1b365d" />
        <Text className="text-primary-500 text-lg font-semibold ml-2">
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
