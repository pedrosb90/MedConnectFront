'use client'
import style from '../page.module.css'
import axios from "axios";
import { useEffect, useState } from "react";
import {obtenerHorarios} from './obtenerHorarios.js'
import CardEdit from './CardEdit'

export default function Table(){
    
    const [userCitas, setUserCitas] = useState({});
    const [horarios, setHorarios]=useState([])
    const [open ,setOpen]= useState(false)
    const [datos, setDatos]=useState({
      dia:'',
      status:'',
      id:''
    })
    const [put,setPut]=useState(false)

useEffect(() => {
  if(!userCitas.length || put){
    axios.get('http://localhost:3001/appointment')
      .then(res => {
        setUserCitas(res.data);
        setPut(false)
      })
      .catch(error => {
        alert('Error al obtener los datos del usuario:', error);
      });
  

}}, [userCitas,put]);
const citas = userCitas.length && userCitas.filter(cita => cita.patient.id =='1')


// const start_time = "12:05:00";
//   const end_time = "17:05:00";
//   const duracion_cita = 40;

const editCita =async(nombre, apellido, status, id)=>{
  const res = await axios.get('http://localhost:3001/schedule')
  
  const horaCita = res.data.find(hora=> hora.medico.first_name === nombre && hora.medico.last_name === apellido)
  const horaAtencion = obtenerHorarios(horaCita.start_time, horaCita.end_time, 40)
  setHorarios(horaAtencion);
  setDatos({...datos ,dia: horaCita.day_of_week, status:status, id:id})
  setOpen(true)
  

  // const data = obtenerHorarios(start_time,end_time,duracion_cita);
 

}


    return(
        <div className={ style.table_cont +" relative shadow-md sm:rounded-lg"}>
         {open && <CardEdit horarios={horarios} dia={datos.dia} status={datos.status} setPut={setPut} id={datos.id} setOpen={setOpen}></CardEdit>}
            <h1 className={style.title + ' mb-8 text-4xl font-sans leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl'}>Citas Agendadas</h1>
    {citas && <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
        {citas && citas.map((cita, index) => (
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
      {cita.medico.first_name} <br />
      {cita.medico.last_name}
    </td>
    <td className="px-6 py-4">
      {cita.status}
    </td>
    <td className="px-6 py-4">
      <button onClick={()=>editCita(cita.medico.first_name ,cita.medico.last_name ,cita.status, cita.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
    </td>
  </tr>
))}
            
       
        </tbody>
    </table>}
    
</div>
    )
}