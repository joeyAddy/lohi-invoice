import React from "react";
import { Image, View } from "react-native";

interface ClientAvatarProps {
  imageUri: string;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
}

export default function ClientAvatar({
  imageUri,
  size = 40,
  borderColor = "#ffffff",
  borderWidth = 2,
}: ClientAvatarProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth,
        borderColor,
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: imageUri }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: size / 2,
        }}
        resizeMode="cover"
      />
    </View>
  );
}
