"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllSpecial: [],
  AllMedicos: [],
  Detail: {},
  deletedMedic: null,
  selectList: [],
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
        const nameA = a.user.last_name;
        const nameB = b.user.last_name;
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
    sortAv: (state, action) => {
      const sortedMedicos = [...state.AllMedicos].sort((a, b) => {
        const dayA = a.schedules[0].day_of_week;
        const dayB = b.schedules[0].day_of_week;
        return action.payload === "asc" ? dayA - dayB : dayB - dayA;
      });

      state.AllMedicos = sortedMedicos;
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
  sortEspecsAZ,
  sortMedicos,
  sortAv,
} = medicalReducer.actions;

export default medicalReducer.reducer;
