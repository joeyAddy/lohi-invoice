import { Header } from "@/components/shared";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DefaultEmail() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Default Email Message"
        leftIcon="chevron-back"
        className="px-4 pt-2"
      />
      <View className="p-4">
        <Text>Default email message settings placeholder</Text>
      </View>
    </SafeAreaView>
  );
}
