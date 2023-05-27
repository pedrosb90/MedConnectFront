"use client";
import style from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cita from "./Cita";
export default function Table() {
  const [citas, setCitas] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!user.id) {
      axios
        .get(
          "https://medconnectback-production.up.railway.app/medics/1adab5a6-e3a4-4409-90f7-e0d3f5cc1a37"
        )
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (!citas.id) {
      axios
        .get("https://medconnectback-production.up.railway.app/appointment")
        .then((res) => {
          setCitas(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  const getCitasPerfil = citas?.filter(
    (e) => e.user?.first_name === user?.user?.first_name
  );
  console.log("get citas perfil: ", getCitasPerfil);

  const [status, setStatus] = useState("completed");

  const handleCheckChange = async (e, citaId, scheduledDate, scheduledTime) => {
    setStatus((prevStatus) =>
      prevStatus === "pending" ? "completed" : "pending"
    );

    await axios
      .put(
        `https://medconnectback-production.up.railway.app/appointment/${citaId}`,
        {
          scheduledDate: scheduledDate,
          scheduledTime: scheduledTime,
          status: status,
        }
      )
      .then((response) => {
        console.log("Estado de la cita actualizado:", response.data);
      })
      .catch((error) => {
        // Manejar el error en caso de que la solicitud PUT falle
        console.error("Error al actualizar el estado de la cita:", error);
      });
  };

  return (
    <div
      className={
        style.table_cont + "relative overflow-x-auto shadow-md sm:rounded-lg"
      }
    >
      <h1
        className={
          style.title +
          " mb-8 text-4xl font-sans leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl"
        }
      >
        Citas Agendadas
      </h1>
      {getCitasPerfil && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                n#
              </th>
              <th scope="col" className="px-6 py-3">
                Paciente
              </th>
              <th scope="col" className="px-6 py-3">
                Dia
              </th>
              <th scope="col" className="px-6 py-3">
                hora
              </th>

              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Marcar como completado
              </th>
            </tr>
          </thead>
          <tbody>
            {getCitasPerfil &&
              getCitasPerfil?.map((cita, index) => (
                <Cita
                  handleCheckChange={handleCheckChange}
                  cita={cita}
                  index={index}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
