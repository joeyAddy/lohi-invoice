import { cn } from "@/lib/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TextInput, View } from "react-native";

interface OtpInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  length?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  inputClassName?: string;
}

export interface OtpInputRef {
  focus: () => void;
}

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(
  (
    {
      otp,
      setOtp,
      length = 4,
      autoFocus = true,
      disabled = false,
      error = false,
      className = "",
      inputClassName = "",
    },
    ref
  ) => {
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Expose focus method to parent component
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      },
    }));

    // Auto-focus first input on mount
    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        // Small delay to ensure component is mounted
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 50);
      }
    }, [autoFocus]);

    // Handle focus
    const handleFocus = (index: number) => {
      setFocusedIndex(index);
    };

    // Handle blur
    const handleBlur = () => {
      setFocusedIndex(null);
    };

    // Handle OTP input change
    const handleOtpChange = (value: string, index: number) => {
      // Handle paste scenario (multiple characters)
      if (value.length > 1) {
        handlePaste(value, index);
        return;
      }

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    // Handle backspace
    const handleKeyPress = (key: string, index: number) => {
      if (key === "Backspace" && !otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    };

    // Handle paste
    const handlePaste = (pastedText: string, index: number) => {
      const pastedDigits = pastedText.replace(/\D/g, "").slice(0, length);
      const newOtp = [...otp];

      for (let i = 0; i < pastedDigits.length && index + i < length; i++) {
        newOtp[index + i] = pastedDigits[i];
      }

      setOtp(newOtp);

      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex(
        (digit, i) => i > index && digit === ""
      );
      const focusIndex =
        nextEmptyIndex !== -1
          ? nextEmptyIndex
          : Math.min(index + pastedDigits.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    };

    return (
      <View className={`flex-row justify-between ${className}`}>
        {Array.from({ length }, (_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            className={cn(
              "w-[60px] h-[60px] text-center rounded-xs border text-label-l font-semibold",
              {
                // Focus state - matches default input
                "border-primary-300 bg-primary-100/70":
                  focusedIndex === index && !error && !disabled,
                // Error state - matches default input
                "border-error-500": error && !disabled,
                // Default state - matches default input
                "border-primary": focusedIndex !== index && !error && !disabled,
                // Disabled state - matches default input
                "border-neutral-200 bg-neutral-200 text-neutral-600": disabled,
              }
            )}
            value={otp[index]}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            keyboardType="number-pad"
            maxLength={1}
            textContentType="oneTimeCode"
            editable={!disabled}
            autoComplete="one-time-code"
          />
        ))}
      </View>
    );
  }
);

OtpInput.displayName = "OtpInput";

export default OtpInput;
