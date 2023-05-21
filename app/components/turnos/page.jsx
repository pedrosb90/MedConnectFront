"use client"
import { Calendar, Col, Row, Select, Typography, theme } from 'antd';
const dayjs = require('dayjs');
const es = require('dayjs/locale/es'); 
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getSpeciality } from '@/app/redux/reducer';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import  style from "./calendar.module.css"

const Turnos = () => {
  // let day = date["$d"].getDay()
  dayjs.locale(es);
  const today = dayjs()
  const actualMonth = dayjs().month()
  const [value, setValue] = useState();
  const [selectedValue, setSelectedValue] = useState();
    const dispatch = useDispatch()
    const {AllSpecial} = useSelector(state => state.speciality)
    const { token } = theme.useToken();

const randomDay = () => {
  const randomIndex = Math.floor(Math.random() * 7);
  return randomIndex;
};

const añadirDia = async () => {
  const response = await axios.get("http://localhost:3001/specializations");
  const test = response?.data.map((obj) => {
    const selectedDay = randomDay();
    return { ...obj, selectedDay };
  });
  dispatch(getSpeciality(test));
};


useEffect(() => {
  if (!AllSpecial.length) {
    añadirDia();
  }
}, [AllSpecial]);


          const onSelect = (newValue) => {
            setValue(newValue);
            setSelectedValue(newValue);
          };
          
          const onPanelChange = (newValue) => {
            setValue(newValue);
            console.log("new value",newValue);
            console.log(newValue.format('DD-MM-YYYY'));
          };
          
          const disabledDate = (current) => {
          // Deshabilitar las fechas anteriores al día de hoy
          // if(AllSpecial.length){
          //   return AllSpecial.forEach(element => {
          //    return !(current.day() === 2 && element.selectedDay === 2)
          //   });
          // };
          return current && current.day() === 0
          }

      

        return (
          <>
        {/* <Alert message={`Seleccionaste la fecha: ${selectedValue?.format('DD-MM-YYYY')}`} /> */}
        <div className={style.container}>
      <Calendar
      className={style.calendar}
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i).locale(es);
            months.push(localeData.monthsShort(current));
          }
          for (let i = start; i < end; i++) {
            if (i >= actualMonth) {
              monthOptions.push(
                <Select.Option key={i} value={i} className="month-item">
                  {months[i]}
                </Select.Option>,
              );
            }
          }

          const month = value.month();      
          return (
            <div
            className={style.calendarHeader}
              style={{
                padding: 8,
              }}
            >
              <Typography.Title level={4}>Custom header</Typography.Title>
              <Row gutter={8}>
                <Col>
                  <p>Mes</p>
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        disabledDate={disabledDate}
        onChange={onPanelChange}
      />
    </div>
      </>
    );
  };
  
  export default Turnos;
