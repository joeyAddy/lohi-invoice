import React from "react";
import { Text, View } from "react-native";

interface StatusBadgeProps {
  status: "Paid" | "Unpaid" | "Over Due" | "Draft";
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Paid":
        return {
          containerClass: "bg-success-200/60",
          textClass: "text-success-700",
        };
      case "Unpaid":
        return {
          containerClass: "bg-warning-200/60",
          textClass: "text-warning-700",
        };
      case "Over Due":
        return {
          containerClass: "bg-error-200/60",
          textClass: "text-error-700",
        };
      case "Draft":
        return {
          containerClass: "bg-blue-200/60",
          textClass: "text-blue-700",
        };
      default:
        return {
          containerClass: "bg-blue-200/60",
          textClass: "text-blue-700",
        };
    }
  };

  const { containerClass, textClass } = getStatusStyles();
  const sizeClass = size === "sm" ? "px-2 py-1" : "px-3 py-1.5";
  const textSizeClass = size === "sm" ? "text-xs" : "text-sm";

  return (
    <View className={`${containerClass} ${sizeClass} rounded-full`}>
      <Text className={`${textClass} ${textSizeClass} font-dm-sans-medium`}>
        {status}
      </Text>
    </View>
  );
}
