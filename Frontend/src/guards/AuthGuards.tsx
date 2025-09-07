import { Navigate, useLocation } from "react-router-dom";
import { route } from "../routes/path";
import React, { useState } from "react";
import { getToken } from "../utils/localStorageHelper";

interface Props {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState("");
  const token = getToken();

  if (!token) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={route.LOGIN.path} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation("");
    return <Navigate to={requestedLocation} />;
  }

  return children;
};
