"use client";
import { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import styles from './page.module.css'
import img from './img/logo.jpeg'
import Image from "next/image";
const { Option } = Select;

const ReviewForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    // Simulación de envío de datos a través de una API o almacenamiento en la base de datos
    setTimeout(() => {
      setLoading(false);
      form.resetFields();
      message.success("¡La revisión ha sido enviada con éxito!");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Image src={img} className={styles.icono} alt="fondo" ></Image>
      <div>
      <h1 className={styles.title}>Danos tu opinión sobre la cita y déjanos tu calificación:</h1>
      <Form className={styles.form} form={form} onFinish={handleSubmit}>
        <Form.Item
          className=" text-slate-400"
          name="review"
          label="Review"
          rules={[{ required: true, message: "Por favor, ingresa tu review." }]}
        >
          <Input.TextArea rows={4} placeholder="Escribe tu review" />
        </Form.Item>
        <Form.Item
          className=" text-slate-400"
          name="rating"
          label="Calificación"
          rules={[
            {
              required: true,
              message: "Por favor, selecciona una calificación.",
            },
          ]}
        >
          <Select placeholder="Selecciona una calificación">
            {[...Array(10)].map((_, index) => (
              <Option key={index + 1} value={index + 1}>
                {index + 1}
              </Option>
            ))}
          </Select>
        </Form.Item>
        
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className={styles.button + ' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'}
          >
            Enviar
          </Button>
        
      </Form>

      </div>
      
    </div>
  );
};

export default ReviewForm;
