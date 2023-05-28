import { useState } from "react";
import axios from "axios";
import { searchMedic, sortMedicos, sortAv } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
// const backendURL = process.env.PUBLIC_BACKEND_URL;
const backendURL = "http://localhost:3001";
const medicsURL = `${backendURL}/medics`;

export default function Search_Bar_Medicos({ setSearchResult }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [avOrder, setAvOrder] = useState("asc");

  const estadoMed = useSelector((state) => state.speciality.AllMedicos);

  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      // { email, password },
      // { withCredentials: true, credentials: "include" }
      const filteredMedics = estadoMed.filter((medic) => {
        const fullName = `Dr. ${medic.user.first_name.charAt(0)} ${
          medic.user.last_name
        }`;
        const searchValueLowerCase = searchValue.toLowerCase();
        return fullName.toLowerCase().includes(searchValueLowerCase);
      });
      setSearchResult(filteredMedics);
      dispatch(searchMedic(filteredMedics));
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
    setSearchResult([]);
    setSearchPerformed(false);
    dispatch(searchMedic([]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handleSortAZ = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    dispatch(sortMedicos(newOrder));
  };
  const handleSortAv = () => {
    const newOrder = avOrder === "asc" ? "desc" : "asc";
    setAvOrder(newOrder);
    dispatch(sortAv(newOrder));
  };

  const isSearchDisabled = searchValue === "";

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
              className=" bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
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
          <button
            onClick={handleSortAv}
            className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
          >
            {`${avOrder === "asc" ? " < Disponible " : " > Disponible "}`}
          </button>
          <button
            onClick={handleSortAZ}
            className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
          >
            {`${sortOrder === "asc" ? "Alfabetico A-Z" : "Alfabetico Z-A"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
