import { Ionicons } from "@expo/vector-icons";
import { Country } from "country-state-city";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { cn } from "../../../lib/utils";
import { CountrySelectionSheet } from "../sheets";

interface CountrySelectionSheetRef {
  present: () => void;
  dismiss: () => void;
  focusSearchInput: () => void;
}

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onChangeCountry?: (country: CountryData) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  defaultCountry?: string; // ISO code like "US", "FR", etc.
}

interface CountryData {
  name: string;
  isoCode: string;
  phonecode: string;
  flag: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  onChangeCountry,
  placeholder = "Phone number",
  error,
  disabled = false,
  className,
  defaultCountry = "US",
}) => {
  // Bottom sheet ref
  const bottomSheetModalRef = useRef<CountrySelectionSheetRef>(null);

  // Get all countries with phone codes
  const countries = useMemo(() => {
    return Country.getAllCountries()
      .filter((country) => country.phonecode) // Only countries with phone codes
      .map((country) => ({
        name: country.name,
        isoCode: country.isoCode,
        phonecode: country.phonecode,
        flag: country.flag,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Find default country
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(() => {
    return countries.find((c) => c.isoCode === defaultCountry) || countries[0];
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.phonecode.includes(searchQuery)
    );
  }, [countries, searchQuery]);

  const handleCountrySelect = useCallback(
    (country: CountryData) => {
      setSelectedCountry(country);
      onChangeCountry?.(country);
      bottomSheetModalRef.current?.dismiss();
      setSearchQuery("");
    },
    [onChangeCountry]
  );

  const openCountrySelector = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handlePhoneInputBlur = useCallback(() => {
    // Dismiss keyboard when phone input loses focus
    Keyboard.dismiss();
  }, []);

  // Input container classes
  const containerClasses = cn(
    "flex-row items-center border rounded-xs bg-white",
    {
      "border-primary-300 bg-primary-100/70": !error && !disabled,
      "border-error-500": error && !disabled,
      "border-neutral-200 bg-neutral-200": disabled,
    },
    className
  );

  return (
    <>
      <View className="w-full">
        <View className={containerClasses}>
          {/* Country Code Button */}
          <TouchableOpacity
            onPress={openCountrySelector}
            disabled={disabled}
            className="flex-row items-center px-3 h-[35px] ml-[6.5px] rounded-[8px] bg-gray-200"
          >
            <Text className="text-xl mr-2">{selectedCountry.flag}</Text>
            <Text className="text-b-1 text-gray-900 mr-1">
              +{selectedCountry.phonecode}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#102138" />
          </TouchableOpacity>

          {/* Phone Number Input */}
          <TextInput
            className="flex-1 py-4 px-3 text-b-1 text-gray-900"
            value={value}
            onChangeText={onChangeText}
            onBlur={handlePhoneInputBlur}
            placeholder={placeholder}
            placeholderTextColor="#a4a4a4"
            keyboardType="phone-pad"
            editable={!disabled}
            textContentType="telephoneNumber"
          />
        </View>

        {/* Error Message */}
        {error && <Text className="text-xs text-error-500 mt-2">{error}</Text>}
      </View>

      {/* Country Selection Bottom Sheet */}
      <CountrySelectionSheet
        ref={bottomSheetModalRef}
        countries={countries}
        filteredCountries={filteredCountries}
        selectedCountry={selectedCountry}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCountrySelect={handleCountrySelect}
        onClose={handleCloseSheet}
      />
    </>
  );
};

export default PhoneInput;
