import { Header } from "@/components/shared";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BusinessInfo() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Business Info"
        leftIcon="chevron-back"
        className="px-4 pt-2"
      />
      <View className="p-4">
        <Text>Business Info settings placeholder</Text>
      </View>
    </SafeAreaView>
  );
}
