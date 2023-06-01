"use client";
import { Button, Form, DatePicker, Select, ConfigProvider } from "antd";
import moment from "moment";
import { obtenerHorarios } from "./obtenerHorarios.js";
import axios from "axios";
import styles from "./CardEdit.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MedicCarrousel from "./medicCarrousel/MedicCarrousel.jsx";
import SideCard from "./SideCard/SideCard";
import { getMedicos } from "@/app/redux/reducer.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
const { Item } = Form;
const { Option } = Select;
import { postInfo, postSchedule } from "../../redux/CitaReducer.js";
import { useDispatch } from "react-redux";
import "dayjs/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";
const backendURL = "https://medconnectback-production.up.railway.app";
const medicsURL = `${backendURL}/medics`;
const appointURL = `${backendURL}/appointment`;

export default function Calendary() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [medSelect, select] = useState(false);
  const { info } = useSelector((state) => state.cita);
  const { login } = useSelector((state) => state);
  const [medico, setMedico] = useState(false);
  const [loading,setLoading] = useState(false)
  const especialidad = info.especialidad && info.especialidad;

  const getMedicos = async () => {
    const medicos = await axios.get(medicsURL);
    const filter = medicos.data.filter((med) => {
      return med.specializations.some(
        (specialization) => specialization.name === especialidad
        );
      });
      
      setMedico(filter);
    };

    
  useEffect(() => {
    if ((!login.userGoogle || !login.userLocal)) {
      nav.push("/components/forms/UserLogin");
      
    }else{
      !info.medico && info.especialidad && getMedicos();
      if (info.medico) {
        select(info.medico)
      }
      !info.especialidad && router.push("/citas");
    }
  }, []);


  const [form] = Form.useForm();
  const [horas, setHoras] = useState([]);
  const id = info.id ? info.id : medSelect.user?.id;
  const diasSelect = medSelect && medSelect.schedules.map((dia) => dia.day_of_week);
  const dias = info.id
    ? info.schedules.map((dia) => dia.day_of_week)
    : diasSelect;

  const totalHoras = info.id
    ? info.schedules.map((hora) => ({
        day_of_week: hora.day_of_week,
        start_time: hora.start_time,
        end_time: hora.end_time,
      }))
    : medSelect.schedules;

  const HorasDisponibles = (date) => {
    if (date) {
      const fecha = new Date(date);
      const año = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const día = String(fecha.getDate()).padStart(2, "0");

      const fechaFormateada = `${año}-${mes}-${día}`;
      const diaSeleccionado = date.day();

      const diaHoras = totalHoras.find(
        (hora) => hora.day_of_week === diaSeleccionado
      );
      const { start_time, end_time } = diaHoras;
      const horarios = obtenerHorarios(start_time, end_time, 40);

      if (fechaFormateada.length) {
        axios
          .get(appointURL)
          .then((res) => {
            const diasHorasFiltradas = res.data.filter(
              (cita) =>
                cita.scheduledDate === fechaFormateada && cita.user.id === id
            );
            const horariosFiltrados = horarios.filter(
              (horario) =>
                !diasHorasFiltradas.some(
                  (cita) => cita.scheduledTime === horario
                )
            );

            return setHoras(horariosFiltrados);
          })
          .catch((err) => alert(err.message));
      } else {
        return horarios;
      }
    } else {
      setHoras([]);
    }
  };

  const disabledDate = (current) => {
    if (dias.length) {
      const today = moment().startOf("day");
      // Array con los días que quieres habilitar, en este caso solo viernes (5)

      if (
        current &&
        dias &&
        (current.isBefore(today, "day") || // Deshabilita los días anteriores a hoy
          !dias.includes(current.day())) // Deshabilita los días que no estén en el array
      ) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };

  console.log(medSelect);

  const onSubmit = async (values) => {
    setLoading(true);
    const { scheduledDate, scheduledTime } = values;
    const fecha = new Date(scheduledDate);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const día = String(fecha.getDate()).padStart(2, "0");
    const fechaFormateada = `${año}-${mes}-${día}`;
    if (medSelect || (info.id && scheduledTime)) {
      dispatch(
        postSchedule({
          medSelect,
          scheduledTime,
          scheduledDate: fechaFormateada,
          userId: id,
        })
      );
      router.push("/components/turnos/form");
      setLoading(false)
    }
  };

  console.log("medico",medico);
  const doc = medSelect.first_name && medSelect.first_name;
  return (
    <>
      <div className={styles.container}>
        {doc ? (
          <h2>{"Elegiste al doct@ " + doc}</h2>
        ) : medSelect ? (
          <h2>
            {"Elegiste al doctor@ " +
              medSelect.user.first_name +
              " " +
              medSelect.user.last_name}
          </h2>
        ) : (
          <h2>Elige a un medico para tu cita</h2>
        )}
        {medico ? (
          <MedicCarrousel medics={medico} select={select}></MedicCarrousel>
        ):null}

        <h1>
          {"Selecciona la fecha y hora de tu cita para " + info.especialidad}
        </h1>

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
            name="scheduledDate"
            label="Día"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el día de la cita",
              },
            ]}
          >
            {/* <ConfigProvider locale={locale}> */}
            <DatePicker
              locale={locale}
              disabledDate={disabledDate}
              placeholder="Seleccione un dia"
              onChange={(date) => HorasDisponibles(date)}
            />
            {/* </ConfigProvider> */}
          </Form.Item>
          <Form.Item
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
          </Form.Item>

          {/* {errors.password && (<span>{errors.password}</span>)} */}

          <Button loading={loading} htmlType="submit" className={styles.submit}>
            Enviar
          </Button>
        </Form>
        <SideCard />
      </div>
    </>
  );
}
