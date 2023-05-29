"use client";
import style from "./Forms.module.css";
import { Button, Form, Input, Radio, Alert, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getSpeciality } from "../redux/reducer";
import { Option } from "antd/es/mentions";
const local =
  "https://medconnectback-production.up.railway.app/specializations";

export default function Forms({ userLocal }) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const especialidades = useSelector((state) => state.speciality.AllSpecial);

  const [form, setForm] = useState({
    phone: "",
    direccion: "",
    especialidades: [],
  });

  console.log("esto es el estado global:", especialidades);

  async function fetchData() {
    try {
      const response = await axios.get(local);

      dispatch(getSpeciality(response.data));
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(especialidades);
  }, [especialidades]);
  // console.log("esto es user: ",user);

  return (
    <div className={style.container + " top-1/3 "}>
      <h1 className={style.title}>Actualiza tu informacion</h1>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values) => onSubmit(values)}
      >
        <FormItem name="first_name" label="Nombre">
          <Input placeholder={userLocal.first_name} disabled={true} />
        </FormItem>
        <FormItem name="last_name" label="Apellido">
          <Input placeholder={userLocal.last_name} disabled={true} />
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
      </Form>
    </div>
  );
}
