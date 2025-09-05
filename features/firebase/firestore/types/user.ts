import { Address } from "./shared";

export interface UserMeta {
  lastLogin?: string;
  createdAt?: string;
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending"
}

export enum UserRole {
  ADMIN = "admin",
  CLIENT = "client",
}

export interface User {
  id: string;
  uid: string;
  meta?: UserMeta;
  role: UserRole;
  status: UserStatus;
  notes?: string;
  orgDetails?: {
    orgName?: string;
    orgNumber?: string;
    orgAddress?: Address;
  }
  userDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: Address;
  }
}
