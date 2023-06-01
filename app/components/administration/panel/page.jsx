'use client';
import Link from 'next/link';
import styles from './page.module.css'
import { useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Admin(){
  const nav = useRouter()  
  // const {logStatus} = useSelector(state => state)
  const userLocal = useSelector((state) => state.login.userLocal);
  const [showMenu, setShowMenu] = useState({
    speciality: false,
    medico:false,
    paciente:false,
    users:false,
    reviews:false,
});

  
// useEffect(()=>{
//   !logStatus.logStatus && nav.push("/components/forms/UserLogin");

// },[logStatus])

  const toggleMenu = (event) => {
  const value = event.target.name;
  
    setShowMenu({ ...showMenu, [value]: !showMenu[value] });
    
  };

  // if(logStatus.logStatus === "admin" || userLocal.role === "admin"){
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
        
        <div className={styles.box_selector}>
            
          <button className={showMenu.paciente ? styles.button_on : styles.button_of} onClick={toggleMenu} name='paciente'>Pacientes</button>
          {showMenu.paciente && (
            <ul className={styles.mini_menu}>
              <Link href={'/components/administration/records/pacientes'}><li>Registro</li></Link>
              <Link href={'/components/administration/forms/pacientes'}><li>Crear paciente</li></Link>
              
            </ul>
          )}
        </div>
        <div className={styles.box_selector}>
            
          <button className={showMenu.users ? styles.button_on : styles.button_of} onClick={toggleMenu} name='users'>Users</button>
          {showMenu.users && (
            <ul className={styles.mini_menu}>
              <Link href={'/components/administration/records/Users'}><li>Registro</li></Link>
              <Link href={'/components/forms/register'}><li>Crear Users</li></Link>
              
            </ul>
          )}
          
        
        </div>
        <div className={styles.box_selector}>
          <button className={showMenu.medico ? styles.button_on : styles.button_of} onClick={toggleMenu} name='reviews'>reviews</button>
          {showMenu.reviews && (
            <ul className={styles.mini_menu}>
              <Link href={'/components/administration/reviews'}><li>Registro</li></Link>
            </ul>
          )}
          </div>
        </div>
        
        )
    // }else{
    //     return(
    //         <div>
                
    //         </div>
    //     )
    // }
  }