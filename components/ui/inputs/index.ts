export { default as CheckboxInput } from "./checkbox-input";
export { default as DefaultInput } from "./default-input";
export { default as PasswordInput } from "./password-input";
export { default as PhoneInput } from "./phone-input";

export type { CheckboxInputProps } from "./checkbox-input";
export type { DefaultInputProps } from "./default-input";
export type { PasswordInputProps } from "./password-input";

// PhoneInput types
export interface CountryData {
  name: string;
  isoCode: string;
  phonecode: string;
  flag: string;
}

export interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onChangeCountry?: (country: CountryData) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  defaultCountry?: string;
}
