'use client'
import axios from 'axios'
import styles from './page.module.css'
import { message } from "antd";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Review(){
    const [reviews ,setReviews]=useState(false)
    const [medicos, setMedicos]=useState(false)
    const [dele,setDele]=useState(false)
    const deleteEsp=(id)=>{
        axios.delete('https://medconnectback-production.up.railway.app/reviews'+id)
        .then(()=>{
            message.success('Se borro con exito')
            setDele(true)
            
        }).catch((err)=>{
            message.error(err.message)

        })
    }
    useEffect(()=>{
        const verificar = !reviews || dele 
        verificar && axios.get('https://medconnectback-production.up.railway.app/reviews')
        .then((res)=>{
            setReviews(res.data)
            setDele(false)
   
        }).catch((err)=>{
            message.error(err.message)

        })
        
    },[reviews, dele])
    

   
    return(
        <div className={styles.container}>
      
      
      <h1
        className={
          styles.title +
          " mb-8 text-3xl font-sans leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl"
        }
      >
        Reseñas de pacientes
      </h1>
      <div className={styles.table + " rounded-md overflow-hidden"}>
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                medico
              </th>
              <th scope="col" className="px-6 py-3">
                comentario
              </th>
              <th scope="col" className="px-6 py-3">
              rating
              </th>
              <th scope="col" className="px-6 py-3">
                Id medico
              </th>
              <th scope="col" className="px-6 py-3">
                <button>Eliminar</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {reviews &&
              reviews.map((esp) => (
                <tr
                  key={esp.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 "
                >
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {esp.id -1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {esp.user.first_name }<br></br>
                    {esp.user.last_name}
                  </th>
                    
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {esp.comment}
                  </th>
                  <td className="px-4 py-2">
                    {esp.rating}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={'/medicos/'+ esp.userId} >{esp.userId}</Link> 
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteEsp(esp.id)}
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 active:ring-4 active:outline-none active:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center mr-1 mb-1 dark:border-red-500 dark:text-red-500 dark:active:text-white dark:active:bg-red-600 dark:active:ring-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
    

    )
}