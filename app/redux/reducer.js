"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllSpecial: [],
  AllMedicos: [],
  Detail: {},
  deletedMedic: null,
  deletedEsp: null,
  selectList: [],
  cities:[]
};
export const medicalReducer = createSlice({
  name: "speciality",
  initialState,
  reducers: {
    getSpeciality: (state, action) => {
      const data = action.payload;
      state.AllSpecial = [...data];
    },
    getCities: (state, action) => {
      const data = action.payload;
      state.cities = [...data];
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
    deleteEsp: (state, action) => {
      console.log(action.payload);
      state.deletedEsp = action.payload;
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
        const durationA = getAvailabilityDuration(a.schedules[0]);
        const durationB = getAvailabilityDuration(b.schedules[0]);
        return action.payload === "asc"
          ? durationA - durationB
          : durationB - durationA;
      });

      state.AllMedicos = sortedMedicos;
    },
  },
});
const getAvailabilityDuration = (schedule) => {
  if (!schedule || !schedule.start_time || !schedule.end_time) {
    return 0;
  }

  const startTime = parseInt(schedule.start_time.split(":").join(""));
  const endTime = parseInt(schedule.end_time.split(":").join(""));

  return endTime - startTime;
};
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
  getCities
} = medicalReducer.actions;

export default medicalReducer.reducer;
