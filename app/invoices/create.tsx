import { ClientSelectionSheet } from "@/components/ui/sheets";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AddInvoiceItemSheet,
  InvoiceBusinessInfo,
  InvoiceClientSelector,
  InvoiceItemDetailsCreate,
} from "../../components/invoices";
import type { InvoiceItem } from "../../components/invoices/invoice-item-details-create";
import { Header } from "../../components/shared";
import Button from "../../components/ui/button";

// Dummy client data
const DUMMY_CLIENTS = [
  {
    id: "1",
    name: "John Adrina",
    email: "jhonadrina@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    id: "2",
    name: "Sarah Connor",
    email: "sarah.connor@techcorp.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&q=80",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@designstudio.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@marketing.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@consulting.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
];

export type Client = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export default function CreateInvoice() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [editingItem, setEditingItem] = useState<InvoiceItem | null>(null);

  const clientSheetRef = useRef<any>(null);
  const addItemSheetRef = useRef<any>(null);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  const handleCreateClient = () => {
    router.push("/clients/create");
  };

  const handleEditPress = () => {
    clientSheetRef.current?.present();
  };

  const handleCloseSheet = () => {
    clientSheetRef.current?.dismiss();
  };

  // Invoice Items handlers
  const handleAddItem = () => {
    setEditingItem(null);
    addItemSheetRef.current?.present();
  };

  const handleEditItem = (item: InvoiceItem) => {
    setEditingItem(item);
    addItemSheetRef.current?.present();
  };

  const handleDeleteItem = (itemId: string) => {
    setInvoiceItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleSaveNewItem = (itemData: Omit<InvoiceItem, "id">) => {
    console.log("Adding new item:", itemData);
    const newItem: InvoiceItem = {
      ...itemData,
      id: Date.now().toString(), // Simple ID generation
    };
    setInvoiceItems((items) => [...items, newItem]);
  };

  const handleUpdateItem = (updatedItem: InvoiceItem) => {
    setInvoiceItems((items) =>
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleCloseItemSheet = () => {
    setEditingItem(null);
    addItemSheetRef.current?.dismiss();
  };

  const handleSendInvoice = () => {
    // Validate that we have all required data
    if (!selectedClient) {
      console.warn("No client selected");
      // TODO: Show alert or validation message
      return;
    }

    if (invoiceItems.length === 0) {
      console.warn("No items added to invoice");
      // TODO: Show alert or validation message
      return;
    }

    // TODO: Implement actual send invoice logic
    console.log("Sending invoice to:", selectedClient.name);
    console.log("Invoice items:", invoiceItems);

    // For now, just show success message or navigate
    // router.push("/invoices");
  };

  // Check if form is valid for sending
  const isFormValid = selectedClient && invoiceItems.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header - Fixed at top */}
      <Header
        title="Create Invoice"
        leftIcon="chevron-back"
        onPressLeftIcon={() => router.back()}
        rightIcon="download"
        className="px-4 pt-2"
      />

      <ScrollView
        className="flex-1 mt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Business Info Section */}
        <InvoiceBusinessInfo />

        {/* Client Selection Section */}
        <InvoiceClientSelector
          selectedClient={selectedClient}
          onEditPress={handleEditPress}
        />

        {/* Item Details Section */}
        <InvoiceItemDetailsCreate
          items={invoiceItems}
          onAddItem={handleAddItem}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />
      </ScrollView>

      {/* Client Selection Sheet */}
      <ClientSelectionSheet
        ref={clientSheetRef}
        clients={DUMMY_CLIENTS}
        selectedClient={selectedClient}
        onClientSelect={handleClientSelect}
        onCreateClient={handleCreateClient}
        onClose={handleCloseSheet}
      />

      {/* Add/Edit Invoice Item Sheet */}
      <AddInvoiceItemSheet
        ref={addItemSheetRef}
        onAddItem={handleSaveNewItem}
        onEditItem={handleUpdateItem}
        editingItem={editingItem}
        onClose={handleCloseItemSheet}
      />

      {/* Send Button - Fixed at bottom */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <Button
          variant={isFormValid ? "primary" : "outline"}
          size="lg"
          onPress={handleSendInvoice}
          disabled={!isFormValid}
        >
          Send Invoice
        </Button>
      </View>
    </SafeAreaView>
  );
}
