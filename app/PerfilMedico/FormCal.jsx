"use client";
import {
  Button,
  Form,
  Input,
  Radio,
  Alert,
  Select,
  Space,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import style from "./Forms.module.css";
import FormItem from "antd/es/form/FormItem";
import { useRef, useState } from "react";

let index = 0;
const localCal = "https://medconnectback-production.up.railway.app/medicoCalification";

export default function FormCal({
  filtromedicos,
  setSuccess,
  setError,
  success,
  error,
  clickCal,
  setClickCal
}) {
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onSubmit = (values) => {
    const body = { ...values, medicoId: filtromedicos[0].id };

    axios
      .post(localCal, body)
      .then(() => {
        // Código para manejar la respuesta en caso de éxito
        setSuccess({ ...success, alert: true });
        form.resetFields();
      })
      .catch(() => {
        // Código para manejar la respuesta en caso de error
        setError({ ...error, alert: true });
      });
  };
  const handleClick = () => {
    if (clickCal === true) {
      setClickCal(false);
    } else {
      setClickCal(true);
    }
  };
  return (
    <div className={style.container + " top-1/3 "}>
      <div className="flex justify-between">

<div>

      <h1 className={style.title}>Experencia</h1>
</div>
      <div>

<Button onClick={handleClick} type="dashed">X</Button>
</div>
      </div>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values) => onSubmit(values)}
      >
        <FormItem
          name="academic_degree"
          label="Titulo Academico"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su Titulo Academico",
            },
          ]}
        >
          <Input placeholder="Doctor en..." />
        </FormItem>
        <FormItem
          name="years_of_experience"
          label="Años de experiencia"
          rules={[
            {
              required: true,
              message: "Por favor ingrese sus años de experiencia",
            },
          ]}
        >
          <Input type="number" />
        </FormItem>
        <FormItem
          name="certifications"
          label="Certificados"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su número de telefono",
            },
          ]}
        >
          {/* <Input inputMode='multiple'/> */}
          <Select
            mode="multiple"
            style={{
              width: 220,
            }}
            placeholder="Certificación en..."
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  style={{
                    padding: "0 8px 4px",
                  }}
                >
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </FormItem>

        <Form.Item
          name="research"
          label="Investigacion"
          rules={[
            {
              required: true,
              message: "Por favor indica si eres de investigacion",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="true"> Si </Radio>
            <Radio value="false"> No </Radio>
          </Radio.Group>
        </Form.Item>

        <Button htmlType="submit" className={style.Button} onClick={() => setTimeout(handleClick, 1000)}>
          Enviar
        </Button>
      </Form>
    </div>
  );
}

