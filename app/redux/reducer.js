"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllSpecial: [],
  AllMedicos: [],
  Detail: {},
  deletedMedic: null,
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
    searchBar: (state, action) => {
      const data = action.payload;
      state.AllSpecial = [...data];
    },
    searchMedic: (state, action) => {
      const medics = action.payload;
      state.AllMedicos = [...medics];
    },
    clearSearchMedic: (state, action) => {
      const medics = action.payload;
      state.AllMedicos = [];
    },
    sortMedicos: (state, action) => {
      const sortedMedicos = [...state.AllMedicos].sort((a, b) => {
        const nameA = a.last_name;
        const nameB = b.last_name;
        return action.payload === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      state.AllMedicos = sortedMedicos;
    },
    sortEspecsAZ: (state, action) => {
      const sortedEspecs = [...state.AllSpecial].sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        return action.payload === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      state.AllSpecial = sortedEspecs;
    },
  },
});
export const {
  getSpeciality,
  getMedicos,
  getId,
  deleteMedic,
  searchBar,
  searchMedic,
  clearSearchMedic,
  sortMedicos,
  sortEspecsAZ,
} = medicalReducer.actions;

export default medicalReducer.reducer;
