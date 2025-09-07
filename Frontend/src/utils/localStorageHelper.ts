import axios from "./axios";

const setToken = (token: string): void => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const getToken = (): string | null => localStorage.getItem("token");

export { setToken, getToken };
