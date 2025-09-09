import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userData: any | null;
  isLoading: boolean;
  error: string | null;
  success: boolean | null;
  message: string | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  userData: null,
  isLoading: false,
  error: null,
  success: null,
  message: null,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.userData = action.payload;
      state.token = action.payload.auth_token;
      state.refreshToken = action.payload.refreshToken;
      state.success = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.userData = action.payload;
      state.token = action.payload.auth_token;
      state.success = true;
      state.error = null;
    },
    logoutSuccess() {
      return initialState;
    },
    editUsersProfileSuccess(state, action) {
      const updateUser = action.payload;
      const oldUser = JSON.parse(JSON.stringify(state.userData));
      state.userData = { ...oldUser, ...updateUser };
      state.error = null;
    },
    setSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  editUsersProfileSuccess,
  setSuccess,
} = authSlice.actions;

export default authSlice.reducer;
