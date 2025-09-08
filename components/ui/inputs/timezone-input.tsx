import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getAllTimezones, TimezoneData } from "../../../lib/data/timezones";
import { cn } from "../../../lib/utils";
import TimezoneSelectionSheet from "../sheets/timezone-selection-sheet";

interface TimezoneSelectionSheetRef {
  present: () => void;
  dismiss: () => void;
  focusSearchInput: () => void;
}

interface TimezoneInputProps {
  value?: TimezoneData;
  onChangeTimezone: (timezone: TimezoneData) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  timezones?: TimezoneData[];
  variant?: "default" | "minimal";
}

const TimezoneInput: React.FC<TimezoneInputProps> = ({
  value,
  onChangeTimezone,
  placeholder = "Select a Time Zone",
  error,
  disabled = false,
  className,
  label = "Timezone",
  timezones = getAllTimezones(),
  variant = "default",
}) => {
  const bottomSheetModalRef = useRef<TimezoneSelectionSheetRef>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered timezones based on search
  const filteredTimezones = useMemo(() => {
    if (!searchQuery) return timezones;
    return timezones.filter(
      (timezone) =>
        timezone.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        timezone.value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [timezones, searchQuery]);

  const handleOpenSheet = useCallback(() => {
    if (disabled) return;
    bottomSheetModalRef.current?.present();
  }, [disabled]);

  const handleSelectTimezone = useCallback(
    (timezone: TimezoneData) => {
      onChangeTimezone(timezone);
      bottomSheetModalRef.current?.dismiss();
    },
    [onChangeTimezone]
  );

  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setSearchQuery("");
  }, []);

  return (
    <View className={cn("w-full", className)}>
      {variant === "minimal" && (
        <Text className="text-b-2 text-gray-600 mb-1">Time Zone *</Text>
      )}

      {label && variant === "default" && (
        <Text className="text-b-2 text-gray-600 mb-2">{label}</Text>
      )}

      <TouchableOpacity
        onPress={handleOpenSheet}
        disabled={disabled}
        className={cn(
          variant === "default" &&
            "flex-row items-center justify-between py-3 px-4 border border-gray-300 rounded-xs bg-white",
          variant === "minimal" && "flex-row items-center justify-between",
          disabled && variant === "default" && "bg-gray-100 opacity-50",
          error && variant === "default" && "border-red-500"
        )}
      >
        <View className="flex-1">
          {value ? (
            variant === "minimal" ? (
              <Text className="text-b-1 text-gray-900 font-bold">
                {value.label}
              </Text>
            ) : (
              <View>
                <Text className="text-b-1 text-gray-900 font-medium">
                  {value.label}
                </Text>
                <Text className="text-b-2 text-gray-600">{value.value}</Text>
              </View>
            )
          ) : (
            <Text
              className={cn(
                "text-b-1 text-gray-500",
                variant === "minimal" && "font-bold"
              )}
            >
              {placeholder}
            </Text>
          )}
        </View>

        <Ionicons
          name={variant === "minimal" ? "chevron-forward" : "chevron-down"}
          size={20}
          color={disabled ? "#a4a4a4" : "#6b7280"}
        />
      </TouchableOpacity>

      {error && <Text className="text-red-500 text-b-2 mt-1">{error}</Text>}

      <TimezoneSelectionSheet
        ref={bottomSheetModalRef}
        timezones={timezones}
        filteredTimezones={filteredTimezones}
        selectedTimezone={value || timezones[0]}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTimezoneSelect={handleSelectTimezone}
        onClose={handleCloseSheet}
      />
    </View>
  );
};

export default TimezoneInput;
