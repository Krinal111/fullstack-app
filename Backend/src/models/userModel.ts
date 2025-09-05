export const UserProjection = [
  "users.id",
  "users.name",
  "users.email",
  "users.password",
  "users.phone_number",
  "users.role",
  "users.created_at",
  "users.updated_at",
];

export const LoginProjection = [
  "users.id",
  "users.email",
  "users.password",
  "users.role",
  "users.name",
  "users.phone_number",
  "users.created_at",
  "users.updated_at",
];
