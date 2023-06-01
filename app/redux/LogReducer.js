"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logStatus: null,
  userStatus: null,
};

export const logInStatus = createSlice({
  name: "status",
  initialState,
  reducers: {
    getLogStatus: (state, action) => {
      state.logStatus = action.payload;
    },
    userChequer: (state, action) => {
      state.userStatus = action.payload.user;
    },
  },
});

export const { getLogStatus, userChequer } = logInStatus.actions;
export default logInStatus.reducer;
