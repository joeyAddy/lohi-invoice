import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateInvoiceButton from "../../components/invoices/create-Invoice-button";
import InvoicesHeader from "../../components/invoices/InvoicesHeader";
import InvoicesList from "../../components/invoices/InvoicesList";
import InvoicesStats from "../../components/invoices/InvoicesStats";

export default function InvoicesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <InvoicesHeader />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <InvoicesStats />
        <InvoicesList />
      </ScrollView>

      <CreateInvoiceButton />
    </SafeAreaView>
  );
}
