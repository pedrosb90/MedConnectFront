"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function page() {

  const [data, setData] = useState({});

  const { id } = useParams();

  async function fetchData(id) {
    try {
      const response = await axios.get(
        `http://localhost:3001/medics/${id}`
        );
        setData(response.data);
        
      } catch (error) {
        alert(error.message);
      }
    }
    useEffect(() => {
     fetchData(id) ;

    }, [id]);

 


  return (
    <div>

      {data.name? (
        <>
        <img src={data.url} alt="img" />
        <h1>{data.name}</h1>
        <h1>{data.description}</h1>

        <Medicos data={data}/>
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