export interface User {
  id: number;
  username: string;
  password?: string;
  name?: string;
  email: string;
  phone?: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: number;
  role_name: string;
  permissions: Record<string, boolean>;
  created_at: Date;
  updated_at: Date;
}
