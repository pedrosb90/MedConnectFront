"use client";
import Image from "next/image";
import img from "./img/Logo.jpg";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import userLogo from '../../citas/img/iconoMed.jpg'
export default function Navbar() {
  const [click, setClick] = useState(false);
  const { logStatus } = useSelector((state) => state);
  const userGoogle = useSelector((state) => state.login.userGoogle);
  const userLocal = useSelector((state) => state.login.userLocal);
  const onActive = () => {
    setClick(!click);
  };
  const [clickUser,setClickUser]=useState(false)
  const links = [
    {
      label: "Inicio",
      route: "/",
    },
    {
      label: "Iniciar Sesion",
      route: "/components/forms/UserLogin",
    },
    {
      label: "Administracion",
      route: "/components/administration",
    },
    {
      label: "Especialidades",
      route: "/Especialidades",
    },
    {
      label: "Cerrar Sesion",
      route: "/",
    },
  ];
  const home = links[0];
  const UserLogin = links[1];
  const admin = links[2];
  const espe = links[3];
  const UserLogout = links[4];

  const logoutGoogle = () => {
    window.open("http://localhost:3001/auth/logout", "_self");
  };
  const logoutLocal = () => {
    window.open("http://localhost:3001/auth/logoutLocal", "_self");
  };
  const onClickFunc=()=>{
    setClickUser(!clickUser)

  }
  
  const userPage = userLocal.role === 'paciente' ? '/user': '/PerfilMedico'  
  return (
    <div className={styles.navbar_scroll}>
      <Image src={img} className={styles.icono} alt="fondo"></Image>

      <h1 className={styles.title}>Medicina & Salud Berazategui</h1>
      <nav className={styles.nav_link}>
        <Link className={styles.links} href={home.route}>
          <span>Inicio</span>
        </Link>
        <Link href={espe.route} className={styles.links}>
          <span>Especialidades</span>
        </Link>
        {logStatus.logStatus === "admin" ? (
          <Link href={admin.route} className={styles.links}>
            <span>{admin.label}</span>
          </Link>
        ) : null}
      </nav>
      {Object.keys(userGoogle).length !== 0 ||
      Object.keys(userLocal).length !== 0 ? (
        <div>
          {Object.keys(userGoogle).length === 0 ? (
          
            <div className={clickUser ? styles.userGoogle : styles.userGoogle_off}>
            <Image onClick={onClickFunc} className='w-14 h-14 rounded-full' src={userLogo} width={600}
        height={600} alt="NOT_FOUND" />
            <Link href={userPage} ><button style={{ color: "white" }}>
              <h3>Ver Perfil</h3>
              {`${userLocal.first_name} ${userLocal.last_name}`}
              </button>
               </Link> 
              </div>
              
              ) : (
                <div className={styles.userGoogle}>{userGoogle.photos && userGoogle.photos.length > 0 && (
                  <img onClick={onClickFunc} class="w-14 h-14 rounded-full" src={userGoogle.photos[0].value} alt="NOT_FOUND" />
                  )}
                
              {clickUser && <Link href={userPage}><button className="text-white"><h3>Ver Perfil</h3>{`${userGoogle.displayName}`}</button></Link>}
              
  </div>
)}

          {Object.keys(userLocal).length !== 0 && (
            <Link as={UserLogout.route} href={UserLogout.route}>
              <button className={styles.nav_button} onClick={logoutLocal}>
                {UserLogout.label}
              </button>
            </Link>
          )}

          {Object.keys(userGoogle).length !== 0 && (
            <Link as={UserLogout.route} href={UserLogout.route}>
              <button className={styles.nav_button} onClick={logoutGoogle}>
                {UserLogout.label}
              </button>
            </Link>
          )}
        </div>
      ) : (
        <Link as={UserLogin.route} href={UserLogin.route}>
          <button className={styles.nav_button}>{UserLogin.label}</button>
        </Link>
      )}

      <div></div>
      <button className={styles.barras} onClick={onActive}>
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      <nav className={click ? styles.nav_link_mobile : styles.nav_link_off}>
        <Link href={home.route}>
          <span>{home.label}</span>
        </Link>
        <Link href={espe.route}>
          <span>{espe.label}</span>
        </Link>
        <Link href={admin.route}>
          <span>{admin.label}</span>
        </Link>
        <Link href={UserLogin.route}>
          <button className={styles.nav_button_link}>{UserLogin.label}</button>
        </Link>
      </nav>
    </div>
  );
}
