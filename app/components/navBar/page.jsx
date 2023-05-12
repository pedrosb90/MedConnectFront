'use client';
import Image from 'next/image'
import img from './img/Logo.jpg'
import {  useState } from "react";
import styles from "./page.module.css"
import Link from 'next/link';
import { userInfo } from 'os';


export default function Navbar(){
  const [click, setClick] = useState(false);

const onActive = () => {
  setClick(!click);
  
};
const links = [{
  label:"Home",
  route:"/"
},
{
  label:"UserLogin",
  route:"/components/forms/UserLogin"
},
{
  label:'administration',
  route:'/components/administration'
},
{
  label:'Especialidades',
  route:'/Especialidades'

}]
const home = links[0];
const UserLogin= links[1];
const admin = links[2];
const espe = links[3]


    return (
        
          
            <div className={styles.navbar_scroll}>
            <Image src={img} className={styles.icono} alt='fondo' ></Image>
            
            <h1 className={styles.title}>Medicina & Salud Berazategui</h1>
            <nav className={styles.nav_link}>
            <Link  className={styles.links} href={home.route} as={home.route}><span>Home</span></Link>
              <Link  href={espe.route} className={styles.links} as={espe.route}><span>Especialidades</span></Link>
              <Link  href={admin.route} className={styles.links} as={admin.route}><span>{admin.label}</span></Link>
            </nav>
            <Link as={UserLogin.route} href={UserLogin.route}><button className={styles.nav_button}>{UserLogin.label}</button></Link>
            <div></div>
            <button className={styles.barras} onClick={onActive}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
            
            <nav className={click ? styles.nav_link_mobile : styles.nav_link_off}>
              <Link  href={home.route} as='home'><span>Home</span></Link>
              <span>Especialidades</span>
              <Link  href={admin.route} as='admin'>{admin.label}<span></span></Link>
              <Link  href={UserLogin.route} as='login'><button className={styles.nav_button_link}>{UserLogin.label}</button></Link>
            </nav>
    
    
           
            
            
              
        </div>
        
    )
}

