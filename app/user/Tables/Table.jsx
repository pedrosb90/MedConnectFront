'use client'
import style from '../page.module.css'
import axios from "axios";
import { useEffect, useState } from "react";
import {obtenerHorarios} from './obtenerHorarios.js'
import CardEdit from './CardEdit'
import Success from '../../components/success/Success'
export default function Table(){
    
    const [userCitas, setUserCitas] = useState([]);
    const [horarios, setHorarios]=useState([])
    const [open ,setOpen]= useState(false)
    const [datos, setDatos]=useState({
      dia:'',
      status:'',
      id:''
    })
    const [put,setPut]=useState(false)

    useEffect(() => {
      axios
        .get('http://localhost:3001/appointment')
        .then(res => {
          const citas = res.data;
          setUserCitas(citas.filter(cita => cita.id === '1'));
          console.log(citas);
        })
        .catch(() => {
          alert('Error al obtener los datos del usuario');
        });
    }, []);

const editCita =async(Med_id, status, Cita_id)=>{
  const res = await axios.get('http://localhost:3001/medics')
  
  const medico = res.data.find(med=> med.user.id=== Med_id)

  for(const hours of medico.schedules){
    const hora = obtenerHorarios(hours.start_time, hours.end_time, 40);
    
    setHorarios(hora);
    setDatos({...datos ,dia: hours.day_of_week, status:status, id:Cita_id})
  }
  setOpen(true)
}
const success =()=>{
  setPut(false)
}


    return(
      <>
      <Success alert={put} text={'Se modifico el dia y hora de su cita exitosamente'} success={success} ></Success>
        <div className={ style.table_cont +" relative shadow-md sm:rounded-lg"}>
         {open && <CardEdit horarios={horarios} dia={datos.dia} status={datos.status} setPut={setPut} id={datos.id} setOpen={setOpen}></CardEdit>}
            <h1 className={style.title + ' mb-8 text-4xl font-sans leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl'}>Citas Agendadas</h1>
    {userCitas.length && <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    n#
                </th>
                <th scope="col" className="px-6 py-3">
                    Paciente
                </th>
                <th scope="col" className="px-6 py-3">
                    Dia
                </th>
                <th scope="col" className="px-6 py-3">
                    hora
                </th>
                <th scope="col" className="px-6 py-3">
                    Medico
                </th>
                <th scope="col" className="px-6 py-3">
                    Estado
                </th>
                <th scope="col" className="px-6 py-3">
                    editar
                </th>
                
            </tr>
        </thead>
        <tbody>
        {userCitas && userCitas.map((cita, index) => (
  <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {index + 1}
    </th>
    <td className="px-4 py-2">
      {cita.patient.firstName} <br />
      {cita.patient.lastName}
    </td>
    <td className="px-6 py-4">
      {cita.scheduledDate}
    </td>
    <td className="px-6 py-4">
      {cita.scheduledTime}
    </td>
    <td className="px-6 py-4">
      {cita.user.first_name} <br />
      {cita.user.last_name}
    </td>
    <td className="px-6 py-4">
      {cita.status}
    </td>
    <td className="px-6 py-4">
      <button onClick={()=>editCita(cita.user.id ,cita.status, cita.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
    </td>
  </tr>
))}
            
       
        </tbody>
    </table>}
    
</div></>
    )
}