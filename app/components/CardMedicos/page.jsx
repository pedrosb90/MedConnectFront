'use client'
import Image from "next/image"
import styles from './page.module.css'
import { useEffect, useState } from "react"
export default function CardMed ({showMenu}){
  
    return(
        <div className={showMenu ? styles.cont_on:styles.container}>
          
          <div className={styles.med_box}>
            <h1>medicos</h1>
          </div>
          <div className={styles.contacto}>
            <h1>contacto</h1>

          </div>
        </div>

    )

}