import { Stack } from "expo-router";

export default function BusinessLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="brand" />
      <Stack.Screen name="business-info" />
      <Stack.Screen name="default-email" />
      <Stack.Screen name="invoice-number" />
      <Stack.Screen name="payment-methods" />
      <Stack.Screen name="tax-settings" />
      <Stack.Screen name="template" />
      <Stack.Screen name="terms-conditions" />
    </Stack>
  );
}
