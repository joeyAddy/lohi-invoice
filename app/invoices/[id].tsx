import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  InvoiceCompanyInfo,
  InvoiceHeaderCard,
  InvoiceItemDetails,
} from "../../components/invoices";
import { Header } from "../../components/shared";

export default function InvoiceDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock data - in real app, fetch based on ID
  const mockInvoiceData = {
    id: id as string,
    invoiceNumber: "0008456",
    invoiceDate: "24 Jun 2024",
    totalAmount: "$119,161",
    status: "Paid" as const,
    title: "LendFlow invoice",
    fromCompany: "Clear Agency",
    taxId: "Invoice#232213",
    lineItems: [
      {
        id: "1",
        description: "Webflow Development",
        cost: "$32000",
      },
      {
        id: "2",
        description: "UI Design",
        cost: "$22000",
      },
      {
        id: "3",
        description: "Brand Design",
        cost: "$12020",
      },
      {
        id: "4",
        description: "Custom Illustration",
        cost: "$3131",
      },
    ],
  };

  const handleDownloadPDF = () => {
    console.log("Download PDF for invoice:", mockInvoiceData.id);
    // Implement PDF download functionality
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header - Fixed at top */}
      <Header
        title="Invoice Details"
        leftIcon="chevron-back"
        onPressLeftIcon={handleBack}
        rightIcon="page-export-pdf"
        onPressRightIcon={() => {
          console.log("Show invoice menu");
          handleDownloadPDF();
        }}
        className="px-4 pt-2"
      />

      <ScrollView
        className="flex-1 mt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Invoice Header Card */}
        <InvoiceHeaderCard
          invoiceNumber={mockInvoiceData.invoiceNumber}
          invoiceDate={mockInvoiceData.invoiceDate}
          totalAmount={mockInvoiceData.totalAmount}
          status={mockInvoiceData.status}
        />

        {/* Company Info Section */}
        <InvoiceCompanyInfo
          fromCompany={mockInvoiceData.fromCompany}
          taxId={mockInvoiceData.taxId}
        />

        {/* Item Details Section */}
        <InvoiceItemDetails
          lineItems={mockInvoiceData.lineItems}
          totalAmount={mockInvoiceData.totalAmount}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
