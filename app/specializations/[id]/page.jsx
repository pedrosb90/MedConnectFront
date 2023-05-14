"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { getId } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import Medicos from "../Medicos";
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

  console.log(detail);
  return (
    <div className="h-full w-full justify-center items-center ">
      {data.name ? (
        <>
          <div className="w-3/4 mt-52 ml-40 mb-10">
            <img
              src={data.url}
              alt="img"
              className="w-full object-cover  object-center rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 bg-cimPallete-400 w-3/4 h-full ml-40 mb-12 justify-center rounded-lg">
            <div>
              <h1 className="p-5 text-white text-2xl mb-4 ml-10 mt-5 font-bold ">
                {data.name}
              </h1>
              <h4 className="text-white text-left ml-10 mr-24 mb-6">
                {data.description}
              </h4>
            </div>
            <Medicos data={data} className="m-10" />
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
