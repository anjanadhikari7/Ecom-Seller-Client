import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

const { reducer: categoryreducer, actions } = categorySlice;

export const { setCategories } = actions;

export default categoryreducer;
