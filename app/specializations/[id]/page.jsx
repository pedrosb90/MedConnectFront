"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { getId } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
// import style from "../../detail.module.css";

export default function page() {
  const detail = useSelector((state) => state.speciality.Detail);
  const dispatch = useDispatch();

  const [data, setData] = useState({});

  const { id } = useParams();

  async function fetchData(id) {
    try {
      const response = await axios.get(
        `http://localhost:3001/specializations/${id}`
      );
      dispatch(getId(response.data.data));
    } catch (error) {
      alert(error.message);
    }
  }
  useEffect(() => {
    fetchData(id);
  }, [id]);

  useEffect(() => {
    setData(detail);
  }, [detail]);

  return (
    <div className="h-full w-full ">
      {data.name ? (
        <>
          <img
            src={data.url}
            alt="img"
            className="lg:h-72 md:h-48 w-full   object-cover object-center "
          />

          <div className="w-2/4 p-4 bg-cimPallete-300 rounded-lg">
            <h1 className="text-cimPallete-200 text-2xl mb-4 font-bold">
              {data.name}
            </h1>
            <h4 className="text-cimPallete-900">{data.description}</h4>
          </div>
        </>
      ) : (
        <img
          src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
          alt="loading"
        />
      )}
    </div>
  );
}
