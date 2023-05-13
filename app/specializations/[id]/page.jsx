"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "next/navigation";
import { getId } from "@/app/redux/reducer";
import style from "app/detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.speciality.Detail);

  const [data, setData] = useState({});
  console.log(data);

  const fetchData = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/specializations/${id}`
      );
      dispatch(getId(res.data));
      setData(detail);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [dispatch, id]);
  return (
    <div className={style.containAll}>
      {data && (
        <div>
          <img src={data?.url} alt="NOT FOUND" />
          <h1>{data?.name}</h1>
          <h4>{data?.description}</h4>
        </div>
      )}
    </div>
  );
};

export default Detail;
