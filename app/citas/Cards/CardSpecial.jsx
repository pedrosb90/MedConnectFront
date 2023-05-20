"use client";
import axios from "axios";
import BottonEspe from "../BottonEspe/BottonEspe";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSpeciality } from "../../redux/reducer";
import { useEffect, useState } from "react";
import CardMedics from "./CardMedics";
import Link from "next/link";
const backendURL = process.env.PUBLIC_BACKEND_URL;
// const backendURL = "https://medconnectback-production.up.railway.app";
const specializationsURL = `${backendURL}/specializations`;

export default function CardSpecial() {
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.speciality.AllSpecial);
  const [especial, setEspecial] = useState([]);
  async function fetchData() {
    try {
      const response = await axios.get(specializationsURL);

      dispatch(getSpeciality(response.data));
    } catch (error) {
      alert(error.message);
    }
  }
  const handleClick = (event) => {
    const nameES = event.target.name;
    if (nameES === "All") setEspecial(especialidades);
    else setEspecial(especialidades.filter((espe) => espe.name === nameES));
  };
  const handleClickMed = (event) => {
    const espeMed = event.specializations.map((espe) => espe.name);
    const data = especialidades.filter((espe) => espeMed.includes(espe.name));
    setEspecial(data);
  };

  useEffect(() => {
    !especialidades.length ? fetchData() : setEspecial(especialidades);
  }, [especialidades, fetchData]);

  return (
    <div>
      <h2 className={styles.subTitle}>
        ¿Quieres agendar con un profesional en particular?
      </h2>
      <CardMedics handleClickMed={handleClickMed}></CardMedics>

      <h2 className={styles.subTitle}>
        Selecciona los servicios que deseas agendar:
      </h2>
      <BottonEspe
        especialidades={especialidades}
        handleClick={handleClick}
      ></BottonEspe>
      <div className={styles.box_espe}>
        {especialidades.length ? (
          especial.map((espe) => {
            return (
              <div
                key={espe.id}
                className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${styles.cars_Espe}`}
              >
                <Link href={`/specializations/${espe.id}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {espe.name}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {espe.description}
                </p>
                <button className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Agregar servicio
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            );
          })
        ) : (
          <h1>...Loading</h1>
        )}
      </div>
    </div>
  );
}
