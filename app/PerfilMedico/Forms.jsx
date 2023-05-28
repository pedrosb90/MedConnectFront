"use client";
import style from "./Forms.module.css";
import { Button, Form, Input, Radio, Alert, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getSpeciality } from "../redux/reducer";
import { Option } from "antd/es/mentions";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Forms() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.speciality.AllSpecial);
  const [user, setUser] = useState({});

  const [form, setForm] = useState({
    phone: "",
    direccion: "",
    especialidades: [],
  });

  console.log("esto es el estado global:", especialidades);

  async function fetchData() {
    try {
      const response = await axios.get(`${backendURL}/specializations`);

      dispatch(getSpeciality(response.data));
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchData();
    if (!user.id) {
      axios
        .get(`${backendURL}/medics/1adab5a6-e3a4-4409-90f7-e0d3f5cc1a37`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    setData(especialidades);
  }, [especialidades]);
  console.log("esto es user: ", user);

  return (
    <div className={style.container + " top-1/3 "}>
      <h1 className={style.title}>Actualiza tu informacion</h1>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values) => onSubmit(values)}
      >
        {/* <Form.Item name="userType" label="Usuario" 
            rules={[
              {required:true,
              message:"Por favor seleccione una opción"}
            ]}>
              <Radio.Group >
                  <Radio value="pacient" defaultChecked>Paciente</Radio>
                  {logStatus.logStatus === "master" ?<Radio value="medic">Médico</Radio>:null}
                  {logStatus.logStatus === "master" ?<Radio value="admin">Administrador</Radio>:null}
                </Radio.Group>
            </Form.Item> */}
        <FormItem name="first_name" label="Nombre">
          <Input placeholder={user?.user?.first_name} disabled={true} />
        </FormItem>
        <FormItem name="last_name" label="Apellido">
          <Input placeholder={user?.user?.last_name} disabled={true} />
        </FormItem>
        <FormItem
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
        </FormItem>
        <FormItem
          name="especialidades"
          label="Especialidades"
          rules={[
            { required: true, message: "Escoge una o mas Especialidades" },
          ]}
        >
          <Select>
            {data.map((e, index) => {
              return (
                <Option key={index} value={e.name}>
                  {e.name}
                </Option>
              );
            })}
          </Select>
        </FormItem>
        <Form.Item name="direccion" label="Direccion">
          <Input />
          {/* {errors.user && (<span>{errors.user}</span>)} */}
        </Form.Item>

        {/* {errors.password && (<span>{errors.password}</span>)} */}
        {/* {registered === "error" ? <Alert
              message="Ocurrió un error al registrarse"
              type="warning"
    /> : !registered && <Button className={style.Button} htmlType='submit' loading={loading}>registrar</Button>} */}
      </Form>
    </div>
  );
}
