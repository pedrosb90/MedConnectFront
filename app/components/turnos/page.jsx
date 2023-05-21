"use client";

import { Alert, Calendar } from "antd";
import "moment/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpeciality } from "@/app/redux/reducer";
import axios from "axios";
// const backendURL = process.env.PUBLIC_BACKEND_URL;
const backendURL = "https://medconnectback-production.up.railway.app";
const specializationsURL = `${backendURL}/specializations`;

const Turnos = () => {
  const today = dayjs();
  const [value, setValue] = useState(today);
  const [selectedValue, setSelectedValue] = useState(today);
  const dispatch = useDispatch();
  const { AllSpecial } = useSelector((state) => state.speciality);
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let check = false;

  //* this function select a random day of the week
  const randomDay = () => {
    const randomIndex = Math.round(Math.random() * days.length);
    return days[randomIndex];
  };

  //* I temporarily add a new property to the response, setting it to a random day returned by the above function
  const añadirDia = async () => {
    const response = await axios.get(specializationsURL);
    const test = response?.data.map((obj) => {
      const selectedDay = randomDay();
      return { ...obj, selectedDay };
    });
    dispatch(getSpeciality(test));
  };

  useEffect(() => {
    if (!check) {
      check = true;
      añadirDia();
    }
  }, []);

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const disabledDate = (current) => {
    // Deshabilitar las fechas anteriores al día de hoy
    return current && current.isBefore(today.startOf("day"));
  };

  const auxTest = (value) => {
    AllSpecial.map((obj) => {
      console.log(obj);
    });
  };

  const test = (date) => {
    let day = date["$d"].getDay();
    switch (day) {
      case "Mo":
        return auxTest();

      case "Tu":
        return auxTest();

      case "We":
        return auxTest();

      case "Th":
        return auxTest();

      case "Fr":
        return auxTest();

      case "Sa":
        return auxTest();
      default:
        break;
    }
  };

  const dateFullCellRender = (date) => {
    test(date);
    console.log(date["$d"].getDay());
    return <div>texto</div>;
  };

  return (
    <>
      <Alert
        message={`Seleccionaste la fecha: ${selectedValue?.format(
          "DD-MM-YYYY"
        )}`}
      />
      <Calendar
        format={"DD-MM-YYYY"}
        locale={locale}
        value={value}
        fullscreen={true}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        disabledDate={disabledDate}
        cellRender={dateFullCellRender}
      />
    </>
  );
};

export default Turnos;
