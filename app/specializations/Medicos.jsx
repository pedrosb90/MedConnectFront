import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getMedicos } from "../redux/reducer";
import axios from "axios";
import styles from './Medicos.module.css'
export default function Medicos({data}){
    const medicosRE = useSelector((state)=>state.speciality.AllMedicos)
    
    const dispatch = useDispatch()
    const fetchMedicos = async () => {
        try {
          const response = await axios.get('http://localhost:3001/medics');
          dispatch(getMedicos(response.data))
          
        } catch (error) {
          alert(error);
        }
      };
    useEffect(()=>{
        !medicosRE?.length && fetchMedicos()
        

    },[medicosRE])
    

    const med = medicosRE.map(med => {
        return Object.assign({}, med, { 
          specializations: med.specializations.map(spec => spec.name)
        });
      });
    
    const MedFilter = med.filter(med=> med.specializations.includes(data.name) )
    console.log(MedFilter);
    return (
        <div class="relative overflow-x-auto">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Nombre
        </th>
        <th scope="col" class="px-6 py-3">
          Apellido
        </th>
        <th scope="col" class="px-6 py-3">
          Especialización
        </th>
      </tr>
    </thead>
    <tbody>
      {MedFilter.map((med) => (
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={med.id}>
        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {med.first_name}
        </td>
        <td class="px-6 py-4">
          {med.last_name}
        </td>
        <td class="px-6 py-4">
          
            {med.specializations.map((spec) => (
            <p key={spec.name}>{spec}</p>
            ))}
          
        </td>
      </tr>
      ))}
    </tbody>
  </table>
</div>
    )
}