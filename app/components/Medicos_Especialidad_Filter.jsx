"use client";
import { useState } from "react";
import axios from "axios";
import { searchMedic, searchBar } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
// const backendURL = process.env.PUBLIC_BACKEND_URL;
const backendURL = "https://medconnectback-production.up.railway.app";
const medicsURL = `${backendURL}/medics`;
const local = "http://localhost:3001/medics";

export default function Medicos_Especialidad_Filter() {
  const [searchValue, setSearchValue] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [certifications, setCertifications] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = () => {
    // Handle search functionality, including API calls
    // Add your implementation here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="w-full bg-gray-300 py-2 px-6 flex justify-center rounded-md">
      <form onSubmit={handleSubmit} className="justify-end">
        <select
          className="py-1 px-2 rounded-md mb-2"
          onChange={(e) => setMedicName(e.target.value)}
        >
          <option value="">Medico...</option>
          {/* Add options for medic names */}
        </select>
        <select
          className="py-1 px-2 rounded-md mb-2 ml-10"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">Especialidad...</option>
          {/* Add options for specialties */}
        </select>
        <select
          className="py-1 px-2 rounded-md mb-2 ml-5"
          value={yearsExperience}
          onChange={(e) => setYearsExperience(e.target.value)}
        >
          <option value="">Años de experiencia...</option>
          <option value="2<5">2 - 5</option>
          <option value="5<15">5 - 15</option>
          <option value="15plus">15+</option>
        </select>
        <select
          className="py-1 px-2 rounded-md mb-2 ml-5"
          value={certifications}
          onChange={(e) => setCertifications(e.target.value)}
        >
          <option value="">Cantidad de certificaciones...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          {/* Add more options as needed */}
        </select>
        <select
          className="py-1 px-2 rounded-md mb-2 ml-5"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Ciudad...</option>
          {/* Add options for cities */}
        </select>
        <button
          className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-1 px-2 rounded ml-5"
          type="submit"
        >
          Ordenar
        </button>
      </form>
    </div>
  );
}
