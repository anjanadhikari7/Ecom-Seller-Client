import { axiosApiCall } from "./axiosHelper";

// Category API URL
const CATEGORY_API_URL = `${
  import.meta.env.VITE_APP_API_BASE_URL
}/api/category`;

// PUBLIC ROUTE
// GET ALL CATEGORIES
export const getCategories = () => {
  return axiosApiCall({
    method: "get",
    url: CATEGORY_API_URL,
  });
};
// PRIVATE ROUTE

// CREATE A CATEGORY
export const createCategory = (categoryObj) => {
  return axiosApiCall({
    method: "post",
    url: CATEGORY_API_URL,
    data: categoryObj,
    isPrivate: true,
  });
};

// Update a category
export const updateCategory = (categoryObj) => {
  return axiosApiCall({
    method: "patch",
    url: CATEGORY_API_URL,
    data: categoryObj,
    isPrivate: true,
  });
};

// Delete a category
export const deleteCategory = (categoryObj) => {
  return axiosApiCall({
    method: "delete",
    url: CATEGORY_API_URL,
    data: categoryObj,
    isPrivate: true,
  });
};
