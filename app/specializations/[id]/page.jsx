"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

import { getId } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";

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
     fetchData(id) ;

    }, [id]);

useEffect(()=>{
  setData(detail);
},[detail])    


  return (
    <div>
      {/* {data.name && (
        <>
          <img src={data.url} alt="img" />
          <h1>{data.name}</h1>
          <h1>{data.description}</h1>
        </>
      )} */}

      {data.name? (
        <>
        <img src={data.url} alt="img" />
        <h1>{data.name}</h1>
        <h1>{data.description}</h1>
        </>
      ):(
        <img
            src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
            alt="loading"
          />
      )}
    </div>
  );
}
