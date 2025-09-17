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
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { InvoiceItem } from "./invoice-item-details-create";

interface AddInvoiceItemSheetProps {
  onAddItem: (item: Omit<InvoiceItem, "id">) => void;
  onEditItem?: (item: InvoiceItem) => void;
  editingItem?: InvoiceItem | null;
  onClose: () => void;
}

interface AddInvoiceItemSheetRef {
  present: () => void;
  dismiss: () => void;
  focusNameInput: () => void;
}

const AddInvoiceItemSheet = forwardRef<
  AddInvoiceItemSheetRef,
  AddInvoiceItemSheetProps
>(({ onAddItem, onEditItem, editingItem, onClose }, ref) => {
  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Refs
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const nameInputRef = useRef<any>(null);
  const priceInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  // Bottom sheet snap points
  const snapPoints = useMemo(() => ["100%"], []);

  // Update form when editing item changes
  React.useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setPrice(editingItem.price.toString());
      setDescription(editingItem.description || "");
    } else {
      setName("");
      setPrice("");
      setDescription("");
    }
  }, [editingItem]);

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
      focusNameInput: () => {
        nameInputRef.current?.focus();
      },
    }),
    []
  );

  // Handle sheet changes
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
        // Reset form when closing
        setName("");
        setPrice("");
        setDescription("");
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

  // Handle save/update
  const handleSave = useCallback(() => {
    // Validate form inline
    if (!name.trim()) {
      console.log("Validation Error: Please enter a service name");
      return;
    }

    const numericPrice = parseFloat(price);
    if (!price.trim() || isNaN(numericPrice) || numericPrice <= 0) {
      console.log("Validation Error: Please enter a valid price");
      return;
    }

    const itemData = {
      name: name.trim(),
      price: numericPrice,
      description: description.trim() || undefined,
    };

    if (editingItem && onEditItem) {
      // Update existing item
      onEditItem({
        ...editingItem,
        ...itemData,
      });
    } else {
      // Add new item
      onAddItem(itemData);
    }

    // Defer the dismiss to avoid navigation context issues
    setTimeout(() => {
      bottomSheetRef.current?.dismiss();
    }, 100);
  }, [name, price, description, editingItem, onAddItem, onEditItem]);

  // Handle close
  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const isEditing = !!editingItem;

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
      handleIndicatorStyle={{ display: "none" }}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="p-4 border-b border-gray-200">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="#4a4a4a" />
            </TouchableOpacity>
            <Text className="text-h-5 font-bold">
              {isEditing ? "Edit Item" : "Add New Item"}
            </Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        {/* Form Content */}
        <View className="p-4">
          {/* Service Name Input */}
          <View className="mb-6">
            <Text className="text-gray-900 text-b-1 font-medium mb-2">
              Service Name <Text className="text-red-500">*</Text>
            </Text>
            <View className="rounded-xs border border-primary-600 px-3 h-14 justify-center">
              <BottomSheetTextInput
                ref={nameInputRef}
                className="text-b-1 text-gray-900"
                placeholder="e.g., Website Design, Consultation"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#9ca3af"
                returnKeyType="next"
                onSubmitEditing={() => priceInputRef.current?.focus()}
              />
            </View>
          </View>

          {/* Price Input */}
          <View className="mb-6">
            <Text className="text-gray-900 text-b-1 font-medium mb-2">
              Price <Text className="text-red-500">*</Text>
            </Text>
            <View className="rounded-xs border border-primary-600 px-3 h-14 flex-row items-center">
              <Text className="text-gray-600 text-b-1 mr-2">$</Text>
              <BottomSheetTextInput
                ref={priceInputRef}
                className="flex-1 text-b-1 text-gray-900"
                placeholder="0.00"
                value={price}
                onChangeText={setPrice}
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => descriptionInputRef.current?.focus()}
              />
            </View>
          </View>

          {/* Description Input (Optional) */}
          <View className="mb-6">
            <Text className="text-gray-900 text-b-1 font-medium mb-2">
              Description <Text className="text-gray-500">(Optional)</Text>
            </Text>
            <View className="rounded-xs border border-primary-600 px-3 py-3">
              <BottomSheetTextInput
                ref={descriptionInputRef}
                className="text-b-1 text-gray-900 min-h-[80px]"
                placeholder="Add any additional details about this service..."
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#9ca3af"
                multiline
                textAlignVertical="top"
                returnKeyType="done"
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View className="p-4 border-t mt-auto border-gray-200">
          <TouchableOpacity
            className="bg-primary-500 py-4 rounded-xs"
            onPress={handleSave}
          >
            <Text className="text-center text-white text-b-1 font-medium">
              {isEditing ? "Update Item" : "Add Item"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
});

AddInvoiceItemSheet.displayName = "AddInvoiceItemSheet";

export default AddInvoiceItemSheet;
