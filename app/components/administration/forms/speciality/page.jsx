"use client";
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { Button, Form, Input, Upload } from "antd";
import Image from "next/image";
export default function SpecialtyForm() {
  const [registered, setRegistered] = useState(false);

  const onSubmit = (values) => {
    setRegistered(!registered);
    const { description, name, image } = values;
    console.log(image.fileList[0].originFileObj);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image.fileList[0].originFileObj);
    formData.append("description", description);

    axios
      .post("http://localhost:3001/specializations", formData)
      .then((response) => {
        // Código para manejar la respuesta en caso de éxito
        alert("Registro exitoso");
        event.target.reset();
      })
      .catch((error) => {
        // Código para manejar la respuesta en caso de error
        alert("Error al registrar:", error);
      });
  };

  return (
    <div>
      <h1 className={styles.title}>Añadir Especialidad</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values) => onSubmit(values)}
      >
        <Form.Item
          name="name"
          label="Especialidad"
          rules={[
            { required: true, message: "Por favor ingrese una especialidad" },
          ]}
          hasFeedback
        >
          <Input name="name" placeholder="Descripción" />
        </Form.Item>

        <Form.Item name="image">
          <Upload
            name="image"
            type="file"
            listType="picture-card"
            className="avatar-uploader"
          >
            <div>
              <Image
                src={
                  "https://i.pinimg.com/originals/73/7e/c2/737ec290471f789e58b8e1e10cd45789.png"
                }
                alt="img"
                style={{
                  width: "35%",
                  aspectRatio: 1,
                  margin: "0 auto",
                  mixBlendMode: "color-burn",
                  opacity: "0.8",
                }}
              />
              <p>Subir imagen</p>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
          rules={[
            { required: true, message: "Por favor ingrese una descripción" },
          ]}
          hasFeedback
        >
          <Input name="description" placeholder="Descripción" />
        </Form.Item>
        <Button block htmlType="submit">
          boton
        </Button>
      </Form>
    </div>
  );
}
