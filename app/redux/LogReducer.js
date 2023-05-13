'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    logStatus:"master"
}

export const logInStatus = createSlice({
    name:"status",
    initialState,
    reducers:{
        getLogStatus:(state,action)=>{
            state.logStatus = action.payload
        }
    }
})

export const {getLogStatus} = logInStatus.actions
export default logInStatus.reducer
