import { useState } from "react";
import axios from "axios";
import { setSortOrder } from "@/app/redux/reducer";
import { useDispatch, useSelector } from "react-redux";

export default function Search_Bar_Medicos({ setSearchResult }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const currentSortOrder = useSelector((state) => state.speciality.sortOrder);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/medics?first_name=${searchValue}`
      );
      setSearchResult(response.data);
      setSearchPerformed(true);
    } catch (error) {
      alert(error);
    }
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSort = () => {
    const newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    dispatch(setSortOrder(newSortOrder));
  };
  const handleReset = () => {
    setSearchValue("");
    setSearchResult([]);
    setSearchPerformed(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const isSearchDisabled = searchValue === "";
  const sortButtonLabel = currentSortOrder === "asc" ? "A a Z" : "Z a A";

  return (
    <div className="flex justify-center">
      <div className="bg-gray-200 py-2 px-6 flex items-center space-x-4">
        <form onSubmit={handleSubmit}>
          <input
            className="py-1 px-2 rounded-md"
            type="text"
            placeholder="Medico.."
            value={searchValue}
            onChange={handleChange}
            style={{ width: "160px" }}
          />
          {searchPerformed ? (
            <button
              className="bg-red-500 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
              type="submit"
              onClick={handleReset}
            >
              Borrar
            </button>
          ) : (
            <button
              className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
              type="button"
              onClick={handleSearch}
              disabled={isSearchDisabled}
            >
              Buscar
            </button>
          )}
        </form>
        <div className="flex space-x-4">
          <h5 className="flex items-center self-center text-white">Ordenar:</h5>
          <button className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded">
            Disponibilidad
          </button>
          <button
            onClick={handleSort}
            className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
          >
            {sortButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
