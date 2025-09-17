export interface ClientDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  isVerified: boolean;
  isAcknowledged: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface UpdateClientRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  isVerified?: boolean;
  isAcknowledged?: boolean;
}

export interface ClientListResponse {
  clients: ClientDetails[];
  total: number;
  page: number;
  limit: number;
}
