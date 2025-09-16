export type SettingsRoute =
  // User profile
  | "/settings/user-profile-edit"
  // Business settings
  | "/settings/(business)/business-info"
  | "/settings/(business)/template"
  | "/settings/(business)/default-email"
  | "/settings/(business)/invoice-number"
  | "/settings/(business)/payment-methods"
  | "/settings/(business)/tax-settings"
  | "/settings/(business)/terms-conditions"
  // Security settings
  | "/settings/(security)/password-security"
  | "/settings/(security)/biometrics"
  | "/settings/(security)/app-lock"
  // General settings
  | "/settings/(general)/language"
  | "/settings/(general)/notifications"
  // More settings
  | "/settings/(more)/share"
  | "/settings/(more)/contact";

export type PageMenuItem = {
  key: string;
  label: string;
  icon?: string;
  destructive?: boolean;
  isItemAPage: true;
  route: SettingsRoute;
};

export type ActionMenuItem = {
  key: string;
  label: string;
  icon?: string;
  destructive?: boolean;
  isItemAPage: false;
  /** Optional action handler for non-page items (logout, rate-us, etc.) */
  onPress?: () => void | Promise<void>;
};

export type MenuItem = PageMenuItem | ActionMenuItem;

export default MenuItem;
