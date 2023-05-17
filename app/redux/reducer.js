"use client";
import { createSlice } from "@reduxjs/toolkit";



const initialState={
    AllSpecial:[],
    AllMedicos:[],
    Detail: {}

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
        },
        getId : (state, action) => {
            const data = action.payload;
            state.Detail = {...data}
        },

        searchBar:(state, action)=>{
            const data= action.payload;
            state.AllSpecial= [...data];
        }
    }

})
export const {getSpeciality,getMedicos,getId,searchBar} = medicalReducer.actions


export default medicalReducer.reducer
