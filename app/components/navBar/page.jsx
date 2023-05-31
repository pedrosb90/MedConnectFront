"use client";
import Image from "next/image";
import img from "./img/Logo.jpg";

import styles from "./page.module.css";
import Link from "next/link";

import userLogo from "../../citas/img/iconoMed.jpg";
import { getUser } from "@/app/redux/login";
import { getLocalUser } from "@/app/redux/login";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
export default function Navbar() {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const { logStatus } = useSelector((state) => state);
  const userGoogle = useSelector((state) => state.login.userGoogle);
  const userLocal = useSelector((state) => state.login.userLocal);

  const onActive = () => {
    setClick(!click);
  };
  const [clickUser, setClickUser] = useState(false);
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
    //window.open("http://localhost:3001/auth/logout", "_self");
    window.open(
      "http://localhost:3001/auth/logout",
      "_self"
    );
  };
  const logoutLocal = () => {
    //window.open("http://localhost:3001/auth/logoutLocal", "_self");
    window.open(
      "http://localhost:3001/auth/logoutLocal",
      "_self"
    );
  };
  const onClickFunc = () => {
    setClickUser(!clickUser);
  };
  useEffect(() => {
    fetch(
      "http://localhost:3001/auth/login/success",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        dispatch(getUser(resObject.user));
      })
      .catch((err) => {});

    fetch(
      "http://localhost:3001/auth/loginn/success",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        dispatch(getLocalUser(resObject.user));
      })
      .catch((err) => {});
  }, [logStatus]);

  const id = userLocal.id ? userLocal.id : userGoogle.id;
  const userPage =
    userLocal.role === "paciente" || userGoogle.id
      ? `/user/${id}`
      : "/PerfilMedico";
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
        {userLocal.role === "admin" ? (
          <Link href={admin.route} className={styles.links}>
            <span>{admin.label}</span>
          </Link>
        ) : null}
      </nav>
      {Object.keys(userGoogle).length !== 0 ||
      Object.keys(userLocal).length !== 0 ? (
        <div>
          {Object.keys(userGoogle).length === 0 ? (
            <div
              className={clickUser ? styles.userGoogle : styles.userGoogle_off}
            >
              <Image
                onClick={onClickFunc}
                className="w-14 h-14 rounded-full"
                src={userLogo}
                width={600}
                height={600}
                alt="NOT_FOUND"
              />
              <Link href={userPage}>
                <button
                  onClick={() => setClickUser(false)}
                  style={{ color: "white" }}
                >
                  <h3>Ver Perfil</h3>
                  {`${userLocal.first_name} ${userLocal.last_name}`}
                </button>
              </Link>
            </div>
          ) : (
            <div
              className={clickUser ? styles.userGoogle : styles.userGoogle_off}
            >
              {userGoogle.photos && userGoogle.photos.length > 0 && (
                <Image
                  width={600}
                  height={600}
                  onClick={onClickFunc}
                  className="w-14 h-14 rounded-full"
                  src={
                    userGoogle.photos[0].value
                      ? userGoogle.photos[0].value
                      : userLogo
                  }
                  alt="NOT_FOUND"
                />
              )}

              <Link href={userPage}>
                <button className="text-white">
                  <h3>Ver Perfil</h3>
                  {`${userGoogle.displayName}`}
                </button>
              </Link>
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
