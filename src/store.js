import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice";
import categoryreducer from "./redux/category/categorySlice";
import productReducer from "./redux/product/productSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryreducer,
    product: productReducer,
  },
});

export default store;
