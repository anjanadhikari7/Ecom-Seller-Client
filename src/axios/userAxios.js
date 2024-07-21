// User API URL

import { axiosApiCall } from "./axiosHelper";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/user`;

// Public Route | Create User

export const createUser = (userObj) => {
  return axiosApiCall({
    method: "post",
    url: USER_API_URL,
    data: userObj,
  });
};
