'use client';
import Link from 'next/link';
import styles from './page.module.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Admin(){
  
  const {logStatus} = useSelector(state => state)

  const [showMenu, setShowMenu] = useState({
    speciality: false,
    medico:false
});

  const toggleMenu = (event) => {
  const value = event.target.name;
  
    setShowMenu({ ...showMenu, [value]: !showMenu[value] });
    
  };

  if(logStatus.logStatus === "admin" ){
        return(
          <div className={styles.container}>
          <h1 className={styles.title}>Panel de administrador</h1>
          <Link href={'/components/administration'}><button className={styles.button_inicio}>Inicio</button></Link>
          <div className={styles.box_selector}>
            
          <button className={showMenu.speciality ? styles.button_on : styles.button_of} onClick={toggleMenu} name='speciality'>Especialidades</button>
          {showMenu.speciality && (
            <ul className={styles.mini_menu}>
              <Link href={'/components/administration/records/speciality'}><li>Registro</li></Link>
              <Link href={'/components/administration/forms/speciality'}><li>Crear especialidad</li></Link>
              
            </ul>
          )}
        </div>
        <div className={styles.box_selector}>
          <button className={showMenu.medico ? styles.button_on : styles.button_of} onClick={toggleMenu} name='medico'>Medicos</button>
          {showMenu.medico && (
            <ul className={styles.mini_menu}>
              <Link href={'/components/administration/records/RegistroMedicos'}><li>Registro</li></Link>
              <Link href={'/components/forms/register'}><li>Añadir medico</li></Link>
              
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