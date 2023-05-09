'use client';
import Image from 'next/image'
import img from './img/Logo.jpg'
import { useEffect, useState } from "react";
import styles from "./page.module.css"



export default function Navbar(){
  
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScroll(window.pageYOffset > 0);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [click, setClick] = useState(false);

const onActive = () => {
  setClick(!click);
  
};

    return (
        <div className={styles.box}>
          
            <div className={scroll ? styles.navbar_scroll :styles.navbar_box}>
            <Image src={img} className={styles.icono}/>
            <div></div>
            <h1 className={styles.title}>Medicina & Salud Berazategui</h1>
            <nav className={styles.nav_link}>
              <span>Especialidades</span>
              <span>Mis Turnos</span>
              <span>Mis Turnos</span>
            </nav>
            <button className={styles.nav_button}>Inicia sesión</button>
            <div></div>
            <button className={styles.barras} onClick={onActive}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
            
            <nav className={click ? styles.nav_link_mobile : styles.nav_link_off}>
              <span>Especialidades</span>
              <span>Mis Turnos</span>
              <span>Mis Turnos</span>
              <button className={styles.nav_button_link}>Inicia sesión</button>
            </nav>
    
    
            </div>
            
            
              
        </div>
        
    )
}

