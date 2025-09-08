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
import { TimezoneData } from "../../../lib/data/timezones";

interface TimezoneSelectionSheetProps {
  timezones: TimezoneData[];
  filteredTimezones: TimezoneData[];
  selectedTimezone: TimezoneData;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTimezoneSelect: (timezone: TimezoneData) => void;
  onClose: () => void;
}

interface TimezoneSelectionSheetRef {
  present: () => void;
  dismiss: () => void;
  focusSearchInput: () => void;
}

const TimezoneSelectionSheet = forwardRef<
  TimezoneSelectionSheetRef,
  TimezoneSelectionSheetProps
>(
  (
    {
      timezones,
      filteredTimezones,
      selectedTimezone,
      searchQuery,
      onSearchChange,
      onTimezoneSelect,
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

    const renderTimezoneItem = ({ item }: { item: TimezoneData }) => (
      <TouchableOpacity
        className="flex-row items-center py-4 px-4 border-b border-gray-100"
        onPress={() => onTimezoneSelect(item)}
      >
        <View className="flex-1">
          <Text className="text-b-1 text-gray-900">{item.label}</Text>
          <Text className="text-b-2 text-gray-600">
            {item.value} ({item.offset})
          </Text>
        </View>
        <View className="w-6 h-6 rounded-full border-2 border-gray-300">
          {selectedTimezone.value === item.value && (
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
              <Text className="text-h-5 font-bold">Select Timezone</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Search Input */}
            <View className="flex-row items-center bg-gray-100 rounded-xs px-3 h-14">
              <Ionicons name="search" size={20} color="#102138" />
              <BottomSheetTextInput
                ref={searchInputRef}
                className="flex-1 ml-2 text-b-1"
                placeholder="Search timezone"
                value={searchQuery}
                onChangeText={onSearchChange}
                placeholderTextColor="#a4a4a4"
              />
            </View>
          </View>

          {/* Timezones List */}
          <FlatList
            data={filteredTimezones}
            renderItem={renderTimezoneItem}
            keyExtractor={(item) => item.value}
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </BottomSheetModal>
    );
  }
);

TimezoneSelectionSheet.displayName = "TimezoneSelectionSheet";

export default TimezoneSelectionSheet;
