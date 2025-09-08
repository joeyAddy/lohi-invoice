import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CurrencyData, getAllCurrencies } from "../../../lib/data/currencies";
import { cn } from "../../../lib/utils";
import CurrencySelectionSheet from "../sheets/currency-selection-sheet";

interface CurrencySelectionSheetRef {
  present: () => void;
  dismiss: () => void;
  focusSearchInput: () => void;
}

interface CurrencyInputProps {
  value?: CurrencyData;
  onChangeCurrency: (currency: CurrencyData) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  currencies?: CurrencyData[];
  variant?: "default" | "minimal";
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChangeCurrency,
  placeholder = "Select a Currency",
  error,
  disabled = false,
  className,
  label = "Currency",
  currencies = getAllCurrencies(),
  variant = "default",
}) => {
  const bottomSheetModalRef = useRef<CurrencySelectionSheetRef>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered currencies based on search
  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return currencies;
    return currencies.filter(
      (currency) =>
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currencies, searchQuery]);

  const handleOpenSheet = useCallback(() => {
    if (disabled) return;
    bottomSheetModalRef.current?.present();
  }, [disabled]);

  const handleSelectCurrency = useCallback(
    (currency: CurrencyData) => {
      onChangeCurrency(currency);
      bottomSheetModalRef.current?.dismiss();
    },
    [onChangeCurrency]
  );

  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setSearchQuery("");
  }, []);

  return (
    <View className={cn("w-full", className)}>
      {variant === "minimal" && (
        <Text className="text-b-2 text-gray-600 mb-1">Currency *</Text>
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
        <View className="flex-row items-center flex-1">
          {value ? (
            variant === "minimal" ? (
              <Text className="text-b-1 text-gray-900 font-bold">
                {value.name}
              </Text>
            ) : (
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">{value.symbol}</Text>
                <View>
                  <Text className="text-b-1 text-gray-900 font-medium">
                    {value.name}
                  </Text>
                  <Text className="text-b-2 text-gray-600">{value.code}</Text>
                </View>
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

      <CurrencySelectionSheet
        ref={bottomSheetModalRef}
        currencies={currencies}
        filteredCurrencies={filteredCurrencies}
        selectedCurrency={value || currencies[0]}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCurrencySelect={handleSelectCurrency}
        onClose={handleCloseSheet}
      />
    </View>
  );
};

export default CurrencyInput;
