import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userData: any | null;
  isLoading: boolean;
  error: string | null;
  success: boolean | null;
  message: string | null;
  token: string | null;
}

const initialState: AuthState = {
  userData: null,
  isLoading: false,
  error: null,
  success: null,
  message: null,
  token: null,
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
  },
});

export const {
  setLoading,
  setError,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
