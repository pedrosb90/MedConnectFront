'use client';
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    AllSpecial:[],
    AllMedicos:[]
}
export const medicalReducer = createSlice({
    name:'speciality',
    initialState,
    reducers:{
        getSpeciality:(state, action)=>{
            
            const data= action.payload;
            state.AllSpecial= [...data];
            
        },
        getMedicos:(state, action)=>{
            const response=action.payload;
            state.AllMedicos=[...response]
        }
    }

})
export const {getSpeciality,getMedicos} = medicalReducer.actions
export default medicalReducer.reducer
