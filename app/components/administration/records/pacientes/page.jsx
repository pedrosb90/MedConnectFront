import axios from "axios"
import { useState,useEffect } from "react"

export default function Pacientes(){
    const[pacientes,setPacientes]=useState([])
    useEffect(()=>{
        !pacientes.length && axios.get('http://localhost:3001/patients')
        .then(res=>{
            setPacientes(res.data)
        })

    },[])
    return(
        <div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    n#
                </th>
                <th scope="col" className="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    N# citas
                </th>
                <th scope="col" className="px-6 py-3">
                    DNI
                </th>
                
                <th scope="col" className="px-6 py-3">
                    editar
                </th>
                
            </tr>
        </thead>
        <tbody>
        {pacientes.length && pacientes.map((paci, index) => (
  <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {index + 1}
    </th>
    <td className="px-4 py-2">
      {paci.firstName} <br />
      {paci.lastName}
    </td>
    <td className="px-6 py-4">
      {paci.email}
      
    </td>
    <td className="px-6 py-4">
      {paci.appointments.length}
    </td>
    <td className="px-6 py-4">
      {paci.dni}
    </td>
    
    <td className="px-6 py-4">
      <button  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
    </td>
  </tr>
))}
            

        </tbody>
    </table>
        </div>
    )
}