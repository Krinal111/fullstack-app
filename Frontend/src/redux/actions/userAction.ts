import usersServices from "../../services/userServices";
import type { UserUpdateInterface } from "../../types/authTypes";
import { refreshTokenAction } from "../../redux/actions/authAction";
import {
  setLoading as profileSetLoading,
  setError,
  editUsersProfileSuccess,
  setSuccess,
} from "../../redux/slices/authSlices";
import { dispatch } from "../../redux/store";

export const editUserProfileAction = async (
  id: string,
  data: UserUpdateInterface
): Promise<void> => {
  dispatch(profileSetLoading(true));
  try {
    const responseData = await usersServices.editUser(id, data);
    if (responseData) {
      // ✅ update redux userData immediately
      dispatch(editUsersProfileSuccess(data));

      // ✅ mark update success (closes modal)
      dispatch(setSuccess(true));

      // ✅ refresh token in case new claims added
      await refreshTokenAction();
    }
  } catch (error: any) {
    dispatch(setError(error?.message || "Update failed"));
  }
};
