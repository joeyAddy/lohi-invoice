import { MenuItem } from "../interfaces/settings";

export const BUSINESS_SETTINGS: MenuItem[] = [
  {
    key: "business-info",
    label: "Business Info",
    icon: "briefcase",
    route: "/settings/(business)/business-info",
    isItemAPage: true,
  },
  {
    key: "brand",
    label: "Brand",
    icon: "color-palette",
    route: "/settings/(business)/brand",
    isItemAPage: true,
  },
  {
    key: "template",
    label: "Template",
    icon: "copy",
    route: "/settings/(business)/template",
    isItemAPage: true,
  },
  {
    key: "default-email",
    label: "Default Email Message",
    icon: "mail",
    route: "/settings/(business)/default-email",
    isItemAPage: true,
  },
  {
    key: "invoice-number",
    label: "Invoice Number",
    icon: "pricetag",
    route: "/settings/(business)/invoice-number",
    isItemAPage: true,
  },
  {
    key: "payment-methods",
    label: "Payment Methods",
    icon: "card",
    route: "/settings/(business)/payment-methods",
    isItemAPage: true,
  },
  {
    key: "tax-settings",
    label: "Tax Settings",
    icon: "calculator",
    route: "/settings/(business)/tax-settings",
    isItemAPage: true,
  },
  {
    key: "terms-conditions",
    label: "Terms & Conditions",
    icon: "document-text",
    route: "/settings/(business)/terms-conditions",
    isItemAPage: true,
  },
];

export const SECURITY_SETTINGS: MenuItem[] = [
  {
    key: "password-security",
    label: "Password & Security",
    icon: "lock-closed",
    route: "/settings/(security)/password-security",
    isItemAPage: true,
  },
  {
    key: "biometrics",
    label: "Biometrics",
    icon: "finger-print",
    route: "/settings/(security)/biometrics",
    isItemAPage: true,
  },
  {
    key: "app-lock",
    label: "App Lock",
    icon: "phone-portrait",
    route: "/settings/(security)/app-lock",
    isItemAPage: true,
  },
];

export const GENERAL_SETTINGS: MenuItem[] = [
  {
    key: "language",
    label: "Language",
    icon: "language",
    route: "/settings/(general)/language",
    isItemAPage: true,
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: "notifications",
    route: "/settings/(general)/notifications",
    isItemAPage: true,
  },
];

export const MORE_SETTINGS: MenuItem[] = [
  {
    key: "share",
    label: "Share",
    icon: "share-social",
    route: "/settings/(more)/share",
    isItemAPage: true,
  },
  { key: "rate-us", label: "Rate Us", icon: "star", isItemAPage: false },
  {
    key: "contact",
    label: "Contact Us",
    icon: "call",
    route: "/settings/(more)/contact",
    isItemAPage: true,
  },
  {
    key: "logout",
    label: "Logout",
    icon: "log-out",
    destructive: true,
    isItemAPage: false,
  },
];

export default {
  BUSINESS_SETTINGS,
  SECURITY_SETTINGS,
  GENERAL_SETTINGS,
  MORE_SETTINGS,
};
