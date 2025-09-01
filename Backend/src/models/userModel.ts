export const UserProjection = [
  "users.id",
  "users.name",
  "users.email",
  "users.password",
  "users.phone_number",
  "users.role_id",
  "users.created_at",
  "users.updated_at",
];

export const LoginProjection = [
  "users.id",
  "users.email",
  "users.password",
  "users.role_id",
  "users.name",
  "users.phone_number",
  "users.created_at",
  "users.updated_at",
];
