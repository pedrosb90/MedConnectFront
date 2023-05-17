"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllSpecial: [],
  AllMedicos: [],
  Detail: {},
  deletedMedic: null,
  sortOrder: "asc",
};
export const medicalReducer = createSlice({
  name: "speciality",
  initialState,
  reducers: {
    getSpeciality: (state, action) => {
      const data = action.payload;
      state.AllSpecial = [...data];
    },
    getMedicos: (state, action) => {
      const response = action.payload;
      state.AllMedicos = [...response];
    },
    getId: (state, action) => {
      const data = action.payload;
      state.Detail = { ...data };
    },
    deleteMedic: (state, action) => {
      console.log(action.payload);
      state.deletedMedic = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    sortMedicos: (AllMedicos, sortOrder) => {
      if (sortOrder === "asc") {
        return [...AllMedicos].sort((a, b) =>
          a.last_name.localeCompare(b.last_name)
        );
      } else if (sortOrder === "desc") {
        return [...AllMedicos].sort((a, b) =>
          b.last_name.localeCompare(a.last_name)
        );
      }
      return medicos;
    },
  },
});
export const {
  getSpeciality,
  getMedicos,
  getId,
  deleteMedic,
  setSortOrder,
  sortMedicos,
} = medicalReducer.actions;

export default medicalReducer.reducer;
