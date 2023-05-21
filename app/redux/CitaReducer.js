'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    info:[]
    
}

export const citasInfo = createSlice({
    name:"cita",
    initialState,
    reducers:{
        postInfo:(state,action)=>{
            state.info = action.payload;
        },
        
    }
})

export const {postInfo} = citasInfo.actions
export default citasInfo.reducer