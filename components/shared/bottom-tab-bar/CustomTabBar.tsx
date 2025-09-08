import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import TabBarItem from "./TabBarItem";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="absolute bottom-6 left-5 right-5 bg-white rounded-3xl h-[70px] flex-row items-center justify-between px-2 py-2 shadow-xl">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tabWidth = 100 / state.routes.length;

        return (
          <TabBarItem
            key={route.key}
            route={route}
            descriptors={descriptors}
            navigation={navigation}
            state={state}
            index={index}
            tabWidth={tabWidth}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
}
