"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Warning from "@/app/components/warning/Warning";
import Success from "@/app/components/success/Success";
import Forms from "./form";
import { useSelector } from "react-redux";
const backendURL = "https://medconnectback-production.up.railway.app";
const specsURL = `${backendURL}/specializations`;
const specURLAll = `${specsURL}/all`;

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [habilitado, setHabilitado] = useState(false);
  const [error, setError] = useState({
    text: "",
    alert: false,
  });

  const [clickCal, setClickCal] = useState(false);
  const { login } = useSelector((state) => state);
  const [info, setInfo] = useState({
    id: 0,
    url: "",
    name: "",
    description: "",
  });

  useEffect(() => {

    !login && nav.push("/components/forms/UserLogin");

    const fetchPatients = async () => {
      try {
        const response = await axios.get(specURLAll);
        setEspecialidades(response.data);
      } catch (err) {
        setError({ ...error, text: err.message, alert: true });
      }
    };

    fetchPatients();
  }, [isDelete, habilitado]);

  const deleteEsp = (id, deletedAt) => {
    if (deletedAt !== null) {
      axios
        .patch(`${specsURL}/${id}`, { withCredentials: true })
        .then(() => {
          setHabilitado(!habilitado);
        })
        .catch((err) => {
          setError({ ...error, text: err.message, alert: true });
        });
    } else {
      axios
        .delete(`${specsURL}/${id}`, { withCredentials: true })
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
  const handleClickCal = (id, name, description, url) => {
    if (clickCal === true) {
      setClickCal(false);
      setInfo({
        id: 0,
        url: "",
        name: "",
        description: "",
      });
    } else {
      setInfo({
        id: id,
        url: url,
        name: name,
        description: description,
      });
      setClickCal(true);
    }
  };

  // const filtro = especialidades.filter((e) => e.deletedAt === null);

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
        Tabla de Especialidades
      </h1>
      <div className={styles.table + " rounded-md overflow-hidden"}>
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3">
                <button>Edit</button>
              </th>
              <th scope="col" className="px-6 py-3">
                <button>Eliminar</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {especialidades.length &&
              especialidades.map((esp, index) =>
                esp.deletedAt === null ? (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700  "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-4 py-2">{esp.name}</td>
                    <td className="px-6 py-4">{esp.description}</td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleClickCal(
                            esp.id,
                            esp.name,
                            esp.description,
                            esp.url
                          )
                        }
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 active:ring-4 active:outline-none active:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center mr-1 mb-1 dark:border-blue-500 dark:text-blue-500 dark:active:text-white dark:active:bg-blue-500 dark:active:ring-blue-800"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteEsp(esp.id, esp.deletedAt)}
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
                    <td className="px-4 py-2 text-red-300">{esp.name}</td>
                    <td className="px-6 py-4  text-red-300">
                      {esp.description}
                    </td>

                    <td className="px-6 py-4  text-red-300">
                      <div></div>
                    </td>
                    <td className="px-6 py-4  text-red-300">
                      <button
                        onClick={() => deleteEsp(esp.id, esp.deletedAt)}
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
      <div>{clickCal === true ? <Forms info={info}></Forms> : <div></div>}</div>
    </div>
  );
}
