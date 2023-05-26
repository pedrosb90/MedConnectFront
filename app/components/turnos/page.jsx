"use client"
import { Calendar,Button, Col, ConfigProvider, Row, Select, Typography, theme,DatePicker } from 'antd';
const dayjs = require('dayjs');
const es = require('dayjs/locale/es'); 
import locale from 'antd/locale/es_ES';
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getSpeciality } from '@/app/redux/reducer';
import axios from 'axios';
import  style from "./calendar.module.css"
import MedicCarrousel from "./medicCarrousel/MedicCarrousel"

const Turnos = () => {
  // let day = date["$d"].getDay()
  dayjs.locale(es);
  const today = dayjs()
  const actualMonth = dayjs().month()
  //* allInfo must contain all info needed to request an appointment, it cannot miss anything
  const [allInfo, setAllInfo] = useState([]);
  //* state for medic selection un Carrousel component
  const [medic,setMedic] = useState(null)
  //* state for 
  //* set structure for not repeat medics
  const avalaibleMedics = new Set()
  const Schedules = new Set()
    const dispatch = useDispatch()
    const {info} = useSelector((state)=>state.cita)
    const {AllMedicos} = useSelector(state => state.speciality)
    const { token } = theme.useToken();

    //*check for not repeat the useEffect call
    let check = false



if(!info.id){
  AllMedicos?.forEach(obj => {
    obj.specializations?.map(({name})=>{
      if(name === info.especialidad){
        avalaibleMedics.add(obj)
      }
    })
  });
}

console.log(info);

console.log("avalaibleMedics",avalaibleMedics);

const dayGetter = async () => {
  if (info.especialidad) {
    const schedules = await [...avalaibleMedics]?.map((obj)=>{
      return obj.schedules
    })
    // console.log(schedules);
    schedules?.forEach((data)=>{
        data.map(day => {
          if (day.day_of_week) {
            Schedules.add(day.day_of_week)
          }
        })
    })
  }
}

//! useEffect for some logic, it must be removed in a nearly future

useEffect(() => {
  if (!check) {
    check = true;
    dayGetter();
  }
}, [info]);

//! DatePicker required functions

          const onSelect = (newValue) => {
            setValue(newValue);
            setSelectedValue(newValue);
          };
          
          const onPanelChange = (newValue) => {
            setValue(newValue);
            console.log("new value",newValue);
            console.log(newValue.format('DD-MM-YYYY'));
          };

          //&& current && current < today.startOf('day')
          // !current.isBefore(today.startOf('day')
          //! CHECK AND CORRECT THIS FUNCTION, ACTUALLY DOESNT WORK CORRECTLY
          const disabledDate = (current) => {
            if (info.especialidad && Schedules) { 
              console.log([...Schedules]);
              return (![...Schedules].includes(current.day())); 
            }
          };

          // const disabledDate = (current) => {
          //   return current && current < today.startOf('day');
          // };
          


          const timePicker = () => {
            if (avalaibleMedics) {
              [...avalaibleMedics].map((obj)=>{
                console.log("obj",obj);
              })
            }
          }

          //! THIS FUNCTION MUST CHECK THE REQUIRED FIELDS FOR AN APPOINTMENT AND THEN DISPATCH IT
          const onClick = () => {

          }



return (
  <>
        {/* <Alert message={`Seleccionaste la fecha: ${selectedValue?.format('DD-MM-YYYY')}`} /> */}
        <div className={style.container}>
        {info.id ? null : <MedicCarrousel select={setMedic} medics={[...avalaibleMedics]}></MedicCarrousel>}
      <ConfigProvider locale={locale}>
      <DatePicker
        className={style.calendar}
        disabledDate={disabledDate}
        onChange={onPanelChange}
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
        />
        <Select>
          {timePicker}
        </Select>
        <Button shape='round'>Confirmar fecha y horario</Button>
      </ConfigProvider>
    </div>
      </>
    );
  };
  
  export default Turnos;
