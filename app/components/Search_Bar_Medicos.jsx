import { useState } from "react";
import axios from "axios";
import {
  searchMedic,
  getMedicos,
  clearSearchMedic,
  sortMedicos,
} from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const medicsURL = `${backendURL}/medics`;

export default function Search_Bar_Medicos() {
  const [searchValue, setSearchValue] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${medicsURL}?first_name=${searchValue}`
      );
      dispatch(searchMedic(response.data));
      setSearchPerformed(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleReset = () => {
    setSearchValue("");
    setSearchPerformed(false);
    dispatch(clearSearchMedic());
    dispatch(getMedicos());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const isSearchDisabled = searchValue === "";

  const handleSortAZ = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    dispatch(sortMedicos(newOrder));
  };

  return (
    <div className="flex  z-20 fixed left-96">
      <div className="bg-gray-800 py-2 px-6 flex items-center space-x-4 gap-5 rounded-md">
        <form onSubmit={handleSubmit}>
          <input
            className="py-1 px-2 rounded-md "
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
            onClick={handleSortAZ}
            className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
          >
            {`${sortOrder === "asc" ? "A-Z" : "Z-A"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
