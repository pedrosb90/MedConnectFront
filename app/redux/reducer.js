'use client';
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    AllSpecial:[],
    AllMedicos:[],
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
        getMedicos:(state, action)=>{
            const response=action.payload;
            state.AllMedicos=[...response]
        },
        getId : (state, action) => {
            const data = action.payload;
            state.Datail = [...data]

        }
    }

})
export const {getSpeciality,getMedicos,getId} = medicalReducer.actions


export default medicalReducer.reducer
