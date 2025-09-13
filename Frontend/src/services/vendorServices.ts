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
const vendorServices = {
  fetchAllVendors,
  updateVendor,
  deleteVendor,
  addVendor,
};
export default vendorServices;
