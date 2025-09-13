import axiosInstance from "../utils/axios";

export const fetchAllVendors = async (
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
