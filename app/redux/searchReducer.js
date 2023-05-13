import { createSlice } from "@reduxjs/toolkit";

const searchReducer = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    searchResults: [],
  },
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    updateSearchResults: (state) => {
      state.searchResults = data.filter((medic) =>
        `${medic.first_name} ${medic.last_name}`
          .toLowerCase()
          .includes(state.searchTerm.toLowerCase())
      );
    },
  },
});

export const { updateSearchTerm, updateSearchResults } = searchReducer.actions;

export default searchReducer.reducer;
