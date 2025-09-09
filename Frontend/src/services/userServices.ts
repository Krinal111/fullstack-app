import type { AxiosResponse } from "axios";
import type { UserUpdateInterface } from "../types/authTypes";
import axiosInstance from "../utils/axios";

const editUser = async (
  id: string,
  data: UserUpdateInterface
): Promise<{ rows: Record<string, string>[] }> => {
  const response: AxiosResponse = await axiosInstance.patch(
    `/users/${id}`,
    data
  );
  return response.data;
};

const usersServices = {
  editUser,
};

export default usersServices;
