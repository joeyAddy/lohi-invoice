// Advanced validation utilities for different form types

import {
  ValidationResult,
  validateEmail,
  validatePassword,
  validateRequired,
} from "./validation";

// Agency validation
export const COMPANY_NAME_REGEX = /^[a-zA-Z0-9\s&.-]{2,100}$/;
export const TAX_ID_REGEX = /^[a-zA-Z0-9-]{3,20}$/;
export const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

export const validateAgencyName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: "Agency name is required" };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      error: "Agency name must be at least 2 characters",
    };
  }

  if (name.trim().length > 100) {
    return {
      isValid: false,
      error: "Agency name must be less than 100 characters",
    };
  }

  if (!COMPANY_NAME_REGEX.test(name.trim())) {
    return {
      isValid: false,
      error: "Agency name contains invalid characters",
    };
  }

  return { isValid: true };
};

export const validateTaxId = (taxId: string): ValidationResult => {
  if (!taxId.trim()) {
    return { isValid: true }; // Tax ID is optional
  }

  if (!TAX_ID_REGEX.test(taxId.trim())) {
    return { isValid: false, error: "Invalid tax ID format" };
  }

  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: true }; // Phone is optional
  }

  if (!PHONE_REGEX.test(phone.trim())) {
    return { isValid: false, error: "Invalid phone number format" };
  }

  return { isValid: true };
};

// Registration form validation
export const validateRegistrationForm = (
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string
) => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const firstNameValidation = validateRequired(firstName, "First name");
  const lastNameValidation = validateRequired(lastName, "Last name");

  let confirmPasswordValidation: ValidationResult = { isValid: true };
  if (password !== confirmPassword) {
    confirmPasswordValidation = {
      isValid: false,
      error: "Passwords do not match",
    };
  } else if (!confirmPassword) {
    confirmPasswordValidation = {
      isValid: false,
      error: "Please confirm your password",
    };
  }

  return {
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    isFormValid:
      emailValidation.isValid &&
      passwordValidation.isValid &&
      confirmPasswordValidation.isValid &&
      firstNameValidation.isValid &&
      lastNameValidation.isValid,
  };
};

// Agency setup form validation
export const validateAgencyForm = (
  legalName: string,
  taxId: string,
  phone: string,
  email: string,
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }
) => {
  const legalNameValidation = validateAgencyName(legalName);
  const taxIdValidation = validateTaxId(taxId);
  const phoneValidation = validatePhone(phone);
  const emailValidation = email ? validateEmail(email) : { isValid: true };

  const streetValidation = validateRequired(address.street, "Street address");
  const cityValidation = validateRequired(address.city, "City");
  const postalCodeValidation = validateRequired(
    address.postalCode,
    "Postal code"
  );
  const countryValidation = validateRequired(address.country, "Country");

  return {
    legalName: legalNameValidation,
    taxId: taxIdValidation,
    phone: phoneValidation,
    email: emailValidation,
    address: {
      street: streetValidation,
      city: cityValidation,
      postalCode: postalCodeValidation,
      country: countryValidation,
    },
    isFormValid:
      legalNameValidation.isValid &&
      taxIdValidation.isValid &&
      phoneValidation.isValid &&
      emailValidation.isValid &&
      streetValidation.isValid &&
      cityValidation.isValid &&
      postalCodeValidation.isValid &&
      countryValidation.isValid,
  };
};
