import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GENERAL_SETTINGS,
  MORE_SETTINGS,
} from "../../components/settings/menu-constants";
import SettingsMenuList from "../../components/settings/settings-menu-list";
// SettingsProfileEdit (dash-case filename)
import { Header } from "@/components/shared";
import SettingsProfileEdit from "../../components/settings/settings-profile-edit";

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Settings" leftIcon="chevron-back" className="px-4 pt-2" />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <SettingsProfileEdit />
        <SettingsMenuList items={GENERAL_SETTINGS} title="General" />
        <SettingsMenuList items={MORE_SETTINGS} title="More" />
      </ScrollView>
    </SafeAreaView>
  );
}
