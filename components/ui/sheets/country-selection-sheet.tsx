import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface CountryData {
  name: string;
  isoCode: string;
  phonecode: string;
  flag: string;
}

interface CountrySelectionSheetProps {
  countries: CountryData[];
  filteredCountries: CountryData[];
  selectedCountry: CountryData;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCountrySelect: (country: CountryData) => void;
  onClose: () => void;
}

const CountrySelectionSheet = forwardRef<
  BottomSheetModal,
  CountrySelectionSheetProps
>(
  (
    {
      countries,
      filteredCountries,
      selectedCountry,
      searchQuery,
      onSearchChange,
      onCountrySelect,
      onClose,
    },
    ref
  ) => {
    // Bottom sheet snap points
    const snapPoints = useMemo(() => ["75%"], []);

    // Handle sheet changes
    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          onClose();
        }
      },
      [onClose]
    );

    // Render backdrop
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    // Render country item
    const renderCountryItem = ({ item }: { item: CountryData }) => (
      <TouchableOpacity
        className="flex-row items-center py-4 px-4 border-b border-gray-100"
        onPress={() => onCountrySelect(item)}
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

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
      >
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="p-4 border-gray-200">
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#4a4a4a" />
              </TouchableOpacity>
              <Text className="text-h-5 font-bold">Choose your country</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Search Input */}
            <View className="flex-row items-center bg-gray-100 rounded-xs px-3 h-14">
              <Ionicons name="search" size={20} color="#a4a4a4" />
              <TextInput
                className="flex-1 ml-2 text-b-1"
                placeholder="Search your country"
                value={searchQuery}
                onChangeText={onSearchChange}
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
          <View className="p-4 absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
            <TouchableOpacity
              className="bg-primary-500 py-4 rounded-xs"
              onPress={onClose}
            >
              <Text className="text-center text-white text-b-1 font-medium">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

CountrySelectionSheet.displayName = "CountrySelectionSheet";

export default CountrySelectionSheet;
