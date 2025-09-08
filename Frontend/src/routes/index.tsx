import { useRoutes, type RouteObject } from "react-router-dom";
import { route } from "./path";
import { GuestGuard } from "../guards/GuestGuards";
import { AuthGuard } from "../guards/AuthGuards";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { useSelector, type AppState } from "../redux/store";
import RoleBasedGuard from "../guards/RoleBasedGuard";
import DashboardLayout from "../layout/DashboardLayout";

type RoutesType = () => React.ReactElement<
  unknown,
  string | React.JSXElementConstructor<unknown>
> | null;

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: route.DASHBOARD.path,
        element: (
          <RoleBasedGuard allowedRoles={["Admin", "Customer", "Vendor"]}>
            <Dashboard />
          </RoleBasedGuard>
        ),
      },
      {
        path: route.PROFILE.path,
        element: (
          <RoleBasedGuard allowedRoles={["Admin", "Customer", "Vendor"]}>
            <div>Profile</div>
          </RoleBasedGuard>
        ),
      },
      {
        path: route.VENDORS.path,
        element: (
          <RoleBasedGuard allowedRoles={route.VENDORS.roles}>
            <div>Vendors</div>
          </RoleBasedGuard>
        ),
      },
    ],
  },
  {
    path: route.LOGIN.path,
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: route.REGISTER.path,
    element: (
      <GuestGuard>
        <div>Register Page</div>
      </GuestGuard>
    ),
  },
  {
    path: route.PAGENOTFOUND.path,
    element: <div>Page Not Found</div>,
  },
];

const Routes: RoutesType = () => useRoutes(routes);

export default Routes;
