'use client'
import { configureStore } from "@reduxjs/toolkit";
import medicalReducer from './reducer';
import logInStatus from "./LogReducer"
export const store = configureStore({
    reducer:{
        speciality: medicalReducer,
        logStatus : logInStatus
    }
});
