import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export interface HeaderProps {
  title?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onPressLeftIcon?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onPressRightIcon?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  onPressLeftIcon,
  rightIcon,
  onPressRightIcon,
  className = "",
}) => {
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      {/* Left side */}
      <View className="w-12 h-12">
        {leftIcon && (
          <Pressable
            onPress={onPressLeftIcon}
            className="w-12 h-12 bg-gray-100 rounded-xs items-center justify-center"
          >
            <Ionicons name={leftIcon} size={20} color="#374151" />
          </Pressable>
        )}
      </View>

      {/* Center title */}
      {title && (
        <Text className="text-h-5 text-center flex-1 mx-4">{title}</Text>
      )}

      {/* Right side */}
      <View className="w-12 h-12">
        {rightIcon && (
          <Pressable
            onPress={onPressRightIcon}
            className="w-12 h-12 bg-gray-100 rounded-xs items-center justify-center"
          >
            <Ionicons name={rightIcon} size={20} color="#374151" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Header;
