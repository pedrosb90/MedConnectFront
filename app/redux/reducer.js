'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    AllSpecial:[],
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


export const {getSpeciality} = medicalReducer.actions
export default medicalReducer.reducer

