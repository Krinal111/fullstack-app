import axiosInstance from "../utils/axios";

const fetchAllVendors = async (
  limit?: number,
  page?: number,
  sort: "ASC" | "DESC" = "ASC",
  search: string = ""
) => {
  const response = await axiosInstance.get("/vendors/all-vendors", {
    params: { limit, page, sort, search },
  });
  return response.data;
};

const fetchVendor = async (vendorId: string) => {
  const response = await axiosInstance.get(`/vendors/${vendorId}`);
  return response.data;
};

const addVendor = async (payload: {
  name: string;
  phone_number: string;
  shop_name: string;
  email?: string;
}) => {
  const response = await axiosInstance.post("/admin/add-vendor", payload);
  return response.data;
};

const updateVendor = async (uuid: string, vendorData: any) => {
  const response = await axiosInstance.patch(`vendors/${uuid}`, vendorData);
  return response.data;
};

const deleteVendor = async (uuid: string) => {
  const response = await axiosInstance.delete(`vendors/${uuid}`);
  return response.data;
};

const fetchVendorTimings = async (vendorId: string) => {
  const response = await axiosInstance.get(`/vendor-timings/${vendorId}`);
  return response.data;
};

// ✅ Add timing
const addVendorTiming = async (
  vendorId: string,
  payload: {
    meal_type: "lunch" | "dinner";
    price: number;
    start_time: string; // format: HH:mm:ss
    end_time: string; // format: HH:mm:ss
  }
) => {
  const response = await axiosInstance.post(
    `/vendor-timings/${vendorId}`,
    payload
  );
  return response.data;
};

// ✅ Update timing
const updateVendorTiming = async (
  id: string,
  payload: {
    meal_type?: "lunch" | "dinner";
    price?: number;
    start_time?: string;
    end_time?: string;
  }
) => {
  const response = await axiosInstance.patch(`/vendor-timings/${id}`, payload);
  return response.data;
};

// ✅ Delete timing
const deleteVendorTiming = async (id: string) => {
  const response = await axiosInstance.delete(`/vendor-timings/${id}`);
  return response.data;
};
const vendorServices = {
  fetchAllVendors,
  updateVendor,
  deleteVendor,
  fetchVendor,
  addVendor,
  addVendorTiming,
  deleteVendorTiming,
  updateVendorTiming,
  fetchVendorTimings,
};
export default vendorServices;
