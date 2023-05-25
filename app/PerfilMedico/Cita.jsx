import {useEffect, useState} from "react"

export default function Cita({cita, index, handleCheckChange}) {

    const [check, setCheck] = useState(false)
    const [status,setStatus] = useState(cita.status)
   

const handleCheckBox = (e) => {

setCheck(e.target.checked)
handleCheckChange(cita.id, cita.scheduledDate, cita.scheduledTime, e.target.checked?"completed":"pending")
setStatus(e.target.checked?"completed":"pending")
}

useEffect(()=>{
    setCheck(cita.status==="completed"?true:false)
    
},[])



  return (

            <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </th>
              <td className="px-4 py-2">
                {cita?.patient?.firstName} <br />
                {cita?.patient?.lastName}
              </td>
              <td className="px-6 py-4">
                {cita?.scheduledDate}
              </td>
              <td className="px-6 py-4">
                {cita?.scheduledTime}
              </td>
              <td className="px-6 py-4">
                {status}
              </td>
              
              <td className="px-6 py-4">
              
              <input 
              onChange={(e)=>{handleCheckBox(e, cita.id, cita.scheduledDate, cita.scheduledTime)}} 
              type="checkbox" 
              id="item1"
              // checked={cita.status === "completed"?"completed":"pending"}
            //   value={status === "completed"?"checked":"unchecked"}
               checked={check}
              />
              </td>
            </tr>
    
  )
}
