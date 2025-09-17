import { FontAwesome, Ionicons } from "@expo/vector-icons";
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
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ClientAvatar from "../home/client-avatar";

type Client = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

interface ClientSelectionSheetProps {
  clients: Client[];
  selectedClient: Client | null;
  onClientSelect: (client: Client) => void;
  onCreateClient: () => void;
  onClose: () => void;
}

interface ClientSelectionSheetRef {
  present: () => void;
  dismiss: () => void;
  focusSearchInput: () => void;
}

const ClientSelectionSheet = forwardRef<
  ClientSelectionSheetRef,
  ClientSelectionSheetProps
>(
  (
    { clients, selectedClient, onClientSelect, onCreateClient, onClose },
    ref
  ) => {
    // Local state for search
    const [searchQuery, setSearchQuery] = useState("");

    // Refs
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const searchInputRef = useRef<any>(null);

    // Bottom sheet snap points - full height as requested
    const snapPoints = useMemo(() => ["90%"], []);

    // Filter clients based on search query
    const filteredClients = useMemo(() => {
      if (!searchQuery.trim()) return clients;
      return clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [clients, searchQuery]);

    // Expose methods to parent component
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

    // Handle sheet changes
    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          onClose();
          setSearchQuery(""); // Reset search when closing
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

    // Handle client selection
    const handleClientSelect = useCallback(
      (client: Client) => {
        onClientSelect(client);
        bottomSheetRef.current?.dismiss();
      },
      [onClientSelect]
    );

    // Handle create client
    const handleCreateClient = useCallback(() => {
      onCreateClient();
      bottomSheetRef.current?.dismiss();
    }, [onCreateClient]);

    // Render client item
    const renderClientItem = ({ item }: { item: Client }) => {
      const isSelected = selectedClient?.id === item.id;

      return (
        <TouchableOpacity
          className="flex-row items-center py-4 px-4 border-b border-gray-100"
          onPress={() => handleClientSelect(item)}
        >
          <View className="mr-3">
            <ClientAvatar
              imageUri={item.avatar}
              size={44}
              borderColor={isSelected ? "#3b82f6" : "#ffffff"}
              borderWidth={2}
            />
          </View>
          <View className="flex-1">
            <Text className="text-b-1 font-semibold text-gray-900">
              {item.name}
            </Text>
            <Text className="text-b-2 text-gray-600">{item.email}</Text>
          </View>
          <View className="w-6 h-6 rounded-full border-2 border-gray-300 ml-3">
            {isSelected && (
              <View className="w-full h-full rounded-full bg-primary-500 border-2 border-white" />
            )}
          </View>
        </TouchableOpacity>
      );
    };

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
              <Text className="text-h-5 font-bold">Select Client</Text>
              <TouchableOpacity onPress={handleCreateClient}>
                <FontAwesome
                  name="plus"
                  size={20}
                  className="text-primary-500"
                />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View className="flex-row items-center bg-gray-100 rounded-xs px-3 h-14">
              <Ionicons name="search" size={20} color="#102138" />
              <BottomSheetTextInput
                ref={searchInputRef}
                className="flex-1 ml-2 text-b-1"
                placeholder="Search clients"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#a4a4a4"
              />
            </View>
          </View>

          {/* Clients List */}
          <FlatList
            data={filteredClients}
            renderItem={renderClientItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center py-8">
                <Text className="text-gray-500 text-center">
                  {searchQuery.trim() ? "No clients found" : "No clients yet"}
                </Text>
                <TouchableOpacity
                  onPress={handleCreateClient}
                  className="mt-4 bg-primary-500 px-6 py-3 rounded-xs"
                >
                  <Text className="text-white font-medium">Create Client</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </BottomSheetModal>
    );
  }
);

ClientSelectionSheet.displayName = "ClientSelectionSheet";

export default ClientSelectionSheet;
