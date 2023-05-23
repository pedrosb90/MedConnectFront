"use client";
import { getSpeciality, searchMedic, getMedicos } from "../redux/reducer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// const backendURL = process.env.PUBLIC_BACKEND_URL;
const backendURL = "https://medconnectback-production.up.railway.app";
const medicsURL = `${backendURL}/medics`;
const local = "http://localhost:3001/medics";

export default function Medicos_Especialidad_Filter() {
  const allMedicos = useSelector((state) => state.speciality.AllMedicos);
  const specialities = useSelector((state) => state.speciality.AllSpecial);

  const dispatch = useDispatch();
  const [medicName, setMedicName] = useState("");
  const [speciality, setSpecialty] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [certifications, setCertifications] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    async function fetchSpecialitiesData() {
      try {
        const response = await axios.get(
          "http://localhost:3001/specializations"
        );
        dispatch(getSpeciality(response.data));
      } catch (error) {
        alert(error.message);
      }
    }
    fetchSpecialitiesData();
  }, [dispatch]);

  useEffect(() => {
    async function fetchMedicosData() {
      try {
        const response = await axios.get("http://localhost:3001/medics");
        dispatch(getMedicos(response.data));
      } catch (error) {
        alert(error.message);
      }
    }
    fetchMedicosData();
  }, [dispatch]);

  const handleSearch = () => {
    const filteredMedics = allMedicos.filter((medic) => {
      if (
        medicName &&
        !medic.first_name.toLowerCase().includes(medicName.toLowerCase())
      ) {
        return false;
      }
      if (
        specialty &&
        !medic.specializations.some((spec) =>
          spec.name.toLowerCase().includes(specialty.toLowerCase())
        )
      ) {
        return false;
      }
      if (
        yearsExperience &&
        !checkYearsExperience(medic.years_of_experience, yearsExperience)
      ) {
        return false;
      }
      if (
        certifications &&
        !checkCertifications(medic.certifications.length, certifications)
      ) {
        return false;
      }
      if (city && !medic.city.name.toLowerCase().includes(city.toLowerCase())) {
        return false;
      }
      return true;
    });
    dispatch(searchMedic(filteredMedics));
  };

  const checkYearsExperience = (experience, range) => {
    switch (range) {
      case "2<5":
        return experience >= 2 && experience <= 5;
      case "5<15":
        return experience >= 5 && experience <= 15;
      case "15plus":
        return experience >= 15;
      default:
        return true;
    }
  };

  const checkCertifications = (count, selectedCount) => {
    switch (selectedCount) {
      case "1":
        return count === 1;
      case "2":
        return count === 2;
      case "3":
        return count === 3;
      default:
        return true;
    }
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
          value={medicName}
          onChange={(e) => setMedicName(e.target.value)}
        >
          <option value="">Medico...</option>
          {allMedicos.map((medico) => (
            <option key={medico.id} value={medicName}>
              {medico.last_name}
            </option>
          ))}
        </select>
        <select
          className="py-1 px-2 rounded-md mb-2 ml-10"
          value={speciality}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">Especialidad...</option>
          {specialities.map((specialty) => (
            <option key={specialty} value={speciality}>
              {specialty.name}
            </option>
          ))}
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
