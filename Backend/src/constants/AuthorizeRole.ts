import { RoleLevels } from "./RoleLevel";

export const AuthorizeRole: {
  [path: string]: {
    [method: string]: string[];
  };
} = {
  // ========== ADMIN ROUTES ==========
  "/admin/add-vendor": {
    post: RoleLevels.ADMIN_ONLY,
  },

  // ========== VENDOR ROUTES ==========
  "/vendor/{id}": {
    patch: RoleLevels.VENDOR_AND_ADMIN,
    delete: RoleLevels.ADMIN_ONLY,
  },
  "/vendor-timings/{vendorId}": {
    post: RoleLevels.VENDOR_ONLY,
  },
  "/vendor-timings/:id": {
    patch: RoleLevels.VENDOR_ONLY,
    delete: RoleLevels.VENDOR_ONLY,
  },

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
};
