import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="agency-info" />
      <Stack.Screen name="freelancer-info" />
      <Stack.Screen name="business-logo" />
      <Stack.Screen name="invoice-template" />
    </Stack>
  );
}
