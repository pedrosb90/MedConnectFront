import { useState } from "react";
import { searchBar } from "../redux/reducer";
import axios from "axios";
import { useDispatch } from "react-redux";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const specsURL = `${backendURL}/specializations`;

export default function SearchBar() {
  const [name, setName] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${specsURL}?name=${name}`);
      dispatch(searchBar(response.data));
      setSearchPerformed(true);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleReset = () => {
    setName("");
    setSearchPerformed(false);
    window.location.reload();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const isSearchDisabled = name === "";

  return (
    <div className="flex z-20 fixed left-96 relative">
      <div className="bg-gray-800 py-2 px-6 flex items-center space-x-4 gap-5 rounded-md">
        <form onSubmit={handleSubmit}>
          {" "}
          <input
            className="py-1 px-2 rounded-md"
            type="text"
            placeholder="Especialidad..."
            value={name}
            style={{ width: "160px" }}
            onChange={handleChange}
          />
          {searchPerformed ? (
            <button
              className="bg-red-500 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
              onClick={handleReset}
              type="submit"
            >
              Borrar
            </button>
          ) : (
            <button
              className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
              onClick={handleSearch}
              disabled={isSearchDisabled}
              type="button"
            >
              Buscar
            </button>
          )}{" "}
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
