'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    info:[],
    citas:[],
    schedule:[]
    
}

export const citasInfo = createSlice({
    name:"cita",
    initialState,
    reducers:{
        postInfo:(state,action)=>{
            state.info = action.payload
        },

        postSchedule:(state,action)=>{
            state.schedule = action.payload
        },

        getCitas: (state, action) => {
            const data = action.payload;
            state.citas = [...data];
          },
        
    }
})

export const {postInfo,postSchedule, getCitas} = citasInfo.actions
export default citasInfo.reducer