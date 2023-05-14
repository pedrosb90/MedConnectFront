'use client'
import Image from "next/image"
import styles from './page.module.css'
import { useDispatch, useSelector } from "react-redux";
import {useState , useEffect} from 'react';
import { getMedicos } from "@/app/redux/reducer";
import axios from "axios";
import Link from "next/link";

export default function CardMed ({showMenu}){
  const[medicos, setMedicos]=useState([])
  const dispatch = useDispatch()

  const estadoMed = useSelector((state)=>state.speciality.AllMedicos)
  
  const fetchMedicos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/medics');
      dispatch(getMedicos(response.data))
      setMedicos(estadoMed);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    !medicos?.length && fetchMedicos();
  }, [medicos]);




  
    return(
        <div className={showMenu ? styles.container:styles.cont_on}>
          
          <div className={styles.med_box}>
            <ul >
            {medicos.map(med =>{
              return(
                <span key={med.id}>
                <Link href={`/medicos/${med.id}`}>
  <li className="flex flex-wrap">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="2"/>
      <path d="M9 12h0.01"/>
      <path d="M13 12h2"/>
      <path d="M9 16h0.01"/>
      <path d="M13 16h2"/>
    </svg>
    Dr. {med.first_name}<br></br>
    {med.last_name}
  </li>
</Link>
</span>
              )
            })}
            </ul>
          </div>
          <div className={styles.contacto}>
            <h1>Contactos:</h1>
            <div className="flex justify-evenly gap-5">
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
            

          </div>
        </div>

    )

}