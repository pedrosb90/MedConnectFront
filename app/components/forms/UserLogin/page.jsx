"use client";
import { Button, Form, Input, Divider } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getLogStatus, userChequer } from "@/app/redux/LogReducer";
import { useRouter } from "next/navigation";
import style from "./login.module.css";
import Link from "next/link";
import Warning from "../../warning/Warning";
import { useState } from "react";

const backendURL = "http://localhost:3001";
const authLoginURL = `${backendURL}/auth/login`;

export default function UserLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState({
    text: "",
    alert: false,
  });
  //! hacer el navigate al home, aviso de login y 1 seg despues al home
  const onSubmit = async (values) => {
    const { email, password } = values;
    axios
      .post(
        authLoginURL,
        { email, password },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => {
        if (res.data) {
          dispatch(getLogStatus(res.data.data.user.role));
          dispatch(userChequer(res.data.data));
          router.push("/");
        }
      })

      .catch((error) =>
        setError({
          ...error,
          text: "No se a registrado ese usuario ",
          alert: true,
        })
      );

    //! this info must be send to the backend
  };

  const google = () => {
    window.open(
      "http://localhost:3001/auth/google",
      "_self"
    );
  };
  const FinishFailed = () => {
    setError({ ...error, text: "", alert: false });
  };
  return (
    <>
      <Warning
        alert={error.alert}
        text={error.text}
        FinishFailed={FinishFailed}
      ></Warning>
      <div className={style.masterContainer}>
        <div className={style.container}>
          <div className={style.components}>
            <div className={style.buttonContainer}>
              <button
                id={style.google}
                className={style.button}
                onClick={google}
              >
                Google
              </button>
              <button id={style.facebook} className={style.button}>
                Facebook
              </button>
            </div>
            <div className={style.formContainer}>
              <Form
                className={style.form}
                layout="vertical"
                onFinish={(values) => onSubmit(values)}
              >
                <Form.Item
                  name="email"
                  label="Usuario"
                  rules={[
                    { required: true, message: "Por favor ingrese su usuario" },
                    {
                      validator: (_, value) => {
                        return new Promise((resolve, reject) => {
                          if (
                            value &&
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(
                              value
                            )
                          ) {
                            resolve(); // Resuelve la promesa si la contraseña es válida
                          } else {
                            reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                          }
                        });
                      },
                      message: "El usuario no es válido",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    className={style.input}
                    type="text"
                    name="user"
                    placeholder="Usuario"
                  />
                  {/* {errors.user && (<span>{errors.user}</span>)} */}
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Contraseña"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su contraseña",
                    },
                    {
                      validator: (_, value) => {
                        return new Promise((resolve, reject) => {
                          if (
                            value &&
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(
                              value
                            )
                          ) {
                            resolve(); // Resuelve la promesa si la contraseña es válida
                          } else {
                            reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                          }
                        });
                      },
                      message: "La contraseña no es válida",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    className={style.input}
                    name="password"
                    placeholder="Contraseña"
                  />
                </Form.Item>
                {/* {errors.password && (<span>{errors.password}</span>)} */}
                <Button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center mr-2 mb-2" block htmlType="submit">
                  Iniciar Sesión
                </Button>
                <p>Una vez que inicie sesión será redirigido al inicio!</p>
              </Form>
            </div>
          </div>
          <h2 className={style.h2}>
            ¿No tiene un usuario?
            <Link className={style.link} href="/components/forms/register">
              Cree uno!
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
}
