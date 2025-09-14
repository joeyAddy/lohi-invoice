// Base freelancer interface for invoice app
export interface FreelancerDetails {
  id: string;
  professionalName: string; // Professional name/brand (required)
  taxId?: string; // SSN, EIN, etc. (optional based on country)
  address: {
    street: string;
    city: string;
    state: string; // Required for all addresses
    postalCode: string;
    country: string;
  };
  phone?: string;
  email?: string; // Freelancer contact email (can be different from user email)
  website?: string;
  logoUrl?: string;
  currency: "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY"; // Default currency for invoices
  timezone: string; // e.g., 'America/New_York', 'Europe/London'
  profession?: string; // e.g., "Web Developer", "Graphic Designer"
  bio?: string; // Short professional bio
  portfolioUrl?: string; // Portfolio website
  createdAt: string;
  updatedAt: string;
}

// Request type for freelancer creation/updates
export interface CreateFreelancerRequest {
  professionalName: string; // Professional name/brand (required)
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
  profession?: string;
  bio?: string;
  portfolioUrl?: string;
}

export interface UpdateFreelancerRequest
  extends Partial<CreateFreelancerRequest> {
  id: string;
}

// Request types for onboarding
export interface FreelancerInfoRequest {
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
  currency: "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY";
  timezone: string;
  profession?: string;
  bio?: string;
  portfolioUrl?: string;
}

export interface FreelancerLogoRequest {
  logoFile: File | Blob;
  logoType: "image/jpeg" | "image/png" | "image/svg+xml";
}
