import React from "react";
import { View } from "react-native";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  type?: "solid" | "dashed";
  color?: string;
  thickness?: number;
  className?: string;
}

export default function Separator({
  orientation = "horizontal",
  type = "solid",
  color = "#FFFFFF33", // Hex white with 20% alpha
  thickness = 1,
  className = "",
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";
  const isDashed = type === "dashed";

  // Check if color is a Tailwind class (starts with border- or text-) or hex/named color
  const isColorClass =
    color.startsWith("border-") ||
    color.startsWith("text-") ||
    color.startsWith("bg-");
  const actualColor = isColorClass ? undefined : color;

  if (isDashed) {
    // For dashed borders, use border style
    const borderColor = isColorClass ? undefined : color;
    return (
      <View
        className={isColorClass ? `${color} ${className}` : className}
        style={{
          borderStyle: "dashed",
          [isHorizontal ? "borderTopWidth" : "borderLeftWidth"]: thickness,
          ...(isHorizontal ? { width: "100%" } : { height: 40 }),
          ...(borderColor && {
            [isHorizontal ? "borderTopColor" : "borderLeftColor"]: borderColor,
          }),
        }}
      />
    );
  }

  // For solid separators, use background color with proper dimensions
  const solidStyle = {
    ...(orientation === "horizontal"
      ? { height: thickness, width: "100%" as const }
      : { width: thickness, height: 40 }),
    ...(actualColor && { backgroundColor: actualColor }),
  };

  return (
    <View
      className={isColorClass ? `${color} ${className}` : className}
      style={solidStyle}
    />
  );
}
