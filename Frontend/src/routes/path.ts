export const route = {
  DASHBOARD: { path: "/", title: "Dashboard" },
  LOGIN: { path: "/login", title: "Login" },
  REGISTER: { path: "/register", title: "Register" },
  PROFILE: { path: "/profile", title: "Profile" },
  VENDORS: { path: "/vendors", title: "Vendors", roles: ["Customer"] },
  PAGENOTFOUND: { path: "*", title: "Page Not Found" },
};
