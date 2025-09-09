import type { NavigateFunction } from "react-router";
import { getRefreshToken, setToken } from "../../utils/localStorageHelper";
import { dispatch } from "../store";
import {
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  setError,
  setLoading,
} from "../slices/authSlices";
import type { LoginPayload, RegisterPayload } from "../../types/authTypes";
import AuthService from "../../services/authService";

let refreshTokenInterval: ReturnType<typeof setInterval> | null = null;

export const loginAction = async (
  payload: LoginPayload,
  navigate: NavigateFunction
): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const data = await AuthService.login(payload);

    dispatch(loginSuccess(data.data)); // update redux
    setToken(data.data.auth_token); // save access token in localStorage

    refreshTokenInterval = setInterval(() => {
      refreshTokenAction();
    }, 28 * 60 * 1000);

    navigate("/"); // redirect to home/dashboard
  } catch (error: any) {
    dispatch(setError(error.message || "Login failed"));
  }
};

export const registerAction = async (
  payload: RegisterPayload,
  navigate: NavigateFunction
): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const data = await AuthService.register(payload);

    dispatch(registerSuccess(data.data));
    setToken(data.data.auth_token); // save token
    navigate("/"); // redirect after register
  } catch (error: any) {
    dispatch(setError(error.message || "Registration failed"));
  }
};

export const refreshTokenAction = async (): Promise<void> => {
  try {
    const refresh = getRefreshToken(); // ✅ get refresh token
    if (!refresh) throw new Error("No refresh token found");

    const data = await AuthService.refreshToken(refresh);

    dispatch(loginSuccess(data.data));
    setToken(data.data.auth_token, data.data.refreshToken); // ✅ update both
  } catch (error: any) {
    dispatch(setError(error.message || "Failed to refresh token"));
  }
};

export const logoutAction = (): void => {
  setToken(""); // clear token from localStorage
  if (refreshTokenInterval) {
    clearInterval(refreshTokenInterval); // stop refresh timer
  }
  dispatch(logoutSuccess()); // reset redux state
};
