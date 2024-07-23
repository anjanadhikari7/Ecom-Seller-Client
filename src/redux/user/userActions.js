import { getUser } from "../../axios/userAxios";
import { setUser } from "./userSlice";

// GET USER ACTION
export const getUserAction = () => async (dispatch) => {
  const result = await getUser();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setUser(result.data));
};
