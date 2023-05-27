'use client'
import Table from './Tables/Table'
import UserCard from './Cards/UserCard'
import styles from './page.module.css'
import Link from 'next/link'

import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from 'next/navigation'
export default function User(){
  const { id } = useParams();

    const [datos, setDatos]=useState(false)
console.log(id);
  useEffect(() => {
    !datos && 
    axios.get('http://localhost:3001/users')
      .then((res) => {
        const citas = res.data;

        const usuario = citas.dataFinal.find(user => user.id === id)
        setDatos(usuario)
      })
      .catch(() => {
        alert('Error al obtener los datos del usuario');
      });
  }, [datos]);

  const userCitas = datos && datos
    return(
        <div className={styles.container}>
            <UserCard userCitas={userCitas}></UserCard>
            <Table userCitas={userCitas}></Table>
            <Link href="/" as="/">
        <button
          type="button"
          className={`btn_return text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.btn_return}`}
        >
          Regresar
        </button>
      </Link>
</div>
    )
}