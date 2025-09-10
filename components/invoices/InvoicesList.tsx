import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import InvoiceItem from "./invoice-item";

interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  clientAvatar: string;
  amount: string;
  status: "Paid" | "Unpaid" | "Over Due" | "Draft";
  date: string;
  invoiceNumber: string;
}

export default function InvoicesList() {
  const mockInvoices: Invoice[] = [
    {
      id: "1",
      clientName: "Jansen Ackless",
      clientEmail: "jansen@06gmail.com",
      clientAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      amount: "$5,200",
      status: "Paid",
      date: "04 December 2024",
      invoiceNumber: "#0023",
    },
    {
      id: "2",
      clientName: "Vladimir Petkovic",
      clientEmail: "Vladimir@gmail.com",
      clientAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      amount: "$7,447",
      status: "Unpaid",
      date: "24 November 2024",
      invoiceNumber: "#0023",
    },
    {
      id: "3",
      clientName: "Sarah Mitchell",
      clientEmail: "sarah@design.com",
      clientAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b60c2e24?w=150&h=150&fit=crop&crop=face",
      amount: "$3,850",
      status: "Over Due",
      date: "15 November 2024",
      invoiceNumber: "#0024",
    },
    {
      id: "4",
      clientName: "Michael Chen",
      clientEmail: "michael@startup.com",
      clientAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      amount: "$2,100",
      status: "Draft",
      date: "10 November 2024",
      invoiceNumber: "#0025",
    },
  ];

  const handleInvoicePress = (invoice: Invoice) => {
    router.push(`/invoices/${invoice.id}`);
  };

  return (
    <View>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-gray-900 text-h-6 font-dm-sans-bold">
          Invoice
        </Text>
        <TouchableOpacity>
          <Text className="text-gray-500 text-b-2 font-dm-sans">See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {mockInvoices.map((invoice) => (
          <InvoiceItem
            key={invoice.id}
            id={invoice.id}
            clientName={invoice.clientName}
            clientEmail={invoice.clientEmail}
            clientAvatar={invoice.clientAvatar}
            amount={invoice.amount}
            invoiceNumber={invoice.invoiceNumber}
            date={invoice.date}
            status={invoice.status}
            onPress={() => handleInvoicePress(invoice)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
