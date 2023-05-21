"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { Button, Form, Input, Upload } from "antd";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const specsURL = `${backendURL}/specializations`;

export default function SpecialtyForm() {
  const [registered, setRegistered] = useState(false);
  const [image, setImage] = useState({ array: [] });
  const [loading, setLoading] = useState("");
  const [url, setUrl] = useState("");

  const onSubmit = (values) => {
    setRegistered(!registered);
    const { description, name } = values;

    const body = {
      description,
      name,
      url,
    };
    console.log(body);
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("image", image.fileList[0].originFileObj);
    // formData.append("description", description);

    axios
      .post(specsURL, body)
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

  const handleDrop = (files) => {
    const uploaders = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "MedConnect");
      formData.append("api_key", "977319699313977");
      formData.append("timestamp", (Date.now() / 1000) | 0);
      setLoading("true");
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dipgqcdtq/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          const fileURL = data.secure_url;
          setUrl(data.secure_url);
          console.log(fileURL);
          let specificArrayInObject = image.array;
          specificArrayInObject.push(fileURL);
          const newobj = { ...image, specificArrayInObject };
          setImage(newobj);
        });
    });
    axios.all(uploaders).then(() => {
      setLoading("false");
    });
  };

  // const deleteImag = ()=>{
  //   axios.delete("https://api.cloudinary.com/v1_1/dipgqcdtq/image/upload")
  //   setImage([])
  // }

  function imagePreview() {
    if (loading === "true") {
      return <h3>Cargando Imagenes...</h3>;
    }
    if (loading === "false") {
      return (
        <h3>
          {image.array.length <= 0
            ? "No Hay imagenes"
            : image.array.map((items, index) => (
                <img
                  key={index}
                  alt="Imagen"
                  // className="h-16 w-28 pr-4 bg-cover "
                  style={{
                    width: "125px",
                    height: "70px",
                    backgroundSize: "cover",
                    paddingRight: "15px",
                  }}
                  src={items}
                ></img>
              ))}
        </h3>
      );
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Añadir Especialidad</h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
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
          <Input name="name" placeholder="nombre..." />
        </Form.Item>

        {/* <Form.Item  name="image">
                <Upload
                  name="image"
                  type="file"
                  listType="picture-card"
                  className="avatar-uploader"
                >
                  <div className={styles.icono}>
                    <img
                      src={"https://i.pinimg.com/originals/73/7e/c2/737ec290471f789e58b8e1e10cd45789.png"}
                      alt="img"
                      style={{
                        width: '35%',
                        aspectRatio: 1,
                        margin: "0 auto",
                        mixBlendMode:"color-burn",
                        opacity: "0.8"
                      }}
                    />
                  <p>Subir imagen</p>
                  </div>
              </Upload>
                </Form.Item> */}
        <Container>
          <Dropzone
            className="dropzone"
            onDrop={handleDrop}
            onChange={(e) => setImage(e.target.value)}
            value={image}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <span className="cursor-pointer text-3xl">📂</span>
                  <p className="cursor-pointer">
                    Suelta tu imagen aqui, O da click para seleccionar
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          {/* <button onClick={deleteImag} >Delete</button> */}
          {imagePreview()}
        </Container>

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
        <Button htmlType="submit" className={styles.Button}>
          Enviar
        </Button>
      </Form>
    </div>
  );
}
