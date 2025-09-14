import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  timings: any[];
  vendor: any | null; // ✅ add vendor details
  isLoading: boolean;
  success: boolean | null;
  error: Error | null;
  message: string;
} = {
  timings: [],
  vendor: null,
  isLoading: false,
  success: null,
  error: null,
  message: "",
};

const vendorTimingSlice = createSlice({
  name: "vendorTimings",
  initialState,
  reducers: {
    setTimingLoading(state, action) {
      state.isLoading = action.payload;
    },
    setTimingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    // 🔹 Vendor details
    getVendorSuccess(state, action) {
      state.isLoading = false;
      state.vendor = action.payload;
      state.error = null;
    },
    // 🔹 Timings
    getVendorTimingsSuccess(state, action) {
      state.isLoading = false;
      state.timings = action.payload;
      state.error = null;
    },
    addVendorTimingSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.status;
      state.message = action.payload.message;
      if (action.payload.data) {
        state.timings.push(action.payload.data);
      }
      state.error = null;
    },
    updateVendorTimingSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.status;
      state.message = action.payload.message;
      if (action.payload.data) {
        state.timings = state.timings.map((t) =>
          t.id === action.payload.data.id ? action.payload.data : t
        );
      }
      state.error = null;
    },
    deleteVendorTimingSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      if (action.payload.id) {
        state.timings = state.timings.filter((t) => t.id !== action.payload.id);
      }
      state.error = null;
    },
    setTimingSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
  },
});

export const {
  setTimingLoading,
  setTimingError,
  getVendorSuccess,
  getVendorTimingsSuccess,
  addVendorTimingSuccess,
  updateVendorTimingSuccess,
  deleteVendorTimingSuccess,
  setTimingSuccess,
} = vendorTimingSlice.actions;

export default vendorTimingSlice.reducer;
