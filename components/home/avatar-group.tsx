import React from "react";
import { View } from "react-native";
import ClientAvatar from "./client-avatar";
import OverflowAvatar from "./overflow-avatar";

interface Client {
  id: string;
  imageUri: string;
  name: string;
}

interface AvatarGroupProps {
  clients: Client[];
  maxVisible?: number;
  avatarSize?: number;
  spacing?: number;
  borderColor?: string;
  borderWidth?: number;
}

export default function AvatarGroup({
  clients,
  maxVisible = 4,
  avatarSize = 40,
  spacing = -8,
  borderColor = "#ffffff",
  borderWidth = 2,
}: AvatarGroupProps) {
  const visibleClients = clients.slice(0, maxVisible - 1);
  const overflowCount = clients.length - visibleClients.length;
  const shouldShowOverflow = overflowCount > 0;

  return (
    <View className="flex-row items-center">
      {visibleClients.map((client, index) => (
        <View
          key={client.id}
          style={{
            marginLeft: index > 0 ? spacing : 0,
            zIndex: visibleClients.length - index, // Higher z-index for left avatars
          }}
        >
          <ClientAvatar
            imageUri={client.imageUri}
            size={avatarSize}
            borderColor={borderColor}
            borderWidth={borderWidth}
          />
        </View>
      ))}

      {shouldShowOverflow && (
        <View
          style={{
            marginLeft: spacing,
            zIndex: 0, // Lowest z-index for overflow avatar
          }}
        >
          <OverflowAvatar
            count={overflowCount}
            size={avatarSize}
            borderColor={borderColor}
            borderWidth={borderWidth}
          />
        </View>
      )}
    </View>
  );
}
