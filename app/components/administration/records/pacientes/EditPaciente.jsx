"use client";
import axios from "axios";
import styles from "./editPaciente.module.css";
import Warning from "@/app/components/warning/Warning";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const backendURL = "http://localhost:3001";
const patientsURL = `${backendURL}/patients`;

export default function EditPaciente({ setOpen, datos }) {
  const [form] = Form.useForm();
  const nav = useRouter()
  const { logStatus } = useSelector((state) => state);
  useEffect(()=>{
    !logStatus.logStatus && nav.push("/components/forms/UserLogin");

  },[logStatus])
  const [error, setError] = useState({
    text: "",
    alert: false,
  });

  const onSubmit = (values) => {
    axios
      .put(patientsURL + id, {}, { withCredentials: true })
      .then(() => {
        setPut(true);
      })
      .catch((error) =>
        setError({ ...error, text: error.message, alert: true })
      );
    setOpen(false);
  };
  const FinishFailed = () => {
    setError({ ...error, text: "", alert: false });
  };
  return (
    <>
      <></>
      <Warning
        alert={error.alert}
        text={error.text}
        FinishFailed={FinishFailed}
      ></Warning>
      <div className={styles.container}>
        <h1>{"Modificar información del paciente: " + datos.email}</h1>
        <button
          className={
            styles.cerrar +
            " focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          }
          onClick={() => setOpen(false)}
        >
          Cerrar
        </button>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          form={form}
          onFinish={(values) => {
            onSubmit(values);
            form.resetFields();
          }}
        >
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre a cambiar",
              },
            ]}
            hasFeedback
          >
            <Input
              className={styles.input}
              type="text"
              name="nombre"
              placeholder="nombre"
            />
            {/* {errors.user && (<span>{errors.user}</span>)} */}
          </Form.Item>

          {/* {errors.password && (<span>{errors.password}</span>)} */}

          <Button htmlType="submit" className={styles.submit}>
            Enviar
          </Button>
        </Form>
      </div>
    </>
  );
}
