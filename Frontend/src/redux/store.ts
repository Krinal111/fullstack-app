import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducers";

// ------------------ Type --------------------------
type UseDispatchType = () => ReturnType<typeof useAppDispatch>;
type AppState = ReturnType<typeof store.getState>;

// --------------------------------------------------
const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch: UseDispatchType = (): ReturnType<typeof useAppDispatch> =>
  useAppDispatch();

export { store, dispatch, persistor, useSelector, useDispatch };
export type { AppState };
