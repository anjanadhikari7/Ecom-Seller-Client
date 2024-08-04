import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice";
import categoryreducer from "./redux/category/categorySlice";
import productReducer from "./redux/product/productSlice";
import orderreducer from "./redux/order/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryreducer,
    product: productReducer,
    order: orderreducer,
  },
});

export default store;
