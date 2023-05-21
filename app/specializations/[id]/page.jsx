"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { getId } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import Medicos from "../Medicos";
import styles from "./page.module.css";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const backendURL = "https://medconnectback-production.up.railway.app";
const specializationsURL = `${backendURL}/specializations`;
const local = "http://localhost:3001/specializations";

export default function Page() {
  const detail = useSelector((state) => state.speciality.Detail);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { id } = useParams();

  async function fetchData(id) {
    try {
      const response = await axios.get(`${specializationsURL}/${id}`);

      dispatch(getId(response.data.data));
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchData(id);
  }, [id, useSelector, useDispatch, useState, useParams]);

  useEffect(() => {
    detail.name && setData(detail);
  }, [detail]);

  useEffect(() => {
    // Limpiar el estado detail cuando se desmonte el componente
    return () => {
      dispatch(getId(null));
    };
  }, []);

  return (
    <div>
      <div>
        <section className={styles.container}>
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex flex-wrap items-center mx-auto max-w-7xl">
              <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                <div>
                  <div className="relative w-full max-w-lg">
                    <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

                    <div className="absolute rounded-full bg-fuchsia-300 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <div className="relative">
                      <img
                        className={
                          styles.img +
                          " object-cover max-w-[85%] object-center mx-auto rounded-lg shadow-2xl sm:w-full md:w-full"
                        }
                        alt="NOT_FOUND"
                        src={
                          data.url
                            ? data.url
                            : "https://w7.pngwing.com/pngs/270/376/png-transparent-hospital-drawing-coloring-book-clinic-others-angle-text-rectangle-thumbnail.png"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start mt-12 mb-2 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                <h1 className="mb-2 text-4xl font-sans leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">
                  {data.name ? data.name : "...Loading"}
                </h1>

                <div className="flex-col mt-0 lg:mt-6 max-w-7xl sm:flex">
                  <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className={`${styles.description} md:col-span-2`}>
                      {data.description}
                    </div>
                    {data.name ? (
                      <Medicos data={data} className="m-10"></Medicos>
                    ) : (
                      "...Loading medicos"
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Link href="/Especialidades" as="/Especialidades">
          <button
            type="button"
            className={`btn_return text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.btn_return}`}
          >
            Regresar
          </button>
        </Link>
      </div>
    </div>
  );
}
