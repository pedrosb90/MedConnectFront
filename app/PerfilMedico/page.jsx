"use client";

import Image from "next/image";
import perfil from "../../public/image/perfil.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Table from "./Table";
import style from "./page.module.css";
import Forms from "./Forms";
import FormsHor from "./FormHor";
import FormCal from "./FormCal";
import FormsPut from "./FormsPut";
import TableHorarios from "./TableHorarios";
import Warning from "@/app/components/warning/Warning";
import Success from "@/app/components/success/Success";

export default function PerfilMedico() {
  // const [user, setUser] = useState({});
  const [citas, setCitas] = useState([]);
  const [clickAct, setClickAct] = useState(false);
  const [clickHor, setClickHor] = useState(false);
  const [clickCal, setClickCal] = useState(false);
  const [medicos, setMedicos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [error, setError] = useState({
    alert: false,
    text: "Error al subir los datos",
  });
  const [success, setSuccess] = useState({
    alert: false,
    text: "Informacion subida con exito",
  });
  const [errorDelete, setErrorDelete] = useState({
    alert: false,
    text: "Error al eliminar el horario",
  });
  const [successDelete, setSuccessDelete] = useState({
    alert: false,
    text: "Eliminado exitosamente",
  });

  const userLocal = useSelector((state) => state.login.userLocal);

  //en filtromedico traigo todo lo de un medico
  const filtromedico = medicos.filter((e) => e.user.id === userLocal.id);
  const filtroHorarios = horarios?.filter(
    (e) => e.medico.phone === filtromedico[0]?.phone
  );

  useEffect(() => {
    if (!medicos.id) {
      axios
        .get("https://medconnectback-production.up.railway.app/medics")
        .then((res) => {
          setMedicos(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (!citas.id) {
      axios
        .get("https://medconnectback-production.up.railway.appappointment")
        .then((res) => {
          setCitas(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (!horarios.id) {
      axios
        .get("https://medconnectback-production.up.railway.app/schedule")
        .then((res) => {
          setHorarios(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [success, successDelete]);

  const getCitasPerfil = citas.filter(
    (e) => e.user.first_name === userLocal?.first_name
  );

  const handleClick = () => {
    if (clickAct === true) {
      setClickAct(false);
    } else {
      setClickAct(true);
    }
  };

  const handleClickHor = () => {
    if (clickHor === true) {
      setClickHor(false);
    } else {
      setClickHor(true);
    }
  };
  const handleClickCal = () => {
    if (clickCal === true) {
      setClickCal(false);
    } else {
      setClickCal(true);
    }
  };
  const FinishFailed = () => {
    setError({ ...error, alert: false });
    setErrorDelete({ ...errorDelete, alert: false });
  };
  const successFunc = () => {
    setSuccess({ ...success, alert: false });
    setSuccessDelete({ ...successDelete, alert: false });
  };

  return (
    <div className="flex flex-col">
      <Warning
        alert={error.alert}
        text={error.text}
        FinishFailed={FinishFailed}
      ></Warning>
      <Success
        alert={success.alert}
        text={success.text}
        success={successFunc}
      ></Success>
      <Warning
        alert={errorDelete.alert}
        text={errorDelete.text}
        FinishFailed={FinishFailed}
      ></Warning>
      <Success
        alert={successDelete.alert}
        text={successDelete.text}
        success={successFunc}
      ></Success>
      <div className="flex justify-around  mt-14">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
            >
              <span className="sr-only">Open dropdown</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdown"
              className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Export Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <Image
              className="w-28 h-25 mb-3 rounded-full shadow-lg"
              src={perfil}
              width={600}
              height={600}
              alt="Perfil"
            />

            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {userLocal.first_name + " " + userLocal.last_name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Numero de citas: {getCitasPerfil.length}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <a
                onClick={() => {
                  handleClick();
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Actualizar Info
              </a>
              {filtromedico?.length ? (
                <a
                  onClick={() => {
                    handleClickHor();
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Horarios
                </a>
              ) : (
                <div></div>
              )}
              {filtromedico?.length ? (
                <a
                  onClick={() => {
                    handleClickCal();
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Experencias
                </a>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div>
            {filtroHorarios.length ? (
              <div>
                <TableHorarios
                  setSuccessDelete={setSuccessDelete}
                  successDelete={successDelete}
                  errorDelete={errorDelete}
                  setErrorDelete={setErrorDelete}
                  filtroHorarios={filtroHorarios}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <Table getCitasPerfil={getCitasPerfil}></Table>
      </div>

      <div>
        {filtromedico.length === 0 ? (
          clickAct === true ? (
            <Forms
              success={success}
              error={error}
              setSuccess={setSuccess}
              setError={setError}
              userLocal={userLocal}
              setClickAct={setClickAct}
            clickAct={clickAct}
            ></Forms>
          ) : (
            <div></div>
          )
        ) : clickAct === true ? (
          <FormsPut
            success={success}
            error={error}
            setSuccess={setSuccess}
            setError={setError}
            userLocal={userLocal}
            medico={filtromedico}
            setClickAct={setClickAct}
            clickAct={clickAct}
            
          ></FormsPut>
        ) : (
          <div></div>
        )}
        {clickHor === true ? (
          <FormsHor
            success={success}
            error={error}
            setSuccess={setSuccess}
            setError={setError}
            userLocal={userLocal}
            filtromedico={filtromedico}
            setClickHor={setClickHor}
            clickHor={clickHor}
          ></FormsHor>
        ) : (
          <div></div>
        )}
        {clickCal === true ? (
          <FormCal
            success={success}
            error={error}
            setSuccess={setSuccess}
            setError={setError}
            userLocal={userLocal}
            filtromedicos={filtromedico}
            setClickCal={setClickCal}
            clickCal={clickCal}
          ></FormCal>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}