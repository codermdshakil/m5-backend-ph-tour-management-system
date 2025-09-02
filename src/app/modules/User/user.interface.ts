import { Types } from "mongoose";

export enum Role {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

// auth providers
// email, password
// google authentication

export interface IAuthProvider {
  provider: string; // google credential
  providerId: string;
}

export interface Iuser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isActive?: IsActive;
  isDeleted?: string;
  isVerified?: string;
  role?: Role;
  auths: IAuthProvider[];
  bookings?: Types.ObjectId[]; // here we store multiple booking object id
  guides?: Types.ObjectId[]; // here multiple booking multiple guides ID
}
