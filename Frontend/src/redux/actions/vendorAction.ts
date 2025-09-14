// src/redux/actions/adminVendorsAction.ts
import vendorServices from "../../services/vendorServices";
import {
  addVendorSuccess,
  deleteVendorSuccess,
  getAllVendorsSuccess,
  setError,
  setLoading,
  updateVendorSuccess,
} from "../slices/vendorSlice";
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
    const response = await vendorServices.fetchAllVendors(
      limit,
      page,
      sort,
      search
    );
    dispatch(getAllVendorsSuccess(response.data));
  } catch (error: any) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

// 🔹 Add Vendor
export const addVendorAction = async (
  data: any,
  page: number,
  limit: number
): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await vendorServices.addVendor(data);
    dispatch(addVendorSuccess(responseData));
    await getVendorsAction(limit, page, "ASC", ""); // ✅ correct order
  } catch (error) {
    dispatch(setError(error as Error));
  }
};

// 🔹 Delete Vendor
export const deleteVendorAction = async (
  id: string,
  page: number,
  limit: number
): Promise<void> => {
  if (!id) {
    console.error("id is undefined");
    return;
  }
  dispatch(setLoading(true));
  try {
    const responseData = await vendorServices.deleteVendor(id);
    dispatch(deleteVendorSuccess(responseData));
    await getVendorsAction(limit, page, "ASC", ""); // ✅ correct order
  } catch (error) {
    dispatch(setError(error as Error));
  }
};

// 🔹 Update Vendor
export const updateVendorAction = async (
  id: string,
  data: any,
  page: number,
  limit: number
): Promise<void> => {
  dispatch(setLoading(true));
  try {
    const responseData = await vendorServices.updateVendor(id, data);
    dispatch(updateVendorSuccess(responseData));
    await getVendorsAction(limit, page, "ASC", ""); // ✅ no dispatch
  } catch (error: any) {
    let vendorError: Error;
    if (error?.error?.code === "23503") {
      vendorError = new Error("This vendor is already in use.");
    } else {
      vendorError = new Error("Something went wrong!");
    }
    dispatch(setError(vendorError));
  }
};
