"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Warning from "../../../warning/Warning";
import Success from "../../../success/Success";
import EditPaciente from "./EditPaciente";
import { useSelector } from "react-redux";
export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [error, setError] = useState({
    text: "",
    alert: false,
  });
  const [datos, setDatos] = useState({
    id: "",
    email: "",
    isPaci: "",
  });
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const { login } = useSelector((state) => state);
 
  useEffect(() => {
    axios
      .get("https://medconnectback-production.up.railway.app/patients")
      .then((res) => {
        const patientsData = res.data;

        const combinedData = [...patientsData];
        setPacientes(combinedData);

        })
       .catch ((err)=> {
        setError({ ...error, text: err.message, alert: true })
      });
      


    
  }, [isDelete]);

  const deletePaci = (id, isUser, email) => {
    const url = "https://medconnectback-production.up.railway.app/patients/";

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
    count == 1 &&
      setError({
        ...error,
        text:
          "Se borrara el paciente " +
          email +
          " de click otra vez para confirmar",
        alert: true,
      });
  };
  const onClickEdit = (id, email, isPaci) => {
    setOpen(true);
    setDatos({ ...datos, id, email, isPaci: isPaci ? true : false });
  };

  const FinishFailed = () => {
    setError({ ...error, text: "", alert: false });
  };
  return (
    <div className={styles.container}>
      {open && <EditPaciente setOpen={setOpen} datos={datos}></EditPaciente>}
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
        Registro de pacientes
      </h1>
      <div className={styles.table + " rounded-md overflow-hidden"}>
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                n#
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                N# citas
              </th>
              <th scope="col" className="px-6 py-3">
                DNI
              </th>
              
            </tr>
          </thead>
          <tbody>
            {pacientes.length &&
              pacientes.map((paci, index) => (
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
                    {paci.firstName} <br />
                    {paci.lastName}
                  </td>
                  <td className="px-6 py-4">{paci.email}</td>
                  <td className="px-6 py-4">{paci.appointments.length}</td>
                  <td className="px-6 py-4">{paci.dni || "pendiente"}</td>
                 
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
