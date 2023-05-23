import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// const backendURL = process.env.PUBLIC_BACKEND_URL;
const backendURL = "https://medconnectback-production.up.railway.app";
const medicsURL = `${backendURL}/medics`;
const local = "http://localhost:3001/medics";

export default function Search_Bar_Medicos({ setSearchResult }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${local}?first_name=${searchValue}`,
        { email, password },
        { withCredentials: true, credentials: "include" }
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
          <button className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded">
            Disponibilidad
          </button>
          <button className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded">
            A - Z{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
