import { Button, Form, DatePicker, Select } from "antd";
import moment from "moment";

import axios from "axios";
import styles from "./CardEdit.module.css";
import Warning from "../../../components/warning/Warning";
import { useState } from "react";

const { Item } = Form;
const { Option } = Select;

export default function CardEdit({
  horarios,
  dia,
  status,
  setPut,
  id,
  setOpen,
  Med_id,
}) {
  const [form] = Form.useForm();
  const [horas, setHoras] = useState([]);
  const HorasDisponibles = (date) => {
    const fecha = new Date(date);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const día = String(fecha.getDate()).padStart(2, "0");

    const fechaFormateada = `${año}-${mes}-${día}`;

    if (fechaFormateada.length) {
      axios
        .get("http://localhost:3001/appointment")
        .then((res) => {
          const diasHorasFiltradas = res.data.filter(
            (cita) =>
              cita.scheduledDate === fechaFormateada && cita.user.id === Med_id
          );
          const horariosFiltrados = horarios.filter(
            (horario) =>
              !diasHorasFiltradas.some((cita) => cita.scheduledTime === horario)
          );

          return setHoras(horariosFiltrados);
        })
        .catch((err) => alert(err.message));
    } else {
      return horarios;
    }
  };

  const [error, setError] = useState({
    text: "",
    alert: false,
  });

  const disabledDate = (current) => {
    const today = moment().startOf("day");

    if (
      current &&
      (current.isBefore(today, "day") || // Deshabilita los días anteriores a hoy
        current.day() !== dia) // Deshabilita los días que no sean viernes
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (values) => {
    const { scheduledDate, scheduledTime } = values;

    const fecha = new Date(scheduledDate);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const día = String(fecha.getDate()).padStart(2, "0");

    const fechaFormateada = `${año}-${mes}-${día}`;

    axios
      .put(
        "http://localhost:3001/appointment/" + id,
        {
          scheduledDate: fechaFormateada,
          scheduledTime: scheduledTime,
          status: status,
        }
      )
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
        <h1>{"Modificar fecha y hora de la cita con ID:  " + id}</h1>
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
          <Item
            name="scheduledDate"
            label="Día"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el día de la cita",
              },
            ]}
          >
            <DatePicker
              disabledDate={disabledDate}
              onChange={(date) => HorasDisponibles(date)}
            />
          </Item>
          <Item
            name="scheduledTime"
            label="Hora"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la hora la cita",
              },
            ]}
          >
            <Select>
              {horas.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Item>

          {/* {errors.password && (<span>{errors.password}</span>)} */}

          <Button htmlType="submit" className={styles.submit}>
            Enviar
          </Button>
        </Form>
      </div>
    </>
  );
}
