import { toast } from "react-toastify";
import { createOrders, getOrders } from "../../axios/orderAxios";
import { setIsLoading, setOrders } from "./orderSlice";

// GET ALL Orders
export const getOrdersAction = () => async (dispatch) => {
  const result = await getOrders();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setOrders(result.data));
};

// Create Orders

// CREATE A PRODUCT
export const createOrderAction = (orderObj) => async (dispatch) => {
  //set isCreating true
  dispatch(setIsLoading(true));
  // call create category API
  const result = await createOrders(orderObj);
  // set isCreating false
  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getOrdersAction());
};
