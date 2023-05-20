import { useState } from "react";
import { searchBar } from "../redux/reducer";
import axios from "axios";
import { useDispatch } from "react-redux";

// const backendURL = "https://medconnectback-production.up.railway.app";
// const specialitiesURL = `${backendURL}/specializations`;
const local = "http://localhost:3001/specializations";

export default function SearchBar() {
  const [name, setName] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  async function fetchData(e) {
    try {
      e.preventDefault();
      const response = await axios.get(`${local}?name=${name}`);
      dispatch(searchBar(response.data));
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex z-20 fixed left-96 relative">
      <div className="bg-gray-800 py-2 px-6 flex items-center space-x-4 gap-5 rounded-md">
        <input
          className="py-1 px-2 rounded-md"
          type="text"
          placeholder="Especialidad..."
          value={name}
          style={{ width: "160px" }}
          onChange={handleSearch}
        />
        {searchPerformed ? (
          <button
            className="bg-red-500 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
            onClick={() => {
              window.location.reload();
            }}
          >
            Borrar
          </button>
        ) : (
          <button
            className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded"
            onClick={(e) => fetchData(e)}
          >
            Buscar
          </button>
        )}
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
