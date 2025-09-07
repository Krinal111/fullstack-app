import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // localStorage for web
import { persistReducer, type PersistConfig } from "redux-persist";
import authReducer from "./slices/authSlices";
// ---------------- Types ----------------
type RootState = ReturnType<typeof rootReducer>;

// Generic persist config type
type RootPersistConfig = PersistConfig<RootState>;

// ---------------- Configs ----------------
const rootPersistConfig: RootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const authPersistConfig = {
  key: "auth",
  storage,
  keyPrefix: "redux-",
};

// ---------------- Reducer ----------------
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export { rootPersistConfig, rootReducer };
