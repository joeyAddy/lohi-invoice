import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  description?: string;
  onPress: () => void;
  showChevron?: boolean;
  destructive?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function SettingsMenuList() {
  const handleMenuPress = (id: string) => {
    console.log(`Pressed menu item: ${id}`);
    // TODO: Add navigation logic
  };

  const menuSections: MenuSection[] = [
    {
      title: "Business",
      items: [
        {
          id: "business-profile",
          title: "Business Profile",
          icon: "business-outline",
          description: "Edit your business information",
          onPress: () => handleMenuPress("business-profile"),
          showChevron: true,
        },
        {
          id: "invoice-settings",
          title: "Invoice Settings",
          icon: "document-text-outline",
          description: "Default templates and preferences",
          onPress: () => handleMenuPress("invoice-settings"),
          showChevron: true,
        },
        {
          id: "payment-methods",
          title: "Payment Methods",
          icon: "card-outline",
          description: "Manage payment options",
          onPress: () => handleMenuPress("payment-methods"),
          showChevron: true,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          id: "notifications",
          title: "Notifications",
          icon: "notifications-outline",
          description: "Email and push notifications",
          onPress: () => handleMenuPress("notifications"),
          showChevron: true,
        },
        {
          id: "security",
          title: "Security",
          icon: "shield-checkmark-outline",
          description: "Password and authentication",
          onPress: () => handleMenuPress("security"),
          showChevron: true,
        },
        {
          id: "backup",
          title: "Backup & Export",
          icon: "cloud-download-outline",
          description: "Export your data",
          onPress: () => handleMenuPress("backup"),
          showChevron: true,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          id: "help",
          title: "Help Center",
          icon: "help-circle-outline",
          description: "FAQs and guides",
          onPress: () => handleMenuPress("help"),
          showChevron: true,
        },
        {
          id: "contact",
          title: "Contact Support",
          icon: "mail-outline",
          description: "Get help from our team",
          onPress: () => handleMenuPress("contact"),
          showChevron: true,
        },
        {
          id: "feedback",
          title: "Send Feedback",
          icon: "chatbubble-outline",
          description: "Help us improve",
          onPress: () => handleMenuPress("feedback"),
          showChevron: true,
        },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          id: "privacy",
          title: "Privacy Policy",
          icon: "document-outline",
          onPress: () => handleMenuPress("privacy"),
          showChevron: true,
        },
        {
          id: "terms",
          title: "Terms of Service",
          icon: "document-outline",
          onPress: () => handleMenuPress("terms"),
          showChevron: true,
        },
      ],
    },
    {
      title: "Account Actions",
      items: [
        {
          id: "logout",
          title: "Sign Out",
          icon: "log-out-outline",
          onPress: () => handleMenuPress("logout"),
          destructive: true,
        },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      onPress={item.onPress}
      className="flex-row items-center py-4 px-4 bg-white border-b border-neutral-100 last:border-b-0"
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
          item.destructive ? "bg-red-100" : "bg-primary-100"
        }`}
      >
        <Ionicons
          name={item.icon as any}
          size={20}
          color={item.destructive ? "#dc2626" : "#1b365d"}
        />
      </View>

      <View className="flex-1">
        <Text
          className={`text-base font-medium ${
            item.destructive ? "text-red-600" : "text-primary-600"
          }`}
        >
          {item.title}
        </Text>
        {item.description && (
          <Text className="text-sm text-neutral-600 mt-1">
            {item.description}
          </Text>
        )}
      </View>

      {item.showChevron && (
        <Ionicons name="chevron-forward" size={20} color="#8e8e8e" />
      )}
    </TouchableOpacity>
  );

  return (
    <View className="mt-4 mx-4 space-y-4">
      {menuSections.map((section, sectionIndex) => (
        <View
          key={sectionIndex}
          className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
        >
          <View className="px-4 py-3 bg-neutral-50 border-b border-neutral-200">
            <Text className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
              {section.title}
            </Text>
          </View>
          {section.items.map(renderMenuItem)}
        </View>
      ))}
    </View>
  );
}
