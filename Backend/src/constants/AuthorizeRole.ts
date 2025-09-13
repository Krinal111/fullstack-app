import { RoleLevels } from "./RoleLevel";

export const AuthorizeRole: {
  [path: string]: {
    [method: string]: string[];
  };
} = {
  // ========== AUTH ROUTES (These are handled as public routes) ==========
  // No need to define /auth/register, /auth/login, /auth/refresh here
  // as they are in PUBLIC_ROUTES array

  // ========== ADMIN ROUTES ==========
  "/admin/add-vendor": {
    post: RoleLevels.ADMIN_ONLY,
  },

  // ========== VENDOR ROUTES ==========
  "/vendor/{id}": {
    patch: RoleLevels.VENDOR_AND_ADMIN,
    delete: RoleLevels.ADMIN_ONLY,
  },

  // ========== CUSTOMER ROUTES ==========

  // ========== PUBLIC/SHARED ROUTES (Optional - can also be in PUBLIC_ROUTES) ==========
  "/users/{id}": {
    patch: RoleLevels.ALL_ROLES,
  },
  "/vendors": {
    get: RoleLevels.ALL_ROLES,
  },
  "/vendors/{id}": {
    get: RoleLevels.ALL_ROLES,
  },

  // ========== MIXED PERMISSIONS ==========
  "/orders": {
    get: RoleLevels.VENDOR_AND_ADMIN,
  },
  "/orders/{id}": {
    get: RoleLevels.ALL_ROLES,
  },
};
