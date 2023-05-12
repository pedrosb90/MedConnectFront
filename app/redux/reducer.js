'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    AllSpecial:[],
    Datail: []
}
export const medicalReducer = createSlice({
    name:'speciality',
    initialState,
    reducers:{
        getSpeciality:(state, action)=>{
            
            const data= action.payload;
            state.AllSpecial= [...data];
            
        },

        getId : (state, action) => {
            const data = action.payload;
            state.Datail = [...data]
        }
    }

})



export const {getSpeciality, getId} = medicalReducer.actions
export default medicalReducer.reducer
