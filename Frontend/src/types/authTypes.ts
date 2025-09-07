export interface RegisterPayload {
  name: string;
  email?: string;
  phone_number: number;
  password: string;
}

export interface LoginPayload {
  phone_number: string;
  password: string;
}
