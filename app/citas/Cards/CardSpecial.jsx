"use client";
import axios from "axios";
import BottonEspe from "../BottonEspe/BottonEspe";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSpeciality } from "../../redux/reducer";
import { useEffect, useState } from "react";
import CardMedics from "./CardMedics";
import Link from "next/link";
import { postInfo } from "../../redux/CitaReducer";
import Warning from "@/app/components/warning/Warning";

const backendURL = process.env.PUBLIC_BACKEND_URL;
//const local = "http://localhost:3001/specializations";
// const backendURL = "http://localhost:3001";
const specializationsURL = `${backendURL}/specializations`;

export default function CardSpecial() {
  const [error, setError] = useState({
    text: "",
    alert: false,
  });
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.speciality.AllSpecial);
  const [especial, setEspecial] = useState([]);
  const [espeMed, setEspeMEd] = useState([]);
  const [medico, setMedico] = useState(false);


  const filtro = especialidades.filter(e=>e.deletedAt===null)

  async function fetchData() {
    try {
      const response = await axios.get(specializationsURL, {
        withCredentials: true,
      });

      dispatch(getSpeciality(response.data));
    } catch (error) {
      setError({ ...error, text: error.message, alert: true });
    }
  }
  const handleClick = (event) => {
    const nameES = event.target.name;
    if (medico) {
      const espeMed = medico.specializations.map((espe) => espe.name);

      if (nameES === "All")
        setEspecial(
          filtro.filter((espe) => espeMed.includes(espe.name))
        );
      else {
        setEspecial(filtro.filter((espe) => espe.name === nameES));
        setEspeMEd(medico.specializations);
      }
    } else {
      if (nameES === "All") setEspecial(filtro);
      else {
        setEspecial(filtro.filter((espe) => espe.name === nameES));
      }
    }
  };
  const handleClickMed = (event) => {
    setMedico(event);
    const espeMed = event.specializations.map((espe) => espe.name);
    const data = filtro.filter((espe) => espeMed.includes(espe.name));
    setEspecial(data);
    setEspeMEd(event.specializations);
  };

  useEffect(() => {

    !filtro.length ? fetchData() : setEspeMEd(filtro);
    setEspecial(filtro);
  }, [filtro]);
  const buttonReset = () => {
    setEspeMEd(filtro);
    setEspecial(filtro);
    setMedico([]);

  };
  const citaInfo = useSelector((state) => state.cita.info);
  const onClickFunc = (name) => {
    if (medico) {
      const { id, last_name, first_name } = medico.user;
      const schedules = medico.schedules;
      dispatch(
        postInfo({ id, last_name, first_name, schedules, especialidad: name })
      );
    } else {
      dispatch(postInfo({ especialidad: name }));
    }
  };

  const FinishFailed = () => {
    setError({ ...error, text: "", alert: false });
  };

  return (
    <>
      {" "}
      <Warning
        alert={error.alert}
        text={error.text}
        FinishFailed={FinishFailed}
      ></Warning>
      <div className={styles.container}>
        <h2 className={styles.subTitle}>
          ¿Quieres agendar con un profesional en particular?
        </h2>
        <CardMedics handleClickMed={handleClickMed}></CardMedics>
        <button onClick={buttonReset} className={styles.buttonReset}>
          Sin medico en particular
        </button>
        {medico.id ? (
          <h2 className={styles.subTitle}>
            Selecciona los servicios que deseas agendar del Dr.{" "}
            {medico.user.first_name + " " + medico.user.last_name}:
          </h2>
        ) : (
          <h2 className={styles.subTitle}>
            Selecciona los servicios que deseas agendar
          </h2>
        )}

        <BottonEspe
          especialidades={espeMed}
          handleClick={handleClick}
        ></BottonEspe>
        <div className={styles.box_espe}>
          {filtro.length ? (
            especial.map((espe) => {
              return (
                <div
                  key={espe.id}
                  className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${styles.cars_Espe}`}
                >
                  <div>
                    <Link href={`/specializations/${espe.id}`}>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {espe.name}
                      </h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {espe.description}
                    </p>
                  </div>
                  <Link href={"/components/turnos"}>
                    <button
                      onClick={() => onClickFunc(espe.name)}
                      className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
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
                  </Link>
                </div>
              );
            })
          ) : (
            <h1>...Loading</h1>
          )}
        </div>
      </div>
    </>
  );
}
