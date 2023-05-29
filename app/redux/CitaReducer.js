'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    info:[],
    citas:[]
    
}

export const citasInfo = createSlice({
    name:"cita",
    initialState,
    reducers:{
        postInfo:(state,action)=>{
            state.info = action.payload;
        },

        getCitas: (state, action) => {
            const data = action.payload;
            state.citas = [...data];
          },
        
    }
})

export const {postInfo, getCitas} = citasInfo.actions
export default citasInfo.reducer