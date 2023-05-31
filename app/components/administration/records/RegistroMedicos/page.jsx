"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Warning from "@/app/components/warning/Warning";
import Success from "@/app/components/success/Success";
import { useRouter } from "next/navigation";
const backendURL = "http://localhost:3001";
const medicsRegister = `${backendURL}/medics`;
import { useSelector } from "react-redux";

export default function Medicos() {
  const nav = useRouter()
  const { logStatus } = useSelector((state) => state);
  useEffect(()=>{
    !logStatus.logStatus && nav.push("/components/forms/UserLogin");

  },[logStatus])
  const [medicos, setMedicos] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [error, setError] = useState({
    text: "",
    alert: false,
  });
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(medicsRegister, {
          withCredentials: true,
        });
        setMedicos(response.data);
      } catch (err) {
        setError({ ...error, text: err.message, alert: true });
      }
    };

    fetchPatients();
  }, [isDelete]);

  const deleteMed = (id) => {
    const url = "http://localhost:3001/user/";

    count == 2 &&
      axios
        .delete(`${url}${id}`)
        .then(() => {
          setIsDelete(!isDelete);
          setCount(1);
        })
        .catch((err) => {
          setError({ ...error, text: err.message, alert: true });
          setCount(1);
        });
    setCount(2);
    const borrar = medicos?.length && medicos?.find((e) => e.id === id);

    count == 1 &&
      setError({
        ...error,
        text: `Se borrara el Medico: ${borrar?.user.last_name} de click otra vez para confirmar`,
        alert: true,
      });
  };

  const FinishFailed = () => {
    setError({ ...error, text: "", alert: false });
  };
  console.log("medicos: ", medicos);
  const filtro = medicos.filter((e) => e.user.role === "medico");
  console.log("filtro: ", filtro);
  return (
    <div className={styles.container}>
      <Warning
        alert={error.alert}
        text={error.text}
        FinishFailed={FinishFailed}
      ></Warning>
      <Success
        alert={isDelete}
        text={"El paciente fue eliminado correctamente"}
        success={() => {
          setIsDelete(false);
        }}
      ></Success>
      <h1
        className={
          styles.title +
          " mb-8 text-3xl font-sans leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl"
        }
      >
        Tabla de Medicos
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
                Especialidades
              </th>
              <th scope="col" className="px-6 py-3">
                Telefono
              </th>
              <th scope="col" className="px-6 py-3">
                Dirección
              </th>
              <th scope="col" className="px-6 py-3">
                <button>Eliminar</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {medicos.length &&
              medicos.map((med, index) => (
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
                    <a
                      href={`http://localhost:3000/medicos/${med.id}`}
                    >{`${med.user.first_name} ${med.user.last_name}`}</a>
                  </td>
                  <td className="px-6 py-4">
                    {med.specializations.map((e, index) => (
                      <div key={index}>{e.name}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4">{med.phone}</td>
                  <td className="px-6 py-4">{med.direccion}</td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteMed(med.user.id)}
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 active:ring-4 active:outline-none active:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center mr-1 mb-1 dark:border-red-500 dark:text-red-500 dark:active:text-white dark:active:bg-red-600 dark:active:ring-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
