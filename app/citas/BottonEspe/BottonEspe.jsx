'use client'
import { useState } from "react";
import styles from './BottonEspe.module.css'


export default function BottonEspe({especialidades , handleClick}){
    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const especial = especialidades.length ? especialidades:[]
  
    return(
        <div className={styles.container}>
            <button
        id="mega-menu-icons-dropdown-button"
        className={isOpen ? styles.button_on: styles.button_serv}
        onClick={toggleDropdown}
      >
        Servicios
        {isOpen ?<svg className="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 15 12 9 18 15" /></svg>:
         <svg className="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" /></svg>}
      </button>

      {isOpen &&  
  <div
    id="mega-menu-icons-dropdown"
    className={`z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 ${styles.box}`}
  ><button name="All" onClick={handleClick} className={styles.especiality +" p-4 pb-0 md:pb-4 dark:text-white"}> Todas</button>
    {especial.length && especial.map(espe => {
      return (
        <button key={espe.id} name={espe.name} onClick={handleClick} className={styles.especiality +" p-4 pb-0 md:pb-4 dark:text-white"}>
          {espe.name}
                
        </button>
      );
    })}
  </div>
}
        </div>
    )
}