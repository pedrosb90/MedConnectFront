"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedicos } from "@/app/redux/reducer";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import img from '../img/iconoMed.jpg'
// const backendURL = process.env.PUBLIC_BACKEND_URL;
const local = "http://localhost:3001/medics";
const backendURL = "https://medconnectback-production.up.railway.app";
const medicsURL = `${backendURL}/medics`;
export default function CardMedics({ handleClickMed }) {
  const [medicos, setMedicos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const estadoMed = useSelector((state) => state.speciality.AllMedicos);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get(medicsURL);
      dispatch(getMedicos(response.data));
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    !estadoMed?.length ? fetchMedicos() : setMedicos(estadoMed);
  }, [estadoMed, fetchMedicos]);
  const handleNext = () => {
    if (currentIndex + 5 === medicos.length) {
      return; // No avanzar más si es el último médico
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      return; // No retroceder más si es el primer médico
    }
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const paginatedMedicos = medicos
    .slice(currentIndex, currentIndex + 5)
    .filter((medico) => !!medico); // Filtrar medicos nulos
  return (
    <div className={styles.cards + " flex  justify-center"}>
      <button onClick={handlePrevious} className={styles.buttons}>
        <svg
          className="h-8 w-8 text-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <polyline points="15 6 9 12 15 18" />
        </svg>
        Volver
      </button>
      {medicos.length
        ? paginatedMedicos.map((med) => {
            return (
              <button
                onClick={() => handleClickMed(med)}
                key={med.id}
                className={`w-36 h-34 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${styles.cardMed}`}
              >
                <div className="flex justify-end px-4 pt-4"></div>
                <div className="flex flex-col items-center pb-4">
                  <Image
                    className="w-10 h-10 mb-2 rounded-full shadow-lg"
                    src={img}
                    alt="Bonnie image"
                    width={500}
                    height={500}
                  />
                  <Link href={`/medicos/${med.id}`}>
                    <h5
                      className={`mb-1 text-xs font-medium text-gray-900 dark:text-white text-center ${styles.name}`}
                    >
                      {med.first_name ? "Dr. " + med.first_name : "...Loading"}
                    </h5>
                  </Link>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {med.last_name ? med.last_name : "..Loading"}
                  </span>
                  <div className="flex mt-2 space-x-2"></div>
                </div>
              </button>
            );
          })
        : "Cargado medicos...."}

      <button onClick={handleNext} className={styles.buttons}>
        Next
        <svg
          className="h-8 w-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
