import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export interface BadgeProps {
  text: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  leftIcon,
  variant = "secondary",
  size = "md",
  className = "",
}) => {
  const variantClasses = {
    primary: "bg-primary-500",
    secondary: "bg-gray-100",
    outline: "border border-gray-300 bg-transparent",
  };

  const textColorClasses = {
    primary: "text-white",
    secondary: "text-gray-600",
    outline: "text-gray-600",
  };

  const sizeClasses = {
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-3 px-6",
  };

  const textSizeClasses = {
    sm: "text-b-3",
    md: "text-b-2",
    lg: "text-b-1",
  };

  const iconSizeMap = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  return (
    <View
      className={`rounded-full self-start flex-row items-center gap-1 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {leftIcon && (
        <Ionicons
          name={leftIcon}
          size={iconSizeMap[size]}
          color={variant === "primary" ? "#ffffff" : "#6b7280"}
        />
      )}
      <Text className={`${textSizeClasses[size]} ${textColorClasses[variant]}`}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;
