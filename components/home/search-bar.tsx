import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Searching Here",
  onSearch,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <View className="mx-6 mb-4">
      <View className="bg-gray-50 border border-primary-600 rounded-xs px-4 py-1 flex-row items-center">
        <Ionicons name="search" size={20} color="#102138" className="mr-3" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          className="flex-1 text-gray-900 text-base ml-3"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
    </View>
  );
}
