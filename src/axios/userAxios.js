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

// Public verify user

export const verifyUser = (verificationObject) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/verify-email`,
    data: verificationObject,
  });
};

// Public | Login user

export const loginUser = (loginData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/login`,
    data: loginData,
  });
};

// Get user | private
export const getUser = () => {
  return axiosApiCall({
    method: "get",
    url: USER_API_URL,
    isPrivate: true,
  });
};

// Get new access token using refresh token

export const getNewAccessJwt = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/accessjwt`,
    isPrivate: true,
    useRefreshToken: true,
  });
};

// Get all user

export const getAllUsers = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/all`,
    isPrivate: true,
  });
};

//LOGOUT USER
export const logoutUser = (email) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/logout`,
    data: { email },
    isPrivate: true,
  });
};

// RequestOTP
export const requestOTP = (email) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/verify-email`,
    data: email,
  });
};

// Verify OTP
export const verifyOTP = (otp) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/verify-otp`,
    data: otp,
  });
};

// Reset Password
export const resetPassword = (email, password) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/reset-password`,
    data: { email, password },
  });
};

// Update User
export const updateUser = (User) => {
  return axiosApiCall({
    method: "patch",
    url: USER_API_URL,
    data: User,
    isPrivate: true,
  });
};

// Delete User
export const deleteUser = (UserObj) => {
  return axiosApiCall({
    method: "delete",
    url: USER_API_URL,
    data: UserObj,
    isPrivate: true,
  });
};
