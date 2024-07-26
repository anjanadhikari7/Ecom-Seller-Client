import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/userSlice";
import categoryreducer from "./redux/category/categorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryreducer,
  },
});

export default store;
