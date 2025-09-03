import { Request } from "express";
import { ROLES } from "../constants/Roles";

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  role_id: number;
  role?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface AuthRequest extends Request {
  user?: User;
  userRole?: Role;
}

export interface Role {
  id: number;
  role_name: string;
  permissions: Record<string, boolean>;
  created_at: Date;
  updated_at: Date;
}

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
