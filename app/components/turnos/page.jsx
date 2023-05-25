"use client"
import { Calendar, Col, ConfigProvider, Row, Select, Typography, theme,DatePicker } from 'antd';
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
    const dispatch = useDispatch()
    const {info} = useSelector((state)=>state.cita)
    const {AllSpecial,AllMedicos} = useSelector(state => state.speciality)
    const { token } = theme.useToken();

    //! temporarly speciality day, it must be changed

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

if(!info.id){
  AllMedicos?.forEach(obj => {
    obj.specializations?.map(({name})=>{
      if(name === info.especialidad){
        avalaibleMedics.add(obj)
      }
    })
  });
}


useEffect(() => {
  if (!AllSpecial.length) {
    añadirDia();
  }
}, [info]);


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
            if (info.especialidad && AllSpecial) {
              for (let i = 0; i < AllSpecial.length; i++) {
                const obj = AllSpecial[i];
                if (!current.isBefore(today.startOf('day')) && obj.name === info.especialidad && current.day() === obj.selectedDay) {
                  return false;
                }
              }
            }
            return true;
          }


          const timePicker = () => {
            if (avalaibleMedics) {
              [...avalaibleMedics].map((obj)=>{
                console.log("obj",obj);
              })
            }
          }



return (
  <>
        {/* <Alert message={`Seleccionaste la fecha: ${selectedValue?.format('DD-MM-YYYY')}`} /> */}
        <div className={style.container}>
        {info.id ? null : <MedicCarrousel select={setMedic} medics={[...avalaibleMedics]}></MedicCarrousel>}
      <ConfigProvider locale={locale}>
      <DatePicker
      className={style.calendar}
      // disabledDate={disabledDate}
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
      </ConfigProvider>
    </div>
      </>
    );
  };
  
  export default Turnos;
