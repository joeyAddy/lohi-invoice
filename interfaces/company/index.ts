// Base company interface for invoice app
export interface CompanyDetails {
  id: string;
  legalName: string;
  displayName?: string; // What clients see on invoices
  taxId?: string; // EIN, VAT, GST, etc. (optional based on country)
  address: {
    street: string;
    city: string;
    state: string; // Required for all addresses
    postalCode: string;
    country: string;
  };
  phone?: string;
  email?: string; // Company contact email (can be different from user email)
  website?: string;
  logoUrl?: string;
  currency: "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY"; // Default currency for invoices
  timezone: string; // e.g., 'America/New_York', 'Europe/London'
  createdAt: string;
  updatedAt: string;
}

// Request type for company creation/updates
export interface CreateCompanyRequest {
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
  logoUrl?: string;
  currency: "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY";
  timezone: string;
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  id: string;
}
