"use client";
import { useSelector, useDispatch } from "react-redux";
import styles from "./page.module.css";
import axios from "axios";
import { getMedicos, getSpeciality } from "../../redux/reducer";
import { getCitas } from "../../redux/CitaReducer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// const localSpec = "http://localhost:3001/specializations";
// const localCitas = "http://localhost:3001/appointment";
// const localMedic = "http://localhost:3001/medics";

const backendURL = process.env.PUBLIC_BACKEND_URL;
const specializationsURL = `${backendURL}/specializations`;
const citasURL = `${backendURL}/appointment`;
const medicsURL = `${backendURL}/medics`;



export default function Administration() {
  const nav = useRouter()  
  useEffect(()=>{
    !logStatus.logStatus && nav.push("/components/forms/UserLogin");

  },[logStatus])
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.speciality.AllSpecial);
  const citas = useSelector((state) => state.cita.citas);
  const medicos = useSelector((state) => state.speciality.AllMedicos);
  const { logStatus } = useSelector((state) => state);
  const [dataEsp, setDataEsp] = useState([]);
  const [dataCitas, setDataCitas] = useState([]);
  const [dataMedics, setDataMedics] = useState([]);
  const userLocal = useSelector((state) => state.login.userLocal);

  async function fetchData() {
    try {
      const responseCitas = await axios.get(citasURL, {
        withCredentials: true,
      });
      const response = await axios.get(specializationsURL, {
        withCredentials: true,
      });
      const responseMedics = await axios.get(medicsURL, {
        withCredentials: true,
      });

      dispatch(getCitas(responseCitas.data));
      dispatch(getMedicos(responseMedics.data));
      dispatch(getSpeciality(response.data));
    } catch (error) {
      alert(error.message);
    }
  }

  const filtro = dataEsp.filter(e=>e.deletedAt===null)

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDataEsp(especialidades);
    setDataCitas(citas);
    setDataMedics(medicos);
  }, [especialidades]);

  if (logStatus.logStatus === "admin" || userLocal.role === "admin") {
    return (
      <div className={`bg-white ${styles.container}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="m-8 text-4xl text-center font-sans bg-cimPallete-gold text-white py-4 px-6 rounded-lg shadow-lg items-center w-200">
              Administracion
            </h2>
            <p className="mt-1 font-bold tracking-tight text-gray-900 sm:text-2xl">
              Bienvenido a Administración
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Aqui podras administrar toda la informacion de la pagina web,
              crear medicos, especialidades, modificarlas y ver un registro de
              las citas activas y ya resueltas.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-10 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-8 w-8 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <rect x="5" y="3" width="14" height="18" rx="2" />{" "}
                      <line x1="9" y1="7" x2="15" y2="7" />{" "}
                      <line x1="9" y1="11" x2="15" y2="11" />{" "}
                      <line x1="9" y1="15" x2="13" y2="15" />
                    </svg>
                  </div>
                  Total de citas
                </dt>
                <dd className={styles.citas}>
                  {dataCitas.length}
                  <button className={styles.button}>Ver Detalles</button>
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  Citas concluidas
                </dt>
                <dd className={styles.citas_con}>
                  {dataCitas.filter((e) => e.status === "completed").length}
                  <button className={styles.button}>Ver Detalles</button>
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg
                      className="h-8 w-8 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />{" "}
                      <polyline points="14 2 14 8 20 8" />{" "}
                      <line x1="16" y1="13" x2="8" y2="13" />{" "}
                      <line x1="16" y1="17" x2="8" y2="17" />{" "}
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  Resumen
                </dt>
                <div className={styles.resumen}>
                  <dd className={styles.citas_con}>
                    {dataCitas.filter((e) => e.status === "pending").length}
                    <h2>Citas Pendientes</h2>
                  </dd>
                  <dd className={styles.citas_con}>
                    {dataCitas.filter((e) => e.status === "cancelled").length}
                    <h2>Citas Canceladas</h2>
                  </dd>
                  <dd className={styles.citas_con}>
                    {dataMedics.length}
                    <h2>Total de Medicos</h2>
                  </dd>
                  <dd className={styles.citas_con}>
                    {filtro.length}
                    <h2>Total de Especialidades</h2>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>No posee los permisos requeridos</h1>
      </div>
    );
  }
}
