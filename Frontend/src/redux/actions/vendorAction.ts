// src/redux/actions/adminVendorsAction.ts
import { fetchAllVendors } from "../../services/vendorServices";
import { getVendorsSuccess, setError, setLoading } from "../slices/vendorSlice";
import { dispatch } from "../store";

// arguments: (limit, page, sort, search)
export const getVendorsAction = async (
  limit?: number,
  page?: number,
  sort: "ASC" | "DESC" = "ASC",
  search: string = ""
): Promise<void> => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllVendors(limit, page, sort, search);
    dispatch(getVendorsSuccess(response.data));
  } catch (error: any) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};
