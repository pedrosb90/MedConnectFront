"use client";
import CardsObras from "./components/CardsObras";
import { array } from "./components/ObrasSociales";
import CardMed from "./components/CardMedicos/page";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <main>

      <div className="flex flex-col gap-20">
        <div className="relative">
          {" "}
          <button
            className={`buttonMed absolute top-14 left-8 text-sm rounded-lg px-4 py-2 ${showMenu ? "text-black bg-white" : "text-white bg-cimPallete-blue left-10"}`}
            onClick={toggleMenu}
            
          >
            {showMenu ? ' Cerrar ': 'Medicos'}
          </button>
        </div>
        <div className="flex items-center justify-center h-screen">
          <Image
            src="/image/pexels-migs-reyes-4205505.jpeg"
            alt="My Image"
            width={1000}
            height={500}
          />
        </div>
        <div className="text-center ">
          <h1 className="m-8 text-4xl text-cimPallete-blue font-sans bg-cimPallete-gold text-white py-4 px-6 rounded-lg shadow-lg items-center w-200">
            {" "}
            NUESTRAS OBRAS SOCIALES
          </h1>

          <CardsObras obras={array}></CardsObras>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-evenly gap-5">
              <img
                className="h-10 w-10 rounded-full"
                src="https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Logo_de_Facebook.png/220px-Logo_de_Facebook.png"
                alt=""
              />
              <img
                className="h-10 w-10 rounded-full mb-3"
                src="https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center">
                <h3 className="text-center text-cimPallete-blue font-sans">
                  Cno. Gral. Manuel Belgrano 6511, Gutierrez
                </h3>
                <h3 className="text-center text-cimPallete-blue font-sans">
                  Teléfono fijo: 1122039682
                </h3>
                <br />
                <h1 className="text-center text-cimPallete-blue text-xs font-sans px-4 py-2 rounded-md border border-black">
                  SE PARTE DEL EQUIPO:
                  <span className="text-center text-cimPallete-blue text-xs font-sans mb-5">
                    Envianos tu CV berazategui@gmail.com
                  </span>
                </h1>
                <br />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1947.6150797869561!2d-58.196227546980765!3d-34.81889447489231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a328738980375f%3A0x2fac7c5d3ccc50d5!2sMedicina%20y%20Salud%20Berazategui%20Centros%20Medicos!5e0!3m2!1ses!2sco!4v1683889179017!5m2!1ses!2sco"
                  className="w-200 h-55 border-0 lazy mb-10 rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center"></div>
        </div>
      </div>

      <CardMed showMenu={showMenu}></CardMed>
    </main>
  );
}
