import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../axios/categoryAxios";
import { setCategories } from "./categorySlice";
import { setIsLoading } from "../user/userSlice";

// GET ALL CATEGORIES
export const getCategoriesAction = () => async (dispatch) => {
  const result = await getCategories();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setCategories(result.data));
};

// CREATE CATEGORY ACTION
export const createCategoryAction = (categoryObj) => async (dispatch) => {
  //set isCreating true
  dispatch(setIsLoading(true));
  // call create category API
  const result = await createCategory(categoryObj);
  // set isCreating false
  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getCategoriesAction());
};

// UPDATE A CATEGORY
export const updateCategoryAction = (categoryObj) => async (dispatch) => {
  dispatch(setIsLoading(true));

  const result = await updateCategory(categoryObj);

  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getCategoriesAction());
  return { success: true };
};

// Delete a cateegory

export const deleteCategoryAction = (categoryObj) => async (dispatch) => {
  dispatch(setIsLoading(true));

  const result = await deleteCategory(categoryObj);

  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getCategoriesAction());
};
