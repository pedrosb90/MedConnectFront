"use client"
import { useState } from "react";
import Cards from "../components/Cards"


export default function Especialidades() {
  

  const [currentEsp, setCurrentEsp] = useState(0);

  const esp = [
    {
      name: "Cardiología",
      image:
        "https://clinicamodelolanus.com/wp-content/uploads/2019/12/Cardiologia-1024x576.jpg",
      description:
        "La Cardiología es la rama de la medicina dedicada al diagnóstico y tratamiento de las enfermedades cardiovasculares.",
    },
    {
      name: "Traumatología",
      image:
        "https://clinicamodelolanus.com/wp-content/uploads/2019/12/Traumatologia-1024x576.jpg",
      description:
        "El Servicio de Ortopedia y Traumatología brinda diagnóstico y tratamiento para las enfermedades del aparato ósteo-artículo-muscular.",
    },
    {
      name: "Ginecología",
      image:
        "https://clinicamodelolanus.com/wp-content/uploads/2020/03/Ginecologia-1024x576.jpg",
      description:
        "El Servicio de Ginecología se ocupa del cuidado integral de la salud de la mujer. Se centra especialmente en la prevención, diagnóstico y tratamiento de las enfermedades del aparato reproductor femenino.",
    },
  ];

  function handleClick() {
    if (currentEsp < esp.length - 1) {
      setCurrentEsp(currentEsp + 1);
    }
  }

  const especialidad = esp.slice(0, currentEsp + 1);

  return (
   
      <>
        <div>
          <h1 className="text-5xl">ESPECIALIDADES</h1>
          <Cards especialidad={especialidad}></Cards>
        </div>
        <div className="mt-8">
          {currentEsp < esp.length - 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClick}
            >
              Ver más
            </button>
          )}
        </div>
        
      </>
    
  );
}
