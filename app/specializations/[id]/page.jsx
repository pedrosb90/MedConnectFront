"use client"
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'next/navigation';
import {useRouter} from 'next/router'




const getId = () => {

  const {id} = useParams();
  
  console.log(id)
  
  return (
    <div>
      <h1>
      estamos en el getId {id}

      </h1>
      </div>
  )
}

export default getId;














// import { getId } from "../redux/reducer";
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { useEffect } from "react";



// export default function page() {

//   const router = useRouter()
//   const {id} = router.query
  
//   const detail = useSelector((state)=>state.Detail)
//   const dispatch = useDispatch();

  
//   async function fetchData() {
//     try {
//       const response = await axios.get(`http://localhost:3001/specializations/${id}`);
//       dispatch(getId(response.data));
      
//     } catch (error) {
//       alert(error.message);
//     }
//   }
//   useEffect(()=>{
//     fetchData()
//   },[])

//   return (
//     <div>
//       {detail.name? (
//         <>
//         <img src={detail.url} alt="img" />
//         <h1>{detail.name}</h1>
//         <h1>{detail.description}</h1>
//         </>
//       ):(
//         <img
//             src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
//             alt="loading"
//           />
//       )}
//     </div>
//   )
// }
