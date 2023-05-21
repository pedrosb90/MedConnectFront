"use client";
import { useState, useEffect } from "react";
import style from "./page.module.css";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const specializationsURL = `${backendURL}/specializations`;

export default function SpeRecords() {
  const [specialties, setSpecialty] = useState([]);

  useEffect(() => {
    async function fetchSpecialty() {
      const res = await fetch(specializationsURL);
      const data = await res.json();
      setSpecialty(data);
    }
    fetchSpecialty();
  }, []);

  return (
    <div className={style.divContainer}>
      <table className={style.table}>
        <thead className={style.tableHead}>
          <tr>
            <th className={style.idBox}>ID</th>
            <th className={style.nameBox}>Nombre</th>
            <th className={style.descriptionBox}>Descripción</th>
          </tr>
        </thead>
        <tbody className={style.tableBody}>
          {specialties.map((specialty) => (
            <tr key={specialty.id} className={style.tableRow}>
              <td>{specialty.id}</td>
              <td>{specialty.name}</td>
              <td>{specialty.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
