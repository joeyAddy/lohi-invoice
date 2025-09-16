import { Stack } from "expo-router";

export default function GeneralLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="language" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
