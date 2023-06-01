"use client";
import { useRouter } from 'next/compat/router'
import { Button, Form, Input, Radio, Alert } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import style from "./page.module.css";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const createMedicURL = `${backendURL}/medics/create`;
const registerURL = `${backendURL}/medics/register`;

export default function UserLogin() {
  const nav = useRouter();
  const { logStatus } = useSelector((state) => state);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useSelector((state) => state);
  
  useEffect(() => {
    !login && nav.push("/components/forms/UserLogin");
  }, []);


  const onSubmit = async (values) => {
    setLoading(true);
    const { first_name, last_name, phone, userType, email, password } = values;
    axios
      .create({ withCredentials: true })
      .post(userType === "medic" ? createMedicURL : registerURL, {
        first_name,
        last_name,
        phone,
        userType,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRegistered(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setRegistered("error");
      });

    //! this info must be send to the backend
  };

  if (!registered) {
    return (
      <div className={style.container}>
        <h1 className={style.title}>Añadir medico</h1>
        <Form
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={(values) => onSubmit(values)}
        >
          <Form.Item
            name="userType"
            label="Usuario"
            rules={[
              { required: true, message: "Por favor seleccione una opción" },
            ]}
          >
            <Radio.Group>
              <Radio value="pacient" defaultChecked>
                Paciente
              </Radio>
              {logStatus.logStatus === "master" ? (
                <Radio value="medic">Médico</Radio>
              ) : null}
              {logStatus.logStatus === "master" ? (
                <Radio value="admin">Administrador</Radio>
              ) : null}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="first_name"
            label="Nombre"
            rules={[{ required: true, message: "Por favor ingrese su nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Apellido"
            rules={[
              { required: true, message: "Por favor ingrese su apellido" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Número de telefono"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su número de telefono",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Correo electrónico"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su correo electrónico",
              },
              {
                validator: (_, value) => {
                  return new Promise((resolve, reject) => {
                    if (
                      value &&
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(value)
                    ) {
                      resolve(); // Resuelve la promesa si la contraseña es válida
                    } else {
                      reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                    }
                  });
                },
                message: "El correo no es válido",
              },
            ]}
            hasFeedback
          >
            <Input type="text" name="user" placeholder="Correo electronico" />
            {/* {errors.user && (<span>{errors.user}</span>)} */}
          </Form.Item>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: "Por favor ingrese su contraseña" },
              {
                validator: (_, value) => {
                  return new Promise((resolve, reject) => {
                    if (
                      value &&
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value)
                    ) {
                      resolve(); // Resuelve la promesa si la contraseña es válida
                    } else {
                      reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                    }
                  });
                },
                message:
                  "La contraseña debe contener 1 mayúscula, 1 minúscula y un número",
              },
            ]}
            hasFeedback
          >
            <Input.Password name="password" placeholder="Contraseña" />
          </Form.Item>

          <Form.Item
            name="ConfirmedPassword"
            label="Confirmar contraseña"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Por favor ingrese su contraseña" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Las contraseñas no coinciden");
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              name="ConfirmedPassword"
              placeholder="Confirmar contraseña"
            />
          </Form.Item>
          {/* {errors.password && (<span>{errors.password}</span>)} */}
          {registered === "error" ? (
            <Alert message="Ocurrió un error al registrarse" type="warning" />
          ) : (
            !registered && (
              <Button
                className={style.Button}
                htmlType="submit"
                loading={loading}
              >
                registrar
              </Button>
            )
          )}
        </Form>
      </div>
    );
  } else {
    return (
      <div>
        {registered && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="256"
              height="256"
              viewBox="0 0 256 256"
              xmlSpace="preserve"
            >
              <defs></defs>
              <g
                style={{
                  stroke: "none",
                  strokeWidth: 0,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "none",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <path
                  d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(44,198,23)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="matrix(1 0 0 1 0 0)"
                  strokeLinecap="round"
                />
                <polygon
                  points="37.33,69.32 37.33,69.32 37.33,47.17 37.33,47.17 66.85,33.97 77.93,45.05 "
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(36,173,21)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="matrix(1 0 0 1 0 0)"
                />
                <polygon
                  points="37.33,69.32 15.14,47.13 26.22,36.05 37.33,47.17 63.78,20.68 74.86,31.75 "
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "rgb(255,255,255)",
                    fill: "rgb(255,255,255)",
                    fillrule: "nonzero",
                    opacity: 1,
                    transform: "matrix(1 0 0 1 0 0)",
                  }}
                />
              </g>
            </svg>
          </div>
        )}
        <h1>Medico registrado con exito</h1>
      </div>
    );
  }
}
