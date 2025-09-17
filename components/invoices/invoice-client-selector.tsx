import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ClientAvatar from "../home/client-avatar";

type Client = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type Props = {
  selectedClient: Client | null;
  onEditPress: () => void;
};

export default function InvoiceClientSelector({
  selectedClient,
  onEditPress,
}: Props) {
  return (
    <View className="mx-4 mb-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Client</Text>

      <View className="bg-gray-100 rounded-xs p-4 shadow-sm border border-gray-200 flex-row items-center">
        {selectedClient ? (
          <>
            <View className="mr-4">
              <ClientAvatar
                imageUri={selectedClient.avatar}
                size={48}
                borderColor="#ffffff"
                borderWidth={2}
              />
            </View>

            <View className="flex-1">
              <Text className="text-neutral-900 font-semibold text-base">
                {selectedClient.name}
              </Text>
              <Text className="text-neutral-600 text-sm">
                {selectedClient.email}
              </Text>
            </View>

            <TouchableOpacity onPress={onEditPress} className="p-2">
              <FontAwesome
                name="pencil-square-o"
                size={20}
                className="text-primary-500"
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View className="mr-4">
              <View className="w-12 h-12 bg-gray-300 rounded-full items-center justify-center">
                <FontAwesome name="user" size={20} color="#6b7280" />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-neutral-700 font-medium">
                Select a client
              </Text>
              <Text className="text-neutral-500 text-sm">
                Choose from your client list
              </Text>
            </View>

            <TouchableOpacity onPress={onEditPress} className="p-2">
              <FontAwesome name="plus" size={20} className="text-primary-500" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
