import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { cn } from "../../lib/utils";

export interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  imageIcon?: ImageProps["source"];
  isLoading?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      disabled,
      imageIcon,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "rounded-xs font-medium text-center items-center justify-center";

    const variantClasses = {
      primary: "bg-primary-500 active:bg-primary-600",
      outline: "border border-primary-500 bg-transparent active:bg-primary-100",
    };

    const sizeClasses = {
      sm: "px-2xs h-12",
      md: "px-xs h-14",
      lg: "px-s h-16",
    };

    const textColorClasses = {
      primary: "text-neutral-100",
      outline: "text-primary-500",
    };

    const textSizeClasses = {
      sm: "text-label-xs",
      md: "text-label-s",
      lg: "text-label-m",
    };

    const imageSizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    const disabledClasses = disabled || isLoading ? "opacity-50" : "";

    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabledClasses,
      className
    );

    const textClasses = cn(
      "font-semibold text-b-1",
      textColorClasses[variant],
      textSizeClasses[size]
    );

    const getSpinnerColor = () => {
      return variant === "primary" ? "#ffffff" : "#3B82F6"; // white for primary, primary-500 for outline
    };

    const getSpinnerSize = () => {
      const sizes = {
        sm: 16,
        md: 20,
        lg: 24,
      };
      return sizes[size];
    };

    return (
      <TouchableOpacity
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        <View className="flex-row items-center justify-center gap-2xs">
          {isLoading ? (
            <FontAwesome
              name="spinner"
              size={getSpinnerSize()}
              color={getSpinnerColor()}
            />
          ) : (
            <>
              {imageIcon && (
                <Image
                  source={imageIcon}
                  className={imageSizeClasses[size]}
                  resizeMode="contain"
                />
              )}
              <Text className={textClasses}>{children}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

export default Button;
