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
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

    // Container classes
    const containerClasses = cn("flex-col gap-2xs", className);

    // Input container classes
    const inputContainerClasses = cn(
      "flex-row items-center border rounded-xs px-xs h-14",
      {
        // Focus state
        "border-success-500": isFocused && !error && !disabled,
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
                    : "#8e8e8e" // neutral-600
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

        {error && <Text className={errorTextClasses}>{error}</Text>}
      </View>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
