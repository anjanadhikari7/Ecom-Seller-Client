import { axiosApiCall } from "./axiosHelper";

// Category API URL
const ORDER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/order`;
// GET ALL CATEGORIES
export const getOrders = () => {
  return axiosApiCall({
    method: "get",
    url: ORDER_API_URL,
  });
};
