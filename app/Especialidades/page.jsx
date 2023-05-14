"use client";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getSpeciality } from "../redux/reducer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Especialidades() {
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.speciality.AllSpecial);

  const [currentEsp, setCurrentEsp] = useState(0);
  const [data, setData] = useState([]);

  function handleClick() {
    if (currentEsp < data.length - 1) {
      setCurrentEsp(currentEsp + 1);
    }
  }
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3001/specializations");

      dispatch(getSpeciality(response.data));
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(especialidades);
  }, [especialidades]);

  const especialidad = data.slice(0, currentEsp + 1);

  return (
    <>
      <div className="w-full">
        <h1 className="bg-cimPallete-gold text-white py-4 px-6 rounded-lg shadow-lg items-center w-50">
          ESPECIALIDADES
        </h1>
        <Cards especialidad={especialidad}></Cards>
      </div>
      <div className="flex justify-start">
        {currentEsp < data.length - 1 && (
          <button
            className="bg-cimPallete-100 hover:bg-cimPallete-gold text-white font-sans py-2 px-4 rounded "
            onClick={handleClick}
          >
            Ver otras especialidades ..
          </button>
        )}
      </div>
    </>
  );
}
