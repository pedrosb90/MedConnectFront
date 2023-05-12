"use client"
import Cards from "../components/Cards"
import { useDispatch, useSelector } from 'react-redux';
import { getSpeciality } from "../redux/reducer";
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Especialidades() {
  const dispatch = useDispatch()
  const especialidades = useSelector((state)=>state.speciality.AllSpecial)
  

  const [currentEsp, setCurrentEsp] = useState(0);
  const [data, setData]= useState([])

  function handleClick() {
    if (currentEsp < data.length - 1) {
      setCurrentEsp(currentEsp + 1);
    }
  }
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3001/specializations');
      console.log(response.data);
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
          <h1 className="text-5xl">ESPECIALIDADES</h1>
          <Cards especialidad={especialidad}></Cards>
        </div>
        <div className="mt-8">
          {currentEsp < data.length - 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              onClick={handleClick}
            >
              Ver más
            </button>
          )}
        </div>
      </>
    
  );
}