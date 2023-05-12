'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    AllSpecial:[],
    logStatus:false
}
export const medicalReducer = createSlice({
    name:'speciality',
    initialState,
    reducers:{
        getSpeciality:(state, action)=>{
            const data= action.payload;
            state.AllSpecial= [...data];
        }
    }

})

export const logInStatus = createSlice({
    name:"status",
    initialState,
    reducers:{
        getLogStatus:(state,action)=>{
            state.logStatus = action.payload
        }
    }
})
export const {getSpeciality,getLogStatus} = medicalReducer.actions
export default medicalReducer.reducer
