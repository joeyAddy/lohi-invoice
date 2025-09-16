import { Stack } from "expo-router";

export default function SecurityLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="app-lock" />
      <Stack.Screen name="biometrics" />
      <Stack.Screen name="password-security" />
    </Stack>
  );
}
