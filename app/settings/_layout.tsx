import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* User Profile Edit */}
      <Stack.Screen name="user-profile-edit" />

      {/* Business Settings Group */}
      <Stack.Screen name="(business)" />

      {/* Security Settings Group */}
      <Stack.Screen name="(security)" />

      {/* General Settings Group */}
      <Stack.Screen name="(general)" />

      {/* More Settings Group */}
      <Stack.Screen name="(more)" />
    </Stack>
  );
}
