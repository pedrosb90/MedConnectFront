"use client";
import { useState, useEffect } from "react";
import style from "./page.module.css";

export default function Registro() {
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    async function fetchMedicos() {
      const res = await fetch("localhost:3001/medics"); // endpoint para obtener los datos de los médicos
      const data = await res.json();
      setMedicos(data);
    }
    fetchMedicos();
  }, []);

  return (
    <div className={style.divContainer}>
      <table className={style.table}>
        <thead className={style.tableHead}>
          <tr>
            <th className={style.idBox}>ID</th>
            <th className={style.nameBox}>Nombre</th>
            <th className={style.lastNameBox}>Apellido</th>
            <th className={style.phoneBox}>Teléfono</th>
            <th className={style.addressBox}>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico) => (
            <tr key={medico.id} className={style.tableRow}>
              <td>{medico.id}</td>
              <td>{medico.nombre}</td>
              <td>{medico.apellido}</td>
              <td>{medico.telefono}</td>
              <td>{medico.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
