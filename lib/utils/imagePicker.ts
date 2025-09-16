import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export interface ImagePickerResult {
  uri: string;
  type: string;
  name: string;
  size?: number;
}

export interface ImagePickerOptions {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
  mediaTypes?: ImagePicker.MediaTypeOptions;
  allowsMultipleSelection?: boolean;
}

/**
 * Utility function to pick an image from gallery or camera
 * @param options - Configuration options for the image picker
 * @returns Promise<ImagePickerResult | null> - The selected image or null if cancelled
 */
export const pickImage = async (
  options: ImagePickerOptions = {}
): Promise<ImagePickerResult | null> => {
  try {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to change your profile picture."
      );
      return null;
    }

    const defaultOptions: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      allowsMultipleSelection: false,
      ...options,
    };

    const result = await ImagePicker.launchImageLibraryAsync(defaultOptions);

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    const asset = result.assets[0];

    return {
      uri: asset.uri,
      type: asset.type || "image",
      name: asset.fileName || `image_${Date.now()}.jpg`,
      size: asset.fileSize,
    };
  } catch (error) {
    console.error("Error picking image:", error);
    Alert.alert("Error", "Failed to pick image. Please try again.");
    return null;
  }
};

/**
 * Utility function to take a photo using camera
 * @param options - Configuration options for the camera
 * @returns Promise<ImagePickerResult | null> - The captured image or null if cancelled
 */
export const takePhoto = async (
  options: ImagePickerOptions = {}
): Promise<ImagePickerResult | null> => {
  try {
    // Request permission to access camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera permissions to take a photo."
      );
      return null;
    }

    const defaultOptions: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      ...options,
    };

    const result = await ImagePicker.launchCameraAsync(defaultOptions);

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    const asset = result.assets[0];

    return {
      uri: asset.uri,
      type: asset.type || "image",
      name: asset.fileName || `photo_${Date.now()}.jpg`,
      size: asset.fileSize,
    };
  } catch (error) {
    console.error("Error taking photo:", error);
    Alert.alert("Error", "Failed to take photo. Please try again.");
    return null;
  }
};

/**
 * Show action sheet to choose between gallery and camera
 * @param options - Configuration options for the image picker
 * @returns Promise<ImagePickerResult | null> - The selected/captured image or null if cancelled
 */
export const showImagePicker = async (
  options: ImagePickerOptions = {}
): Promise<ImagePickerResult | null> => {
  return new Promise((resolve) => {
    Alert.alert(
      "Select Image",
      "Choose an option to select an image",
      [
        {
          text: "Camera",
          onPress: async () => resolve(await takePhoto(options)),
        },
        {
          text: "Gallery",
          onPress: async () => resolve(await pickImage(options)),
        },
        { text: "Cancel", style: "cancel", onPress: () => resolve(null) },
      ],
      { cancelable: true }
    );
  });
};

/**
 * Utility function to pick any type of document/file
 * @returns Promise<ImagePickerResult | null> - The selected file or null if cancelled
 */
export const pickDocument = async (): Promise<ImagePickerResult | null> => {
  try {
    // Note: For documents, you might want to use expo-document-picker instead
    // This is a placeholder implementation using image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    const asset = result.assets[0];

    return {
      uri: asset.uri,
      type: asset.type || "file",
      name: asset.fileName || `file_${Date.now()}`,
      size: asset.fileSize,
    };
  } catch (error) {
    console.error("Error picking document:", error);
    Alert.alert("Error", "Failed to pick document. Please try again.");
    return null;
  }
};
