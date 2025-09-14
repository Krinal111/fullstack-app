import vendorServices from "../../services/vendorServices";
import {
  addVendorTimingSuccess,
  deleteVendorTimingSuccess,
  getVendorSuccess,
  getVendorTimingsSuccess,
  setTimingError,
  setTimingLoading,
  updateVendorTimingSuccess,
} from "../slices/vendorTimingSlice";
import { dispatch } from "../store";

// 🔹 Get all timings for a vendor
export const getVendorTimingsAction = async (
  vendorId: string
): Promise<void> => {
  try {
    dispatch(setTimingLoading(true));
    const response = await vendorServices.fetchVendorTimings(vendorId);
    dispatch(getVendorTimingsSuccess(response.data));
  } catch (error: any) {
    dispatch(setTimingError(error));
  } finally {
    dispatch(setTimingLoading(false));
  }
};

// 🔹 Add timing
export const addVendorTimingAction = async (
  vendorId: string,
  data: any
): Promise<void> => {
  try {
    dispatch(setTimingLoading(true));
    const response = await vendorServices.addVendorTiming(vendorId, data);
    dispatch(addVendorTimingSuccess(response));
  } catch (error) {
    dispatch(setTimingError(error as Error));
  }
};

// 🔹 Update timing
export const updateVendorTimingAction = async (
  id: string,
  data: any
): Promise<void> => {
  try {
    dispatch(setTimingLoading(true));
    const response = await vendorServices.updateVendorTiming(id, data);
    dispatch(updateVendorTimingSuccess(response));
  } catch (error) {
    dispatch(setTimingError(error as Error));
  }
};

// 🔹 Delete timing
export const deleteVendorTimingAction = async (id: string): Promise<void> => {
  try {
    dispatch(setTimingLoading(true));
    const response = await vendorServices.deleteVendorTiming(id);
    dispatch(deleteVendorTimingSuccess({ ...response, id }));
  } catch (error) {
    dispatch(setTimingError(error as Error));
  }
};

export const getVendorAction = async (vendorId: string): Promise<void> => {
  try {
    dispatch(setTimingLoading(true));
    const response = await vendorServices.fetchVendor(vendorId);
    dispatch(getVendorSuccess(response.data));
  } catch (error: any) {
    dispatch(setTimingError(error));
  } finally {
    dispatch(setTimingLoading(false));
  }
};
