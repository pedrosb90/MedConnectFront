"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedicos } from "@/app/redux/reducer";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import img from "../img/iconoMed.jpg";
import Warning from "@/app/components/warning/Warning";
const backendURL = "https://medconnectback-production.up.railway.app";
const medicsURL = `${backendURL}/medics`;

export default function CardMedics({ handleClickMed }) {
  const [medicos, setMedicos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const [error, setError] = useState({
    text: "",
    alert: false,
  });
  const estadoMed = useSelector((state) => state.speciality.AllMedicos);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get(medicsURL);

      dispatch(getMedicos(response.data));
    } catch (error) {
      setError({ ...error, text: error.message, alert: true });
    }
  };
  useEffect(() => {
    !estadoMed?.length ? fetchMedicos() : setMedicos(estadoMed);
  }, [estadoMed, fetchMedicos]);
  const handleNext = () => {
    const isFirstSlide = currentIndex + 5 >= medicos.length;
    if (isFirstSlide) {
      return   
    }
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const isFirstSlide = currentIndex === 0;
    if (isFirstSlide) {
      return 
      
    }
    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);
  };
  const FinishFailed = () => {
    setError({ ...error, text: "", alert: false });
  };

  const paginatedMedicos = medicos.slice(currentIndex, currentIndex + 5);
  // Filtrar medicos nulos
  return (
    <>
      <Warning
        alert={error.alert}
        text={error.text}
        FinishFailed={FinishFailed}
      ></Warning>
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
                  key={med.user.id}
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
                    <Link href={`/medicos/${med.user.id}`}>
                      <h5
                        className={`mb-1 text-xs font-medium text-gray-900 dark:text-white text-center ${styles.name}`}
                      >
                        {med.user.first_name
                          ? "Dr. " + med.user.first_name
                          : "...Loading"}
                      </h5>
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {med.user.last_name ? med.user.last_name : "..Loading"}
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
    </>
  );
}
