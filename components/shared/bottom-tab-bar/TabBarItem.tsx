import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TabBarItemProps {
  route: any;
  descriptors: any;
  navigation: any;
  state: any;
  index: number;
  tabWidth: number;
  isFocused: boolean;
}

export default function TabBarItem({
  route,
  descriptors,
  navigation,
  state,
  index,
  tabWidth,
  isFocused,
}: TabBarItemProps) {
  const { options } = descriptors[route.key];

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  const getIconName = () => {
    switch (route.name) {
      case "index":
        return isFocused ? "home" : "home-outline";
      case "invoices":
        return isFocused ? "receipt" : "receipt-outline";
      case "reports":
        return isFocused ? "bar-chart" : "bar-chart-outline";
      case "settings":
        return isFocused ? "settings" : "settings-outline";
      default:
        return "home-outline";
    }
  };

  const getLabel = () => {
    switch (route.name) {
      case "index":
        return "Home";
      case "invoices":
        return "Invoices";
      case "reports":
        return "Reports";
      case "settings":
        return "Settings";
      default:
        return route.name;
    }
  };

  if (isFocused) {
    // Active state: gray background on whole item, primary color background on icon only
    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        className="bg-gray-100 rounded-2xl min-w-[100px] flex-row items-center justify-between mx-1"
      >
        <View className="bg-primary-500 rounded-full w-14 h-14 items-center justify-center mr-2">
          <Ionicons name={getIconName() as any} size={18} color="#ffffff" />
        </View>
        <Text className="text-gray-700 pr-4 text-xs font-semibold">
          {getLabel()}
        </Text>
      </TouchableOpacity>
    );
  }

  // Inactive state: round gray background with dark gray border, icon only
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="bg-gray-100 rounded-full w-12 h-12 items-center justify-center mx-1"
    >
      <Ionicons name={getIconName() as any} size={22} color="#6b7280" />
    </TouchableOpacity>
  );
}
