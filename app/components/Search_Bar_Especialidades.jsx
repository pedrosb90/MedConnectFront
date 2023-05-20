import { useState } from "react";
import { searchBar } from "../redux/reducer";
import axios from "axios";
import { useDispatch } from "react-redux";
// const backendURL = process.env.PUBLIC_BACKEND_URL;
const backendURL = "https://medconnectback-production.up.railway.app";
const specializationsURL = `${backendURL}/specializations`;
const local = "http://localhost:3001/specializations";

export default function SearchBar() {
  const [name, setName] = useState("");
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
    <div className="flex justify-center">
      <div className="flex gap-1">
        <input
          type="text"
          placeholder="Enter a specialty"
          onChange={handleSearch}
          value={name}
          className="p-2 mr-1 border border-black bg-[#dedcdc] mb-2 text-base rounded-md "
        />
        <button
          className="text-[rgba(255, 255, 255, 0.62)] mb-2 border border-black bg-[#dedcdc] rounded-md px-4 py-2 cursor-pointer"
          onClick={(e) => fetchData(e)}
        >
          SEARCH
        </button>
        <button
          className="text-[rgba(255, 255, 255, 0.62)] mb-2 border border-black bg-[#dedcdc] rounded-md px-4 py-2 cursor-pointer"
          onClick={() => {
            window.location.reload();
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
}
