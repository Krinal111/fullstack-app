import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, type AppState } from "../redux/store.ts";

import { setToken, getToken } from "../utils/localStorageHelper.ts";

const useAuth = (): void => {
  const navigate = useNavigate();
  const useData = useSelector((state: AppState) => state.auth.userData);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!useData) {
      navigate("/login");
    }
  }, [useData]);
};

export default useAuth;
