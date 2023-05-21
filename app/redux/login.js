import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userGoogle: {},
  userLocal: {},
};

export const loginUser = createSlice({
  name: "login",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.userGoogle = action.payload;
    },
    getLocalUser: (state, action) => {
      state.userLocal = action.payload;
    },
  },
});

export const { getUser, getLocalUser } = loginUser.actions;
export default loginUser.reducer;
