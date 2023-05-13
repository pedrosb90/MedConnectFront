import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchTerm,
  updateSearchResults,
} from "../../redux/searchReducer";

export default function HomeSearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const searchResults = useSelector((state) => state.search.searchResults);

  const handleInputChange = (event) => {
    dispatch(updateSearchTerm(event.target.value));
    dispatch(updateSearchResults());
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search by doctor name or surname.."
      />
      <ul>
        {searchResults.map((medic) => (
          <li key={medic.id}>
            {medic.first_name} {medic.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
