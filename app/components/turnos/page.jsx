"use client"
import { Calendar, Alert, Col, Radio, Row, Select, Typography, theme } from 'antd';
const dayjs = require('dayjs');
const es = require('dayjs/locale/es'); 
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getSpeciality } from '@/app/redux/reducer';
import axios from 'axios';
import { getMedicos } from '@/app/redux/reducer';
import {useEffect, useState } from 'react';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'

const Turnos = () => {
  // let day = date["$d"].getDay()
  dayjs.locale(es);
  const today = dayjs()
  const actualMonth = dayjs().month()
  const [value, setValue] = useState();
  const [selectedValue, setSelectedValue] = useState();
    const dispatch = useDispatch()
    const {AllSpecial} = useSelector(state => state.speciality)
    let check = false
    const { token } = theme.useToken();
    const specialityDay = [];

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

const auxFunc = () => {
  const updatedSpecialityDay = AllSpecial.map((obj) => {
    return { [obj.selectedDay]: obj.name };
  });
  specialityDay.splice(0, specialityDay.length, ...updatedSpecialityDay);
};

useEffect(() => {
  if (!AllSpecial.length) {
    añadirDia();
  }
}, [AllSpecial]);

useEffect(() => {
  auxFunc();
}, [AllSpecial]);

console.log(specialityDay);

          const onSelect = (newValue) => {
            setValue(newValue);
            setSelectedValue(newValue);
          };
          
          const onPanelChange = (newValue) => {
            setValue(newValue);
            console.log("new value",newValue);
            console.log(newValue.format('DD-MM-YYYY'));
          };
          
          const disabledDate = async (current) => {
          // Deshabilitar las fechas anteriores al día de hoy
          if(specialityDay.length){
            console.log(await specialityDay?.filter((obj) => obj))
            if (!current.isBefore(today.startOf('day')) || !specialityDay.filter((obj) => Object.keys(obj).includes(current.day()))) {
              return false;
            }return true;
          }
        };
  
      

        const wrapperStyle = {
          width: 300,
          border: `1px solid ${token.colorBorderSecondary}`,
          borderRadius: token.borderRadiusLG,
        };
        
        return (
          <>
        {/* <Alert message={`Seleccionaste la fecha: ${selectedValue?.format('DD-MM-YYYY')}`} /> */}
        <div style={wrapperStyle}>
      <Calendar
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
