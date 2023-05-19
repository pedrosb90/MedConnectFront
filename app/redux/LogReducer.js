'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    logStatus:null
}

export const logInStatus = createSlice({
    name:"status",
    initialState,
    reducers:{
        getLogStatus:(state,action)=>{
            state.logStatus = action.payload;
        },
        cookieChequer:(state,action)=>{
            state.logStatus = action.payload;
        }
    }
})

export const {getLogStatus,cookieChequer} = logInStatus.actions
export default logInStatus.reducer
