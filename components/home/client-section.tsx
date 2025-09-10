import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AvatarGroup from "./avatar-group";

interface Client {
  id: string;
  imageUri: string;
  name: string;
}

interface ClientSectionProps {
  clients: Client[];
  onPress?: () => void;
}

export default function ClientSection({
  clients,
  onPress,
}: ClientSectionProps) {
  const clientCount = clients.length;

  return (
    <View className="mx-4 mb-6">
      <TouchableOpacity
        onPress={onPress}
        className="bg-white rounded-xs p-5 border border-primary-100"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center justify-between">
          {/* Left side - Title and count */}
          <View>
            <Text className="text-label-m text-lg font-dm-sans-bold mb-1">
              Client
            </Text>
            <Text className="text-gray-500 text-sm font-dm-sans">
              {clientCount} Client{clientCount !== 1 ? "s" : ""}
            </Text>
          </View>

          {/* Right side - Avatar group */}
          <View>
            <AvatarGroup
              clients={clients}
              maxVisible={4}
              avatarSize={40}
              spacing={-8}
              borderColor="#ffffff"
              borderWidth={2}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
