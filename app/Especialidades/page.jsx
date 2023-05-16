"use client";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getSpeciality } from "../redux/reducer";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Especialidades() {
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.speciality.AllSpecial);

  const [currentEsp, setCurrentEsp] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3001/specializations");

      dispatch(getSpeciality(response.data));
    } catch (error) {
      alert(error.message);
    }
  }

  const next = () => {
    setCurrentEsp((prevCurrentEsp) => prevCurrentEsp + 4);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(especialidades);
  }, [especialidades]);

  const especialidad = data.slice(0, currentEsp + 4);

  if (especialidad.length > data.length) {
    setHasMore(false);
  }

  console.log("CurrentEsp:", currentEsp);

  return (
    <>
      <div className="w-full">
        <h1 className="text-5xl">ESPECIALIDADES</h1>
        <Cards especialidad={especialidad}></Cards>
      </div>
      <div className="m-auto mt-20 h-96 max-w-4xl overflow-auto">
        <InfiniteScroll
          dataLength={data.length}
          next={next}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}
