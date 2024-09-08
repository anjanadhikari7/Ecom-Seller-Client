import { axiosApiCall } from "./axiosHelper";

// Category API URL
const ORDER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/order`;
// GET ALL orders
export const getOrders = () => {
  return axiosApiCall({
    method: "get",
    url: ORDER_API_URL,
    isPrivate: true,
  });
};

// Create orders
export const createOrders = (OrderObj) => {
  return axiosApiCall({
    method: "post",
    url: ORDER_API_URL,
    data: OrderObj,
    isPrivate: true,
  });
};

// Update orders
export const updateOrders = (UpdatedOrderObj) => {
  return axiosApiCall({
    method: "patch",
    url: ORDER_API_URL,
    data: UpdatedOrderObj,
    isPrivate: true,
  });
};

// Delete orders

export const deleteOrder = (OrderObj) => {
  return axiosApiCall({
    method: "delete",
    url: ORDER_API_URL,
    data: OrderObj,
    isPrivate: true,
  });
};
