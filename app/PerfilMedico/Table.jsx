'use client'
import style from "./page.module.css"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Table() {


    const [citas, setCitas] = useState([]);
    const [user, setUser] = useState({})

    //decirle a adhemir que falta hacer una ruta PUT para citas para poder modificar el estado de la cita
    const [statusCita, setStatusCita] = useState()
    

    useEffect(() => {
        if(!user.id){
            axios.get('https://medconnectback-production.up.railway.app/medics/2646bd4f-0ad8-44de-97f8-da6dbcdedf2b')
            .then(res=>{
                setUser(res.data)
            })
            .catch(error =>{
                getErr()
            })
        }
        if (!citas.id){
            axios.get('https://medconnectback-production.up.railway.app/appointment')
            .then(res=>{
                setCitas(res.data)
            })
            .catch(error =>{
                getErr()
            })
        }
    }, []);
    const getCitasPerfil = citas.filter((e)=>e.medico.first_name === user.first_name)
    console.log(getCitasPerfil);


  return (
    <div className={ style.table_cont +" relative overflow-x-auto shadow-md sm:rounded-lg"}>
            <h1 className={style.title + ' mb-8 text-4xl font-sans leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl'}>Citas Agendadas</h1>
    {getCitasPerfil && <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                    Estado
                </th>
                <th scope="col" className="px-6 py-3">
                    Marcar como completado
                </th>
                
            </tr>
        </thead>
        <tbody>
        {getCitasPerfil && getCitasPerfil.map((cita, index) => (
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
      {cita.status}
    </td>
    
    <td className="px-6 py-4">
    
    <input type="checkbox" id="item1" checked={cita.status === "completed"} />
    </td>
  </tr>
))}
            
       
        </tbody>
    </table>}
</div>
  )
}
