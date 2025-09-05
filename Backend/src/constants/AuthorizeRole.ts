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
  "/admin/dashboard": {
    get: RoleLevels.ADMIN_ONLY,
  },
  "/admin/users": {
    get: RoleLevels.ADMIN_ONLY,
  },
  "/admin/users/{id}": {
    put: RoleLevels.ADMIN_ONLY,
    delete: RoleLevels.ADMIN_ONLY,
  },

  // ========== VENDOR ROUTES ==========
  "/vendor/profile": {
    get: RoleLevels.VENDOR_ONLY,
    put: RoleLevels.VENDOR_ONLY,
  },
  "/vendor/menu": {
    get: RoleLevels.VENDOR_ONLY,
    post: RoleLevels.VENDOR_ONLY,
  },
  "/vendor/menu/{id}": {
    put: RoleLevels.VENDOR_ONLY,
    delete: RoleLevels.VENDOR_ONLY,
  },
  "/vendor/orders": {
    get: RoleLevels.VENDOR_ONLY,
  },
  "/vendor/orders/{id}": {
    put: RoleLevels.VENDOR_ONLY,
  },
  "/vendor/dashboard": {
    get: RoleLevels.VENDOR_ONLY,
  },

  // ========== CUSTOMER ROUTES ==========
  "/customer/profile": {
    get: RoleLevels.CUSTOMER_ONLY,
    put: RoleLevels.CUSTOMER_ONLY,
  },
  "/customer/orders": {
    get: RoleLevels.CUSTOMER_ONLY,
    post: RoleLevels.CUSTOMER_ONLY,
  },
  "/customer/orders/{id}": {
    get: RoleLevels.CUSTOMER_ONLY,
    put: RoleLevels.CUSTOMER_ONLY,
  },
  "/customer/favorites": {
    get: RoleLevels.CUSTOMER_ONLY,
    post: RoleLevels.CUSTOMER_ONLY,
    delete: RoleLevels.CUSTOMER_ONLY,
  },

  // ========== PUBLIC/SHARED ROUTES (Optional - can also be in PUBLIC_ROUTES) ==========
  "/menu": {
    get: RoleLevels.ALL_ROLES,
  },
  "/menu/{id}": {
    get: RoleLevels.ALL_ROLES,
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
