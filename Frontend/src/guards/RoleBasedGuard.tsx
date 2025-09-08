import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, type AppState } from "../redux/store";
import { route } from "../routes/path";

interface RoleBasedGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // if not passed, open to all
}

const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({
  children,
  allowedRoles,
}) => {
  const { userData } = useSelector((state: AppState) => state.auth);
  const role = userData?.role; // "Admin" | "Vendor" | "Customer"

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={route.PAGENOTFOUND?.path || "/404"} replace={true} />;
  }

  return <>{children}</>;
};

export default RoleBasedGuard;
