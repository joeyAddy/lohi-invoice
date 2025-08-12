// Validation utilities for form inputs

// Email validation regex - RFC 5322 compliant
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Password validation - minimum 8 characters
export const PASSWORD_REGEX = /^.{8,}$/;

// More strict password regex (uncomment if you want stronger requirements)
// export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: "Email is required" };
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  if (!PASSWORD_REGEX.test(password)) {
    return {
      isValid: false,
      error: "Password must be at least 8 characters long",
    };
  }

  return { isValid: true };
};

// Generic required field validation
export const validateRequired = (
  value: string,
  fieldName: string
): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
};

// Validate entire login form
export const validateLoginForm = (email: string, password: string) => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  return {
    email: emailValidation,
    password: passwordValidation,
    isFormValid: emailValidation.isValid && passwordValidation.isValid,
  };
};

// Validate entire register form
export const validateRegisterForm = (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  // Check if passwords match
  let confirmPasswordValidation: ValidationResult;
  if (!confirmPassword) {
    confirmPasswordValidation = {
      isValid: false,
      error: "Please confirm your password",
    };
  } else if (password !== confirmPassword) {
    confirmPasswordValidation = {
      isValid: false,
      error: "Passwords do not match",
    };
  } else {
    confirmPasswordValidation = { isValid: true };
  }

  return {
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
    isFormValid:
      emailValidation.isValid &&
      passwordValidation.isValid &&
      confirmPasswordValidation.isValid,
  };
};

// Validate personal info form
export const validatePersonalInfoForm = (
  firstName: string,
  lastName: string,
  phoneNumber?: string
) => {
  const firstNameValidation = validateRequired(firstName, "First name");
  const lastNameValidation = validateRequired(lastName, "Last name");

  // Phone number is optional, so only validate format if provided
  let phoneValidation: ValidationResult = { isValid: true };
  if (phoneNumber && phoneNumber.trim()) {
    // Basic phone validation - you can make this more strict
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phoneNumber.replace(/[\s\-\(\)]/g, ""))) {
      phoneValidation = {
        isValid: false,
        error: "Please enter a valid phone number",
      };
    }
  }

  return {
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    phoneNumber: phoneValidation,
    isFormValid:
      firstNameValidation.isValid &&
      lastNameValidation.isValid &&
      phoneValidation.isValid,
  };
};

// Validate company info form
export const validateCompanyInfoForm = (data: {
  legalName: string;
  displayName?: string;
  taxId?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  currency: string;
  timezone: string;
}) => {
  const legalNameValidation = validateRequired(
    data.legalName,
    "Company legal name"
  );

  // Address validations
  const streetValidation = validateRequired(
    data.address.street,
    "Street address"
  );
  const cityValidation = validateRequired(data.address.city, "City");
  const stateValidation = validateRequired(
    data.address.state,
    "State/Province"
  );
  const postalCodeValidation = validateRequired(
    data.address.postalCode,
    "Postal code"
  );
  const countryValidation = validateRequired(data.address.country, "Country");
  const currencyValidation = validateRequired(data.currency, "Currency");
  const timezoneValidation = validateRequired(data.timezone, "Timezone");

  // Email validation (optional, but validate format if provided)
  let emailValidation: ValidationResult = { isValid: true };
  if (data.email && data.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      emailValidation = {
        isValid: false,
        error: "Please enter a valid email address",
      };
    }
  }

  // Website validation (optional, but validate format if provided)
  let websiteValidation: ValidationResult = { isValid: true };
  if (data.website && data.website.trim()) {
    const urlRegex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(data.website.trim())) {
      websiteValidation = {
        isValid: false,
        error: "Please enter a valid website URL",
      };
    }
  }

  // Phone validation (optional, but validate format if provided)
  let phoneValidation: ValidationResult = { isValid: true };
  if (data.phone && data.phone.trim()) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ""))) {
      phoneValidation = {
        isValid: false,
        error: "Please enter a valid phone number",
      };
    }
  }

  return {
    legalName: legalNameValidation,
    displayName: { isValid: true }, // Optional field
    taxId: { isValid: true }, // Optional field
    address: {
      street: streetValidation,
      city: cityValidation,
      state: stateValidation, // Required field
      postalCode: postalCodeValidation,
      country: countryValidation,
    },
    phone: phoneValidation,
    email: emailValidation,
    website: websiteValidation,
    currency: currencyValidation,
    timezone: timezoneValidation,
    isFormValid:
      legalNameValidation.isValid &&
      streetValidation.isValid &&
      cityValidation.isValid &&
      stateValidation.isValid &&
      postalCodeValidation.isValid &&
      countryValidation.isValid &&
      currencyValidation.isValid &&
      timezoneValidation.isValid &&
      emailValidation.isValid &&
      websiteValidation.isValid &&
      phoneValidation.isValid,
  };
};
