"use client";

import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMedicos } from "@/app/redux/reducer";
import axios from "axios";
import Link from "next/link";

export default function Menu_Medicos({ showMenu }) {
  const dispatch = useDispatch();

  const estadoMed = useSelector((state) => state.speciality.AllMedicos);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/medics");
      dispatch(getMedicos(response.data));
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    !estadoMed?.length && fetchMedicos();
  }, [estadoMed]);

  return (
    <div className={showMenu ? styles.container : styles.cont_on}>
      <div className={styles.med_box}>
        <ul>
          {estadoMed.map((med) => {
            return (
              <span key={med.id}>
                <Link href={`/medicos/${med.id}`}>
                  <li className="font-normal font-sans text-sm flex flex-wrap my-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-14 font-sans text-white font-thin"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
                      <rect x="9" y="3" width="6" height="4" rx="2" />
                      <path d="M9 12h0.01" />
                      <path d="M13 12h2" />
                      <path d="M9 16h0.01" />
                      <path d="M13 16h2" />
                    </svg>
                    Dr. {med.first_name}
                    <br />
                    {med.last_name}
                  </li>
                </Link>
              </span>
            );
          })}
        </ul>
      </div>
      <div className={styles.contacto}>
        <h1>Contactos:</h1>
        <h5> Cno. Gral. Manuel Belgrano 6511, Gutierrez</h5>
        <br />
        <h5> Teléfono: 1122039682</h5>
      </div>
    </div>
  );
}
