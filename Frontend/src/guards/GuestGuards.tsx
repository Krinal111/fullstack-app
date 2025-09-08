import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localStorageHelper";

interface Props {
  children: React.ReactNode;
}
export const GuestGuard: React.FC<Props> = ({ children }) => {
  const token = getToken();

  if (token) {
    return <Navigate to={"/"} />;
  }

  return children;
};
