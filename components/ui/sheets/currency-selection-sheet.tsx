import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CurrencyData } from "../../../lib/data/currencies";

interface CurrencySelectionSheetProps {
  currencies: CurrencyData[];
  filteredCurrencies: CurrencyData[];
  selectedCurrency: CurrencyData;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCurrencySelect: (currency: CurrencyData) => void;
  onClose: () => void;
}

interface CurrencySelectionSheetRef {
  present: () => void;
  dismiss: () => void;
  focusSearchInput: () => void;
}

const CurrencySelectionSheet = forwardRef<
  CurrencySelectionSheetRef,
  CurrencySelectionSheetProps
>(
  (
    {
      currencies,
      filteredCurrencies,
      selectedCurrency,
      searchQuery,
      onSearchChange,
      onCurrencySelect,
      onClose,
    },
    ref
  ) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const searchInputRef = useRef<any>(null);
    const snapPoints = useMemo(() => ["60%", "90%"], []);

    useImperativeHandle(
      ref,
      () => ({
        present: () => {
          bottomSheetRef.current?.present();
        },
        dismiss: () => {
          bottomSheetRef.current?.dismiss();
        },
        focusSearchInput: () => {
          searchInputRef.current?.focus();
        },
      }),
      []
    );

    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          onClose();
        }
      },
      [onClose]
    );

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

    const renderCurrencyItem = ({ item }: { item: CurrencyData }) => (
      <TouchableOpacity
        className="flex-row items-center py-4 px-4 border-b border-gray-100"
        onPress={() => onCurrencySelect(item)}
      >
        <Text className="text-2xl mr-3">{item.symbol}</Text>
        <View className="flex-1">
          <Text className="text-b-1 text-gray-900">{item.name}</Text>
          <Text className="text-b-2 text-gray-600">
            {item.code} • {item.region}
          </Text>
        </View>
        <View className="w-6 h-6 rounded-full border-2 border-gray-300">
          {selectedCurrency.code === item.code && (
            <View className="w-full h-full rounded-full bg-primary-500 border-2 border-white" />
          )}
        </View>
      </TouchableOpacity>
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="p-4 border-gray-200">
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#4a4a4a" />
              </TouchableOpacity>
              <Text className="text-h-5 font-bold">Select Currency</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Search Input */}
            <View className="flex-row items-center bg-gray-100 rounded-xs px-3 h-14">
              <Ionicons name="search" size={20} color="#102138" />
              <BottomSheetTextInput
                ref={searchInputRef}
                className="flex-1 ml-2 text-b-1"
                placeholder="Search currency"
                value={searchQuery}
                onChangeText={onSearchChange}
                placeholderTextColor="#a4a4a4"
              />
            </View>
          </View>

          {/* Currencies List */}
          <FlatList
            data={filteredCurrencies}
            renderItem={renderCurrencyItem}
            keyExtractor={(item) => item.code}
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </BottomSheetModal>
    );
  }
);

CurrencySelectionSheet.displayName = "CurrencySelectionSheet";

export default CurrencySelectionSheet;
