import { Ionicons } from "@expo/vector-icons";
import { Country } from "country-state-city";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { cn } from "../../../lib/utils";

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
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      setIsModalVisible(false);
      setSearchQuery("");
    },
    [onChangeCountry]
  );

  const openCountrySelector = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const renderCountryItem = ({ item }: { item: CountryData }) => (
    <TouchableOpacity
      className="flex-row items-center py-4 px-4 border-b border-gray-100"
      onPress={() => handleCountrySelect(item)}
    >
      <Text className="text-2xl mr-3">{item.flag}</Text>
      <View className="flex-1">
        <Text className="text-b-1 text-gray-900">{item.name}</Text>
      </View>
      <Text className="text-b-2 text-gray-600">+{item.phonecode}</Text>
      <View className="w-6 h-6 rounded-full border-2 border-gray-300 ml-3">
        {selectedCountry.isoCode === item.isoCode && (
          <View className="w-full h-full rounded-full bg-primary-500 border-2 border-white" />
        )}
      </View>
    </TouchableOpacity>
  );

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
            className="flex-row items-center py-4 px-3 border-r border-gray-200"
          >
            <Text className="text-xl mr-2">{selectedCountry.flag}</Text>
            <Text className="text-b-1 text-gray-900 mr-1">
              +{selectedCountry.phonecode}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#a4a4a4" />
          </TouchableOpacity>

          {/* Phone Number Input */}
          <TextInput
            className="flex-1 py-4 px-3 text-b-1 text-gray-900"
            value={value}
            onChangeText={onChangeText}
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

      {/* Full Screen Modal for Country Selection */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          {/* Header */}
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="#4a4a4a" />
              </TouchableOpacity>
              <Text className="text-h-5 font-bold">Choose your country</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Search Input */}
            <View className="flex-row items-center bg-gray-100 rounded-xs px-3 py-3">
              <Ionicons name="search" size={20} color="#a4a4a4" />
              <TextInput
                className="flex-1 ml-2 text-b-1"
                placeholder="Search your country"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#a4a4a4"
              />
            </View>
          </View>

          {/* Countries List */}
          <FlatList
            data={filteredCountries}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.isoCode}
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          {/* Continue Button */}
          <View className="p-4 border-t border-gray-200 bg-white">
            <TouchableOpacity
              className="bg-primary-500 py-4 rounded-xs"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-center text-white text-b-1 font-medium">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default PhoneInput;
