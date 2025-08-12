import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { cn } from "../../../lib/utils";

export interface DefaultInputProps extends Omit<TextInputProps, "className"> {
  placeholder?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

const DefaultInput = React.forwardRef<TextInput, DefaultInputProps>(
  (
    {
      placeholder,
      error,
      leftIcon,
      className,
      inputClassName,
      disabled = false,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
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

    return (
      <View className={containerClasses}>
        <View className={inputContainerClasses}>
          {leftIcon && <View className="mr-3xs">{leftIcon}</View>}

          <TextInput
            ref={ref}
            className={inputTextClasses}
            placeholder={placeholder}
            placeholderTextColor="#a4a4a4" // neutral-500
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            {...props}
          />
        </View>

        {error && <Text className={errorTextClasses}>{error}</Text>}
      </View>
    );
  }
);

DefaultInput.displayName = "DefaultInput";

export default DefaultInput;
