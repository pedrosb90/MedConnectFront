'use client'
import { configureStore } from "@reduxjs/toolkit";
import medicalReducer from './reducer';

export const store = configureStore({
    reducer:{
        speciality: medicalReducer // Agregar el reducer de especialidades
    }
});
