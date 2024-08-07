import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { reducer: orderreducer, actions } = orderSlice;

export const { setOrders, setIsLoading } = actions;

export default orderreducer;
