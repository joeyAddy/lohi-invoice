import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, Pressable, Text, TouchableOpacity, View } from "react-native";
import { cn } from "../../lib/utils";

interface TermsAgreementProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
  hasSubmitted?: boolean;
  termsUrl?: string;
  privacyUrl?: string;
  className?: string;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({
  checked,
  onCheckedChange,
  error,
  hasSubmitted = false,
  termsUrl = "https://yourwebsite.com/terms",
  privacyUrl = "https://yourwebsite.com/privacy",
  className,
}) => {
  const handleTermsPress = () => {
    Linking.openURL(termsUrl);
  };

  const handlePrivacyPress = () => {
    Linking.openURL(privacyUrl);
  };

  const handleToggle = () => {
    onCheckedChange(!checked);
  };

  // Container classes
  const containerClasses = cn("flex-row items-start gap-3", className);

  // Checkbox container classes
  const checkboxClasses = cn(
    "border rounded-2xs flex items-center justify-center w-5 h-5",
    {
      // Checked states
      "bg-primary-500 border-primary-500/50": checked,
      // Unchecked states
      "bg-transparent border-neutral-300": !checked && !error,
      "bg-transparent border-error-500": !checked && error,
    }
  );

  // Error text classes
  const errorTextClasses = "text-xs text-error-500 mt-2";

  // Icon color
  const getIconColor = () => {
    return "#ffffff"; // white for contrast
  };

  return (
    <View className={containerClasses}>
      <TouchableOpacity
        className="flex-row items-center justify-start gap-3"
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <View className={checkboxClasses}>
          {checked && (
            <Ionicons name="checkmark" size={16} color={getIconColor()} />
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row flex-wrap items-center">
            <Text className="text-b-2 text-gray-600">I agree to the </Text>
            <Pressable onPress={handleTermsPress}>
              <Text className="text-b-2 text-primary-500 underline">
                Terms & Conditions
              </Text>
            </Pressable>
            <Text className="text-b-2 text-gray-600"> and </Text>
            <Pressable onPress={handlePrivacyPress}>
              <Text className="text-b-2 text-primary-500 underline">
                Privacy Policy
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
      {error && <Text className={errorTextClasses}>{error}</Text>}
    </View>
  );
};

export default TermsAgreement;
