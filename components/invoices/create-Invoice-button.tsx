import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function CreateInvoiceButton() {
  const handleCreateInvoice = () => {
    // TODO: Navigate to create invoice screen
    console.log("Create new invoice");
  };

  return (
    <View className="absolute bottom-6 right-4">
      <TouchableOpacity
        onPress={handleCreateInvoice}
        className="bg-primary-500 rounded-full w-14 h-14 items-center justify-center shadow-lg"
        style={{
          shadowColor: "#1b365d",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
