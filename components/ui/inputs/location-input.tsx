import { Ionicons } from "@expo/vector-icons";
import { City, Country, State } from "country-state-city";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "../../../lib/utils";
import LocationSelectionSheet from "../sheets/location-selection-sheet";

interface LocationSelectionSheetRef {
  present: () => void;
  dismiss: () => void;
  focusSearchInput: () => void;
}

interface LocationData {
  name: string;
  code: string;
  type: "country" | "state" | "city";
}

interface SelectedLocation {
  country: LocationData | null;
  state: LocationData | null;
  city: LocationData | null;
}

interface LocationInputProps {
  value: SelectedLocation;
  onChangeLocation: (location: SelectedLocation) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  showLabels?: boolean;
  variant?: "default" | "minimal";
}

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChangeLocation,
  error,
  disabled = false,
  className,
  showLabels = true,
  variant = "default",
}) => {
  const bottomSheetModalRef = useRef<LocationSelectionSheetRef>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationItems, setLocationItems] = useState<LocationData[]>([]);
  const [locationType, setLocationType] = useState<
    "country" | "state" | "city"
  >("country");

  // Filtered location items based on search
  const filteredLocationItems = useMemo(() => {
    if (!searchQuery) return locationItems;
    return locationItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [locationItems, searchQuery]);

  const openCountrySelector = useCallback(() => {
    if (disabled) return;
    const countries = Country.getAllCountries().map((country) => ({
      name: country.name,
      code: country.isoCode,
      type: "country" as const,
    }));
    setLocationItems(countries);
    setLocationType("country");
    bottomSheetModalRef.current?.present();
  }, [disabled]);

  const openStateSelector = useCallback(() => {
    if (disabled || !value.country) return;
    const states = State.getStatesOfCountry(value.country.code).map(
      (state) => ({
        name: state.name,
        code: state.isoCode,
        type: "state" as const,
      })
    );
    setLocationItems(states);
    setLocationType("state");
    bottomSheetModalRef.current?.present();
  }, [disabled, value.country]);

  const openCitySelector = useCallback(() => {
    if (disabled || !value.country || !value.state) return;
    const cities = City.getCitiesOfState(
      value.country.code,
      value.state.code
    ).map((city) => ({
      name: city.name,
      code: city.name,
      type: "city" as const,
    }));
    setLocationItems(cities);
    setLocationType("city");
    bottomSheetModalRef.current?.present();
  }, [disabled, value.country, value.state]);

  const handleLocationSelect = useCallback(
    (item: LocationData) => {
      let newLocation = { ...value };

      if (item.type === "country") {
        newLocation = {
          country: item,
          state: null,
          city: null,
        };
      } else if (item.type === "state") {
        newLocation = {
          ...newLocation,
          state: item,
          city: null,
        };
      } else if (item.type === "city") {
        newLocation = {
          ...newLocation,
          city: item,
        };
      }

      onChangeLocation(newLocation);
      bottomSheetModalRef.current?.dismiss();
    },
    [value, onChangeLocation]
  );

  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setSearchQuery("");
  }, []);

  const LocationButton = ({
    label,
    selectedValue,
    placeholder,
    onPress,
    isDisabled,
    isLast = false,
  }: {
    label: string;
    selectedValue: string | null;
    placeholder: string;
    onPress: () => void;
    isDisabled: boolean;
    isLast?: boolean;
  }) => (
    <View className={isLast ? "mb-0" : "mb-3"}>
      {variant === "minimal" && (
        <Text className="text-b-2 text-gray-600 mb-1">{label} *</Text>
      )}
      {showLabels && variant === "default" && (
        <Text className="text-b-2 text-gray-600 mb-2">{label}</Text>
      )}
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        className={cn(
          variant === "default" &&
            "flex-row items-center justify-between py-3 px-4 border border-gray-300 rounded-xs bg-white",
          variant === "minimal" && "flex-row items-center justify-between",
          isDisabled && variant === "default" && "bg-gray-100 opacity-50",
          error && variant === "default" && "border-red-500"
        )}
      >
        <Text
          className={cn(
            "text-b-1 font-bold flex-1",
            "text-gray-900",
            variant === "minimal" && selectedValue && "font-bold"
          )}
        >
          {selectedValue || placeholder}
        </Text>
        <Ionicons
          name={variant === "minimal" ? "chevron-forward" : "chevron-down"}
          size={20}
          color={isDisabled ? "#a4a4a4" : "#6b7280"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className={cn("w-full", className)}>
      {/* Country Selection */}
      <LocationButton
        label="Business Location"
        selectedValue={value.country?.name || null}
        placeholder="Country/Region"
        onPress={openCountrySelector}
        isDisabled={disabled}
      />

      {/* State Selection */}
      {value.country && (
        <LocationButton
          label="State/Province"
          selectedValue={value.state?.name || null}
          placeholder="Type to add"
          onPress={openStateSelector}
          isDisabled={disabled || !value.country}
        />
      )}

      {/* City Selection */}
      {value.state && (
        <LocationButton
          label="City"
          selectedValue={value.city?.name || null}
          placeholder="Select your city"
          onPress={openCitySelector}
          isDisabled={disabled || !value.state}
          isLast={true}
        />
      )}

      {error && <Text className="text-red-500 text-b-2 mt-1">{error}</Text>}

      <LocationSelectionSheet
        ref={bottomSheetModalRef}
        type={locationType}
        title={`Select ${locationType.charAt(0).toUpperCase() + locationType.slice(1)}`}
        items={locationItems}
        filteredItems={filteredLocationItems}
        selectedItem={
          locationType === "country"
            ? value.country || undefined
            : locationType === "state"
              ? value.state || undefined
              : value.city || undefined
        }
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelect={handleLocationSelect}
        onClose={handleCloseSheet}
      />
    </View>
  );
};

export default LocationInput;
