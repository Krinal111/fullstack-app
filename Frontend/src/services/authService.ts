import type { AxiosResponse } from "axios";
import type { LoginPayload, RegisterPayload } from "../types/authTypes";
import axios from "../utils/axios";

const register = async (data: RegisterPayload) => {
  const response: AxiosResponse = await axios.post("/auth/register", {
    ...data,
  });
  return response.data;
};

const login = async (data: LoginPayload) => {
  const response: AxiosResponse = await axios.post("/auth/login", { ...data });
  return response.data;
};

const refreshToken = async () => {
  const response: AxiosResponse = await axios.get("/auth/refresh");
  return response.data;
};

const AuthService = { login, register, refreshToken };
export default AuthService;
