import { Header } from "@/components/shared";
import { router } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateInvoiceButton from "../../components/invoices/create-Invoice-button";
import InvoicesStats from "../../components/invoices/invoices-stats";
import InvoicesList from "../../components/invoices/InvoicesList";

export default function InvoicesScreen() {
  const handleBack = () => {
    console.log("Go back");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Invoices"
        leftIcon="chevron-back"
        onPressLeftIcon={handleBack}
        rightIcon="add"
        onPressRightIcon={() => {
          console.log("Show invoice menu");
        }}
        className="px-4 pt-2"
      />
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
