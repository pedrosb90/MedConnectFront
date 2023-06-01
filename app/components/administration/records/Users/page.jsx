"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import Warning from "@/app/components/warning/Warning";
import Success from "@/app/components/success/Success";
import { useRouter } from "next/navigation";
const backendURL = "https://medconnectback-production.up.railway.app";
const userssURL = `${backendURL}/users`;
const specURLAll = `${userssURL}/all`;

export default function Medicos() {
  const [users, setUsers] = useState([]);
  const [habilitado, setHabilitado] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { logStatus } = useSelector((state) => state);
  const nav = useRouter();
  const [error, setError] = useState({
    text: "",
    alert: false,
  });

  useEffect(() => {
    !logStatus.userStatus && nav.push("/components/forms/UserLogin");

    const fetchPatients = async () => {
      try {
        const response = await axios.get(specURLAll);
        setUsers(response.data);
      } catch (err) {
        setError({ ...error, text: err.message, alert: true });
      }
    };

    fetchPatients();
  }, [isDelete, habilitado]);

  const deleteMed = (id, deletedAt) => {
    if (deletedAt !== null) {
      axios
        .patch(`${userssURL}/${id}`, { withCredentials: true })
        .then(() => {
          setHabilitado(!habilitado);
        })
        .catch((err) => {
          setError({ ...error, text: err.message, alert: true });
        });
    } else {
      axios
        .delete(`${userssURL}/${id}`, { withCredentials: true })
        .then(() => {
          setIsDelete(!isDelete);
        })
        .catch((err) => {
          setError({ ...error, text: err.message, alert: true });
        });
    }
  };

  const FinishFailed = () => {
    setError({ ...error, text: "", alert: false });
  };

  return (
    <div className={styles.container}>
      <Warning
        alert={error.alert}
        text={error.text}
        FinishFailed={FinishFailed}
      ></Warning>
      <Success
        alert={isDelete}
        text={"Deshabilitado Correctamente"}
        success={() => {
          setIsDelete(false);
        }}
      ></Success>
      <Success
        alert={habilitado}
        text={"Habilitado Correctamente"}
        success={() => {
          setHabilitado(false);
        }}
      ></Success>
      <h1
        className={
          styles.title +
          " mb-8 text-3xl font-sans leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl"
        }
      >
        Tabla de Usuarios
      </h1>
      <div className={styles.table + " rounded-md overflow-hidden"}>
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre Completo
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>

              <th scope="col" className="px-6 py-3">
                <button>Eliminar</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((user, index) =>
                user.deletedAt === null ? (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-4 py-2">
                      <a>{`${user.first_name} ${user.last_name}`}</a>
                    </td>

                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteMed(user.id, user.deletedAt)}
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 active:ring-4 active:outline-none active:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center mr-1 mb-1 dark:border-red-500 dark:text-red-500 dark:active:text-white dark:active:bg-red-600 dark:active:ring-red-900"
                      >
                        Deshabilitar
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-4 py-2 text-red-300">{`${user.first_name} ${user.last_name}`}</td>
                    <td className="px-6 py-4  text-red-300">{user.email}</td>

                    <td className="px-6 py-4  text-red-300">{user.role}</td>
                    <td className="px-6 py-4  text-red-300">
                      <button
                        onClick={() => deleteMed(user.id, user.deletedAt)}
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 active:ring-4 active:outline-none active:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center mr-1 mb-1 dark:border-red-500 dark:text-red-500 dark:active:text-white dark:active:bg-red-600 dark:active:ring-red-900"
                      >
                        Habilitar
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
