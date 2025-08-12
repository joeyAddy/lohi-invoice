import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import { cn } from "../../../lib/utils";

export interface CheckboxInputProps extends Omit<ViewProps, "className"> {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary";
}

const CheckboxInput = React.forwardRef<View, CheckboxInputProps>(
  (
    {
      label,
      checked = false,
      onCheckedChange,
      disabled = false,
      error,
      className,
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
      if (!disabled) {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onCheckedChange?.(newChecked);
      }
    };

    // Size configurations
    const sizeConfig = {
      sm: {
        checkbox: "w-4 h-4",
        icon: 14,
        text: "text-label-xs",
      },
      md: {
        checkbox: "w-5 h-5",
        icon: 16,
        text: "text-label-m",
      },
      lg: {
        checkbox: "w-6 h-6",
        icon: 18,
        text: "text-label-m",
      },
    };

    // Container classes
    const containerClasses = cn("flex-row items-center gap-2xs", className);

    // Checkbox container classes
    const checkboxClasses = cn(
      "border rounded-2xs flex items-center justify-center",
      sizeConfig[size].checkbox,
      {
        // Checked states
        "bg-primary-500 border-primary-500":
          isChecked && !disabled && variant === "primary",
        "bg-secondary-500 border-secondary-500":
          isChecked && !disabled && variant === "default",

        // Unchecked states
        "bg-transparent border-neutral-300": !isChecked && !disabled && !error,
        "bg-transparent border-error-500": !isChecked && !disabled && error,

        // Disabled states
        "bg-neutral-200 border-neutral-200": disabled && isChecked,
        "bg-transparent border-neutral-200": disabled && !isChecked,
      }
    );

    // Label classes
    const labelClasses = cn("font-semibold", sizeConfig[size].text, {
      "text-primary": !disabled && !error,
      "text-error-500": !disabled && error,
      "text-neutral-500": disabled,
    });

    // Error text classes
    const errorTextClasses = "text-xs text-error-500 mt-2xs";

    // Icon color
    const getIconColor = () => {
      if (disabled) return "#bbbbbb"; // neutral-400
      return "#ffffff"; // white for contrast
    };

    return (
      <View ref={ref} {...props}>
        <TouchableOpacity
          className={containerClasses}
          onPress={handleToggle}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <View className={checkboxClasses}>
            {isChecked && (
              <Ionicons
                name="checkmark"
                size={sizeConfig[size].icon}
                color={getIconColor()}
              />
            )}
          </View>

          {label && <Text className={labelClasses}>{label}</Text>}
        </TouchableOpacity>

        {error && <Text className={errorTextClasses}>{error}</Text>}
      </View>
    );
  }
);

CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
