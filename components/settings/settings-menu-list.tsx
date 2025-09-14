import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MenuItem } from "../../interfaces/settings";

type Props = {
  items?: MenuItem[];
  title?: string;
};

export default function SettingsMenuList({ items, title = "Setting" }: Props) {
  const router = useRouter();
  return (
    <View className="mt-6">
      <View className="px-2 pb-2">
        <Text className="text-2xl font-dm-sans-bold text-neutral-900">
          {title}
        </Text>
      </View>

      <View className="bg-gray-100 rounded-xs overflow-hidden border border-gray-200">
        {items?.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const iconBg = item.destructive ? "#ffecec" : undefined;
          const color = item.destructive ? "#c90000" : "#1b365d"; // destructive text/icon color
          const handlePress = async () => {
            if (item.isItemAPage && item.route) {
              router.push(item.route);
              return;
            }

            if (!item.isItemAPage && item.onPress) {
              try {
                await item.onPress();
              } catch (err) {
                console.warn("Settings item action failed", err);
              }
              return;
            }

            console.warn(
              "No route or action provided for settings item:",
              item.key
            );
          };

          return (
            <TouchableOpacity
              key={item.key}
              onPress={handlePress}
              activeOpacity={0.7}
              className="flex-row items-center px-4 py-3"
              style={
                !isLast
                  ? { borderBottomWidth: 1, borderBottomColor: "#e5e7eb" }
                  : undefined
              }
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: iconBg || "#f3f4f6" }}
              >
                <Ionicons name={item.icon as any} size={18} color={color} />
              </View>

              <View className="flex-1">
                <Text
                  style={{ color: item.destructive ? "#c90000" : undefined }}
                  className="text-base"
                >
                  {item.label}
                </Text>
              </View>

              <View className="w-8 h-8 items-center justify-center">
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={item.destructive ? "#c90000" : "#9ca3af"}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
