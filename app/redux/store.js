"use client";
import { configureStore } from "@reduxjs/toolkit";
import medicalReducer from "./reducer";
import logInStatus from "./LogReducer";
import searchReducer from "./searchReducer";
import loginUser from "./login";

export const store = configureStore({
  reducer: {
    speciality: medicalReducer,
    logStatus: logInStatus,
    search: searchReducer,
    login: loginUser,
  },
});
