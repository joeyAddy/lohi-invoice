import React from "react";
import { Text, View } from "react-native";

interface OverflowAvatarProps {
  count: number;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
}

export default function OverflowAvatar({
  count,
  size = 40,
  borderColor = "#ffffff",
  borderWidth = 2,
}: OverflowAvatarProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth,
        borderColor,
        backgroundColor: "#1b365d", // primary-500 color
      }}
      className="items-center justify-center"
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: size * 0.3, // Responsive font size based on avatar size
          fontWeight: "600",
        }}
      >
        +{count}
      </Text>
    </View>
  );
}
