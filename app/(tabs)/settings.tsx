import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsHeader from "../../components/settings/SettingsHeader";
import SettingsMenuList from "../../components/settings/SettingsMenuList";
import SettingsProfile from "../../components/settings/SettingsProfile";

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <SettingsHeader />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <SettingsProfile />
        <SettingsMenuList />
      </ScrollView>
    </SafeAreaView>
  );
}
