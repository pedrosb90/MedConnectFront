'use client';
import Link from 'next/link';
import styles from './page.module.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Admin(){
  
  const {logStatus} = useSelector(state => state)
  console.log("estado",logStatus);

  const [showMenu, setShowMenu] = useState({
    speciality: false,
    medico:false
});

  const toggleMenu = (event) => {
  const value = event.target.name;
  
    setShowMenu({ ...showMenu, [value]: !showMenu[value] });
    
  };

  if(logStatus.logStatus === "master" ){
        return(
          <div className={styles.container}>
          <h1 className={styles.title}>Administración</h1>
          <Link href={'/components/administration'}><button className={styles.button_inicio}>Inicio</button></Link>
          <div className={styles.box_selector}>
            
          <button className={showMenu.speciality ? styles.button_on : styles.button_of} onClick={toggleMenu} name='speciality'>Especialidades</button>
          {showMenu.speciality && (
            <ul className={styles.mini_menu}>
              <Link href={'/components/administration/records/speciality'}><li>Registro</li></Link>
              <Link href={'/components/administration/forms/speciality'}><li>Crear especialidad</li></Link>
              <li>Remover especialidad</li>
            </ul>
          )}
        </div>
        <div className={styles.box_selector}>
          <button className={showMenu.medico ? styles.button_on : styles.button_of} onClick={toggleMenu} name='medico'>Medicos</button>
          {showMenu.medico && (
            <ul className={styles.mini_menu}>
              <li>Registro</li>
              <Link href={'/components/administration/forms/medicos'}><li>Añadir medico</li></Link>
              <li>Remover medico</li>
            </ul>
          )}
        </div>
        </div> 
        )
    }else{
        return(
            <div>
                
            </div>
        )
    }
  }
  