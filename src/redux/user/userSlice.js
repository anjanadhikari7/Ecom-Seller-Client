import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  users: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

export const { setUser, setUsers, setIsLoading } = actions;
export default userReducer;
