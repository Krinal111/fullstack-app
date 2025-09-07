import { useRoutes, type RouteObject } from "react-router-dom";
import { route } from "./path";
import { GuestGuard } from "../guards/GuestGuards";
import { AuthGuard } from "../guards/AuthGuards";
import Login from "../pages/Login";

type RoutesType = () => React.ReactElement<
  unknown,
  string | React.JSXElementConstructor<unknown>
> | null;
const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <div>Dashboard</div>
      </AuthGuard>
    ),
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
];

const Routes: RoutesType = () => useRoutes(routes);

export default Routes;
