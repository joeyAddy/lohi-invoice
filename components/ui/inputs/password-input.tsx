import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { cn } from "../../../lib/utils";

export interface PasswordInputProps
  extends Omit<TextInputProps, "className" | "secureTextEntry"> {
  placeholder?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  isTheUserSettingANewPassword?: boolean;
}

const PasswordInput = React.forwardRef<TextInput, PasswordInputProps>(
  (
    {
      placeholder = "Enter your password",
      error,
      className,
      inputClassName,
      disabled = false,
      showPasswordToggle = true,
      isTheUserSettingANewPassword = false,
      onFocus,
      onBlur,
      onChangeText,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
      if (!disabled) {
        setIsPasswordVisible(!isPasswordVisible);
      }
    };

    const handleChangeText = (text: string) => {
      setPassword(text);
      onChangeText?.(text);
    };

    // Password strength calculation
    const getPasswordStrength = () => {
      if (!password) return 0;

      let strength = 0;
      // At least 6 characters
      if (password.length >= 6) strength++;
      // Contains both letters and numbers
      if (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) strength++;
      // Contains special characters
      if (/[^a-zA-Z0-9]/.test(password)) strength++;

      return strength;
    };

    const passwordStrength = getPasswordStrength();

    // Container classes
    const containerClasses = cn("flex-col gap-2xs", className);

    // Input container classes
    const inputContainerClasses = cn(
      "flex-row items-center border rounded-xs px-xs h-14",
      {
        // Focus state
        "border-success-500 border-[1.5px]": isFocused && !error && !disabled,
        // Error state
        "border-error-500": error && !disabled,
        // Default state
        "border-primary": !isFocused && !error && !disabled,
        // Disabled state
        "border-neutral-200 bg-neutral-200": disabled,
      }
    );

    // Input text classes
    const inputTextClasses = cn(
      "flex-1 text-label-m text-neutral-900",
      "placeholder:text-neutral-500",
      {
        "text-neutral-600": disabled,
      },
      inputClassName
    );

    // Error text classes
    const errorTextClasses = "text-label-xs text-error-500 mt-3xs";

    // Toggle button classes
    const toggleButtonClasses = cn("p-2xs rounded-2xs", {
      "opacity-50": disabled,
    });

    // Strength bar classes
    const strengthBarClasses = (index: number) => {
      if (passwordStrength === 0) return "bg-neutral-300";
      if (index === 0) {
        return passwordStrength >= 1
          ? passwordStrength === 1
            ? "bg-error-500"
            : passwordStrength >= 3
              ? "bg-success-500"
              : "bg-warning-500"
          : "bg-neutral-300";
      }
      if (index === 1) {
        return passwordStrength >= 2
          ? passwordStrength === 2
            ? "bg-warning-500"
            : "bg-success-500"
          : "bg-neutral-300";
      }
      if (index === 2) {
        return passwordStrength >= 3 ? "bg-success-500" : "bg-neutral-300";
      }
      return "bg-neutral-300";
    };

    return (
      <View className={containerClasses}>
        <View className={inputContainerClasses}>
          {/* Lock Icon */}
          <View className="mr-3xs">
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={
                disabled
                  ? "#bbbbbb" // neutral-400
                  : error && !disabled
                    ? "#d10000" // error-500
                    : "#102138" // neutral-600
              }
            />
          </View>

          {/* Text Input */}
          <TextInput
            ref={ref}
            className={inputTextClasses}
            placeholder={placeholder}
            placeholderTextColor="#a4a4a4" // neutral-500
            secureTextEntry={!isPasswordVisible}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            onChangeText={handleChangeText}
            value={password}
            {...props}
          />

          {/* Password Toggle Button */}
          {showPasswordToggle && (
            <TouchableOpacity
              className={toggleButtonClasses}
              onPress={togglePasswordVisibility}
              disabled={disabled}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={disabled ? "#bbbbbb" : "#8e8e8e"} // neutral-400 : neutral-600
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Password Strength Indicator */}
        {isTheUserSettingANewPassword && (
          <View className="flex-row gap-2xs h-1 mt-3xs self-center w-[95%]">
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                className={cn("flex-1 rounded-xs", strengthBarClasses(index))}
              />
            ))}
          </View>
        )}

        {error && <Text className={errorTextClasses}>{error}</Text>}
      </View>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
