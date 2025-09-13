import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  count: number;
  vendors: any[];
  isLoading: boolean;
  success: boolean | null;
  error: Error | null;
  message: string;
} = {
  count: 0,
  vendors: [],
  isLoading: false,
  success: null,
  error: null,
  message: "",
};

const vendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    getAllVendorsSuccess(state, action) {
      state.isLoading = false;
      state.vendors = action.payload.rows;
      state.count = action.payload.total_count;
      state.error = null;
    },
    addVendorSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.status;
      state.message = action.payload.message;
      state.error = null;
    },
    deleteVendorSuccess(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    updateVendorSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.status;
      state.message = action.payload.message;
      state.error = null;
    },
    setSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload;
    },
    // logoutVendors() {
    //   return initialState;
    // },
  },
});
export const {
  getAllVendorsSuccess,
  addVendorSuccess,
  setError,
  deleteVendorSuccess,
  setLoading,
  setSuccess,
  updateVendorSuccess,
} = vendorSlice.actions;
export default vendorSlice.reducer;
