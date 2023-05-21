"use client";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getSpeciality } from "../redux/reducer";
// const backendURL = process.env.PUBLIC_BACKEND_URL;
const backendURL = "https://medconnectback-production.up.railway.app";
const local = "http://localhost:3001";

export default function Carrusel() {
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const especialidades = useSelector((state) => state.speciality.AllSpecial);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [espec, setEspec] = useState([]);

  async function getEspec() {
    try {
      const respo = await axios.get(`${local}/specializations`, {
        withCredentials: true,
        credentials: "include",
      });
      console.log(respo.data);
      dispatch(getSpeciality(respo.data));
      setEspec(especialidades);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    !espec?.length && getEspec();
  }, [espec]);

  const handlerPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const nextIndex = isFirstSlide ? espec.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
  };

  const handlerNext = useCallback(() => {
    const isFirstSlide = currentIndex === espec.length - 1;
    const nextIndex = isFirstSlide ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }, [currentIndex, espec]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      handlerNext();
    }, 3000);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div>
      <div className="text white max-w-[800px] h-[500px] w-full m-auto py-16 px-4 relative group">
        <div
          style={{
            backgroundImage: `url(${espec.length && espec[currentIndex].url})`,
          }}
          className="flex justify-between items-end w-full h-full rounded-2xl bg-center bg-cover duration-500 text-4xl font-sans "
        >
          {espec.length && espec[currentIndex].name}
          <Link
            href={`/Especialidades`}
            className="font-sans rounded-lg bg-cimPallete-300 opacity-60 text-2xl cursor-pointer"
          >
            <h1>Ver Mas Especialidades</h1>
          </Link>
        </div>

        <div className="hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
          <BsChevronCompactLeft onClick={handlerPrev} size={30} />
        </div>

        <div className="hidden group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
          <BsChevronCompactRight onClick={handlerNext} size={30} />
        </div>
        <div className="font-sans flex top-4 justify-center py-2">
          {espec.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className="cursor-pointer text-4xl"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
