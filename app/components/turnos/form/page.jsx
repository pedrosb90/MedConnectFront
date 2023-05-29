"use client";
import { Button, Form, Input, Radio, Alert, Select } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMedicos } from "@/app/redux/reducer";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./form.module.css";
import { PhoneOutlined } from "@ant-design/icons";
import FlagIcon from "./FlagIcon";

export default function UserLogin() {
  const { logStatus, speciality } = useSelector((state) => state);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  //! logStatus has inside logStatus and userStatus
  //! speciality has inside AllMedicos

  useEffect(() => {
    axios
      .get("https://medconnectback-production.up.railway.app/medics")
      .then((res) => {
        dispatch(getMedicos(res.data));
      });
  }, []);

  console.log(speciality.AllMedicos);
  console.log(logStatus.userStatus);

  const onSubmit = async (values) => {
    const id = logStatus.userStatus.id;
    setLoading(true);
    const { first_name, last_name, role, email, password } = values;
    console.log({ first_name, last_name, role, email, password });
    axios
      .post("https://medconnectback-production.up.railway.app/auth/register", {
        first_name,
        last_name,
        role,
        email,
        password,
        id,
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

  // if(logStatus.userStatus){
  return (
    <div>
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        onFinish={(values) => onSubmit(values)}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Por favor ingrese su email" },
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
              message: "El email no es válido",
            },
          ]}
          hasFeedback
        >
          <Input
            className={style.input}
            type="text"
            name="user"
            placeholder="xxxx@mail.com"
          />
        </Form.Item>

        <div>
          <Select
            defaultValue="AR"
            // onChange={handleCountryChange}
            style={{ width: 120 }}
          >
            {/* <Option value="AR">
                    <FlagIcon code="AR" /> +54 (Argentina)
                  </Option>
                  <Option value="BR">
                    <FlagIcon code="BR" /> +55 (Brasil)
                  </Option>
                  <Option value="CL">
                    <FlagIcon code="CL" /> +56 (Chile)
                  </Option>
                  <Option value="PY">
                    <FlagIcon code="PY" /> +595 (Paraguay)
                  </Option>
                  <Option value="UY">
                    <FlagIcon code="UY" /> +598 (Uruguay)
                  </Option> */}
          </Select>
          <Form.Item
            name="phone"
            label="Teléfono"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su número de teléfono",
              },
              {
                validator: (_, value) => {
                  return new Promise((resolve, reject) => {
                    if (value && /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value)) {
                      resolve(); // Resuelve la promesa si la contraseña es válida
                    } else {
                      reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                    }
                  });
                },
                message: "el teléfono es incorrecto",
              },
            ]}
            hasFeedback
          >
            <Input
              addonBefore={<PhoneOutlined />}
              name="phone"
              placeholder="Teléfono"
            />
          </Form.Item>
        </div>

        {/* {errors.password && (<span>{errors.password}</span>)} */}
        {registered === "error" ? (
          <Alert message="Ocurrió un error al registrarse" type="warning" />
        ) : (
          !registered && (
            <Button block htmlType="submit" loading={loading}>
              registrarse
            </Button>
          )
        )}
      </Form>
    </div>
  );
  //   }else{
  //     return(
  //       <div>
  //           <h1>Debe iniciar sesión para pedir un turno</h1>
  //           {setTimeout(() => {
  //               router.push("/components/forms/UserLogin")
  //           }, 2000)}
  //       </div>
  //   )
  // }
}
