"use client"
import { Alert,Button, Col, ConfigProvider, Row, Select, Typography, theme,DatePicker } from 'antd';
const dayjs = require('dayjs');
const es = require('dayjs/locale/es'); 
import locale from 'antd/locale/es_ES';
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import  style from "./calendar.module.css"
import MedicCarrousel from "./medicCarrousel/MedicCarrousel"
import axios from 'axios';
import { format } from 'date-fns';

const Turnos = () => {
  // let day = date["$d"].getDay()
  dayjs.locale(es);
  const today = dayjs()
  const actualMonth = dayjs().month()
  //*selected day local state
  const [day,setDay] = useState(null)

  //* allInfo must contain all info needed to request an appointment, it cannot miss anything
  const [allInfo, setAllInfo] = useState([]);

  //* state for medic selection un Carrousel component
  const [medic,setMedic] = useState(null)

  //* set structure for not repeat medics
  const avalaibleMedics = new Set()

  const Schedules = new Set()
  const Hours = {}
  const blockedSchedules = {}
    const dispatch = useDispatch()
    const {info} = useSelector((state)=>state.cita)
    const {AllMedicos} = useSelector(state => state.speciality)
    

    //*check for not repeat the useEffect call
    let check = false

    //! speciality appointment interval
    let interval = null
    switch (info.especialidad) {
      //5 min
      case "Traumatología obra social":
        interval = 5
        break;

        //10 min
        case "Cardiología":
        interval = 10
        break;


        //10 min
        case "Ginecología":
        interval = 10  
        break;

        //! THIS CASE IS ONLY FOR TESTING, MUST BE DELETED LATER
        case "Infectología":
        interval = 10  
        break;

        //15 min
        case "Mamografía":
        interval = 15
        break;


        //10 min
        case "Oftalmología":
        interval = 10
        break;


        //5 min
        case "Otorrinolaringología":
        interval = 5
        break;


        //10 min
        case "Pediatría":
        interval = 10
        break;


        //10 min
        case "Traumatología particular":
        interval = 10
        break;


        //10 min
        case "Clínica medica":
        interval = 10
        break;


        //10 min
        case "Ecografía":
        interval = 10
        break;


        //15 min
        case "Nutricionista":
        interval = 15
        break;
    
      default:
        break;
    }

    //! console.log(medic);

if(!info.medico){
  AllMedicos?.forEach(obj => {
    obj.specializations?.map(({name})=>{
      if(name === info.especialidad){
        avalaibleMedics.add(obj)
      }
    })
  });
}else{
  avalaibleMedics.add(info.medico)
}


const dayGetter = async () => {
  // const appointmentGetter = 
  await axios.get("http://localhost:3001/appointment")
  .then(res=>{
    res.data.forEach((appointment)=>{
      [...avalaibleMedics].forEach((medic)=>{
        if (medic.user.id === appointment.user.id) {
          const fechaFormateada = format(new Date(appointment.scheduledDate), 'dd-MM-yyyy');
          blockedSchedules[fechaFormateada] = appointment.scheduledTime
          console.log("fechaFormateada",fechaFormateada,"hora",appointment.scheduledTime);
        }
      })
    })
  })
  if (info.especialidad) {
    const schedules = await [...avalaibleMedics]?.map((obj)=>{
      return obj.schedules
    })
    schedules?.forEach((data)=>{
        data.map(day => {
          if (day.day_of_week) {
            Schedules.add(day.day_of_week)
            Schedules.add(day.start_time)
            Schedules.add(day.end_time)
          }
        })
    })
  }
}

if(interval && avalaibleMedics){ 
  [...avalaibleMedics].map((medic)=>{
    medic.schedules.forEach((time)=>{
      if (time) {
        Hours[time.day_of_week] = {["start"]:time.start_time,["end"]:time.end_time} 
      }
    })
  })
}

//! useEffect for some logic, it must be removed in a nearly future

useEffect(() => {
  if (!check) {
    check = true;
    dayGetter();
  }
}, [info]);

//! DatePicker required functions

const liOnclickController = (event,horario) => {
  console.log(horario);
}

const intervalSetter = async (day, time, interval, liOnclickController) => {
  const horarios = [];
  console.log(day, time,);
  const startTime = new Date(`${day?.format('DD-MM-YYYY')} ${time.start}`).getTime();
  const endTime = new Date(`${day?.format('DD-MM-YYYY')} ${time.end}`).getTime();
  return
  // let currentTime = startTime;
  // while (currentTime <= endTime) {
  //   const time = new Date(currentTime).toLocaleTimeString();
  //   horarios.push(time);

  //   currentTime += interval * 60 * 1000; // Avanzar 10 minutos en milisegundos
  // }

  // return (
  //   <ul className={style.scheduleUl}>
  //     {horarios.map((horario, index) => (
  //       <li onClick={(event) => liOnclickController(event, horario)} className={style.scheduleLi} key={index}>
  //         {horario}
  //       </li>
  //     ))}
  //   </ul>
  // );
};

          
          

          const onSelect = (newValue) => {
            console.log("testing");
            setDay(newValue);
            // console.log(day);
          };
          
          const onPanelChange = (newValue) => {
            if (newValue) {
              console.log(newValue.format('DD-MM-YYYY'));
            }
          };

          //&& current && current < today.startOf('day')
          // && current.isBefore(today.startOf("day"))
          // !current.isBefore(today.startOf('day')
          //! CHECK AND CORRECT THIS FUNCTION, ACTUALLY DOESNT WORK CORRECTLY
          const disabledDate = (current) => {
            if (info.especialidad && Schedules) { 
              return (![...Schedules].includes(current.day())); 
            }
          };

          // const disabledDate = (current) => {
          //   return current && current < today.startOf('day');
          // };
          

          //! THIS FUNCTION MUST CHECK THE REQUIRED FIELDS FOR AN APPOINTMENT AND THEN DISPATCH IT
          const onClick = () => {

          }

return (
  <>
        {day ? <Alert message={`Seleccionaste la fecha: ${day?.format('DD-MM-YYYY')}`} /> : null}
        <div className={style.container}>
        {info.medico ? null : <MedicCarrousel select={setMedic} medics={[...avalaibleMedics]}></MedicCarrousel>}
      <ConfigProvider locale={locale}>
      <DatePicker
      format={"DD-MM-YYYY"}
        onSelect={onSelect}
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
        <div>
        {/* {day ? intervalSetter(today,Hours[day.day()],interval,liOnclickController) :null} */}
        </div>
        <Button shape='round'>Confirmar fecha y horario</Button>
      </ConfigProvider>
    </div>
      </>
    );
  };
  
  export default Turnos;
