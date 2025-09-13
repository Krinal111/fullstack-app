import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  count: number;
  vendors: any[];
  isLoading: boolean;
  error: Error | null;
  message: string;
};

const initialState: StateType = {
  count: 0,
  vendors: [],
  isLoading: false,
  error: null,
  message: "",
};

const slice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getVendorsSuccess(state, action) {
      state.isLoading = false;
      state.vendors = action.payload.rows;
      state.count = action.payload.total_count;
      state.error = null;
    },
    clearVendorsData(state) {
      state.vendors = [];
      state.count = 0;
    },
  },
});

export default slice.reducer;
export const { setLoading, setError, getVendorsSuccess, clearVendorsData } =
  slice.actions;
