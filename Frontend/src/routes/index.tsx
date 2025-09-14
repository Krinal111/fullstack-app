import { useRoutes, type RouteObject } from "react-router-dom";
import { route } from "./path";
import { GuestGuard } from "../guards/GuestGuards";
import { AuthGuard } from "../guards/AuthGuards";
import Login from "../pages/Login";
// import { useSelector, type AppState } from "../redux/store";
import RoleBasedGuard from "../guards/RoleBasedGuard";
import DashboardLayout from "../layout/DashboardLayout";
import Vendors from "../pages/vendors";
import Dashboard from "../pages/Dashboard";
import ProfilePage from "../pages/Profile";

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
            <ProfilePage />
          </RoleBasedGuard>
        ),
      },
      {
        path: route.VENDORS.path,
        element: (
          <RoleBasedGuard allowedRoles={route.VENDORS.roles}>
            <Vendors />
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
