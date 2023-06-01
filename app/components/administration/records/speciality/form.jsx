"use client";
import React, { useState } from "react";
import styles from "./form.module.css";
import axios from "axios";
import { Button, Form, Input } from "antd";
import Success from "@/app/components/success/Success";
import Warning from "@/app/components/warning/Warning";

const backendURL = "http://localhost:3001";
const specializationsURL = `${backendURL}/specializations`;

export default function Forms({ info }) {
  const [registered, setRegistered] = useState(false);

  const [error, setError] = useState({
    alert: false,
    text: "Error al crear especialidad, el servidor esta caido o la especialidad ya existe",
  });
  const [success, setSuccess] = useState({
    alert: false,
    text: "Especialidad Actualizada exitosamente",
  });

  const onSubmit = (values) => {
    setRegistered(!registered);
    const { description, name } = values;
    const data = `${specializationsURL}/${info.id}`;
    const body = {
      description,
      name,
      url: info.url,
    };
    console.log("esto es body: ", body);
    axios
      .put(data, body, { withCredentials: true })
      .then(() => {
        // Código para manejar la respuesta en caso de éxito
        setSuccess({ ...success, alert: true });
      })
      .catch(() => {
        // Código para manejar la respuesta en caso de error
        setError({ ...error, alert: true });
      });
  };

  const [form] = Form.useForm();
  const FinishFailed = () => {
    setError({ ...error, alert: false });
  };
  const successFunc = () => {
    setSuccess({ ...success, alert: false });
  };

  return (
    <div className={styles.container + " top-1/3 "}>
      <Warning
        alert={error.alert}
        text={error.text}
        FinishFailed={FinishFailed}
      ></Warning>
      <Success
        alert={success.alert}
        text={success.text}
        success={successFunc}
      ></Success>
      <h1 className={styles.title}>Editar Especialidad</h1>
      <Form
        className={styles.form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        form={form}
        onFinish={(values) => {
          onSubmit(values);
          form.resetFields();
        }}
      >
        <Form.Item
          name="name"
          label="Especialidad"
          rules={[
            { required: true, message: "Por favor ingrese una especialidad" },
          ]}
          hasFeedback
          initialValue={info.name}
        >
          <Input name="name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
          rules={[
            { required: true, message: "Por favor ingrese una descripción" },
          ]}
          hasFeedback
          initialValue={info.description}
        >
          <Input.TextArea
            name="description"
            style={{
              resize: "none",
              overflow: "hidden",
              paddingRight: "25px",
              height: "50px",
            }}
          />
        </Form.Item>
        <Button htmlType="submit" className={styles.Button}>
          Enviar
        </Button>
      </Form>
    </div>
  );
}
