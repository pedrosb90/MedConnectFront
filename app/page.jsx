import CardsObras from "./components/CardsObras";
import { array } from "./components/ObrasSociales";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-20">
        <div className="text-center ">
          <h1 className="m-8 text-4xl">NUESTRAS OBRAS SOCIALES</h1>
          <CardsObras obras={array}></CardsObras>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1947.6150797869561!2d-58.196227546980765!3d-34.81889447489231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a328738980375f%3A0x2fac7c5d3ccc50d5!2sMedicina%20y%20Salud%20Berazategui%20Centros%20Medicos!5e0!3m2!1ses!2sco!4v1683889179017!5m2!1ses!2sco"
              className="w-80 h-60 border-0 lazy"
            ></iframe>

            <div className="flex flex-col justify-end gap-5">
              <div className="flex justify-evenly ">
                <img
                  className="h-10 w-10"
                  src="https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM"
                  alt=""
                />
                <img
                  className="h-10 w-10"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Logo_de_Facebook.png/220px-Logo_de_Facebook.png"
                  alt=""
                />
                <img
                  className="h-10 w-10"
                  src="https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN"
                  alt=""
                />
              </div>
              <h3>Cno. Gral. Manuel Belgrano 6511, Gutierrez</h3>
              <h3>Teléfono fijo: 1122039682</h3>
            </div>
          </div>
          <div>
            <h1>SI TE QUIERES SUMAR A NUESTRO EQUIPO</h1>
            <h1>berazategui@gmail.com</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
