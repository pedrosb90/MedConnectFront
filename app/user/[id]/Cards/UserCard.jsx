"use client";
import styles from "../page.module.css";
import axios from "axios";
import { useState } from "react";
import img from "../../../citas/img/iconoMed.jpg";
import Image from "next/image";
import Warning from "@/app/components/warning/Warning";
import { useSelector } from "react-redux";

export default function UserCard({ userCitas }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contador, setContador] = useState(1);
  const userGoogle = useSelector((state) => state.login.userGoogle);
  const userLocal = useSelector((state) => state.login.userLocal);
  const [alerta, setAlert] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const deleteFunc = () => {
  //   if (contador === 2) {
  //     setAlert(false);
  //     const id = userGoogle.id ? userGoogle.id : userLocal.id;
  //      axios
  //       .delete('http://localhost:3001/users/' + id)
  //       .then(() => {
  //         homeReturn()

  //       }).catch((err)=>{alert(err.message)})
  //     setContador(1);
  //   } else {
  //     setContador(contador + 1);
  //     setAlert(true);
  //   }
  // };
  const FinishFailed = () => {
    setAlert(false);
  };

  return (
    <div
      className={
        styles.userContainer +
        " w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      }
    >
      <Warning
        alert={alerta}
        text={"Seguro que quieres continuar? se borrara tu perfil"}
        FinishFailed={FinishFailed}
      ></Warning>

      <div className="flex justify-end px-4 pt-4">
        {/* <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
        type="button"
        onClick={toggleMenu}
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
      </button> */}

        {/* {isOpen && (
        <div className="absolute mt-12 z-30 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-34 dark:bg-gray-700">
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <button
                
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                editar
              </button>
            </li>

            <li>
              <button
                onClick={deleteFunc}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      )} */}
      </div>
      {Object.keys(userGoogle).length === 0 ? (
        <div className="flex flex-col items-center pb-10">
          {userCitas && (
            <Image
              className="w-28 h-25 mb-3 rounded-full shadow-lg"
              width={600}
              height={600}
              src={img}
              alt="NOT_FOUND"
            />
          )}
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userCitas
              ? userCitas.first_name + " " + userCitas.last_name
              : "Loading..."}
          </h5>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            <b>Total de citas: </b>
            {userCitas && userCitas.patients.length}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <a
              href="/citas"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Agendar cita
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-28 h-25 mb-3 rounded-full shadow-lg"
            src={userGoogle.photos[0].value}
            alt="NOT_FOUND"
          />

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userGoogle.displayName ? userGoogle.displayName : "Loading..."}
          </h5>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            <b>Total de citas: </b>'los usuarios de google no tiene citas '
          </span>

          <div className="flex mt-4 space-x-3 md:mt-6">
            <a
              href="/citas"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Agendar cita
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
