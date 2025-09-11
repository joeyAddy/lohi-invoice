import { MenuItem } from "./settings-menu-list";

export const GENERAL_SETTINGS: MenuItem[] = [
  { key: "business-info", label: "Business Info", icon: "briefcase" },
  { key: "template", label: "Template", icon: "copy" },
  { key: "default-email", label: "Default Email Message", icon: "mail" },
  { key: "invoice-number", label: "Invoice Number", icon: "pricetag" },
  { key: "unit", label: "Unit", icon: "layers" },
];

export const MORE_SETTINGS: MenuItem[] = [
  { key: "language", label: "Language", icon: "language" },
  { key: "share", label: "Share", icon: "share-social" },
  { key: "rate-us", label: "Rate Us", icon: "star" },
  { key: "contact", label: "Contact Us", icon: "call" },
  { key: "logout", label: "Logout", icon: "log-out", destructive: true },
];

export default {
  GENERAL_SETTINGS,
  MORE_SETTINGS,
};
