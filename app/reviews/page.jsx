"use client";
import { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";

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
    <div className="flex justify-center content-center  m-52 pt-12 rounded-lg bg-blue-950  text-slate-400">
      <Form form={form} onFinish={handleSubmit} className="w-3/5">
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-slate-500 text-slate-950"
          >
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
