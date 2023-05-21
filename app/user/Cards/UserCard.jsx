'use client'
import styles from '../page.module.css'
import axios from "axios";
import { useEffect, useState } from "react";
import img from '../../citas/img/iconoMed.jpg'
import Image from 'next/image';
import Warning from '../../components/warning/Warning';


export default function UserCard(){
    const [user, setUser] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [contador,setContador]=useState(1)
    const [alertGet,setAlertGet]=useState(false)
    
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const getErr=()=>{
    setAlertGet(!alertGet)
  }

useEffect(() => {
  if (!user.id) {
    axios.get('http://localhost:3001/patients/2')
      .then(res => {
        setUser(res.data);
      })
      .catch(error => {
        getErr()
        
      });
  }
}, []);
const [alert,setAlert]=useState(false)
const FinishFailed=async()=>{
  if (contador === 2) {
    setAlert(!alert)
    // await axios.delete('localhost:3001/patients/2')
    setContador(1);
  } else {
    setContador(contador + 1);
    setAlert(!alert)
  }
  

}


    return (
        <div className={styles.userContainer +" w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"}>
          <Warning alert={alert} text={'Seguro que quieres continuar? se borrara tu perfil'} FinishFailed={FinishFailed}></Warning>
          <Warning alert={alertGet} text={'Error al traer la informacion del usuario'} FinishFailed={getErr} />
    <div className="flex justify-end px-4 pt-4">
    <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
        type="button"
        onClick={toggleMenu}
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-12 z-30 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-34 dark:bg-gray-700">
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <button
                
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                editar
              </button>
            </li>

            <li>
              <button
                onClick={FinishFailed}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
    <div className="flex flex-col items-center pb-10">
        {user.id &&<Image className="w-28 h-25 mb-3 rounded-full shadow-lg" width={600} height={600} src={img} alt="NOT_FOUND"/>}
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.id? user.firstName:'Loading...'}</h5>
        <h6 className="mb-1 text-sl font-medium text-gray-900 dark:text-white">{user.id ?user.lastName:'Loading...'}</h6>
        <span className="text-sm text-gray-500 dark:text-gray-400"><b>Total de citas: </b>{user.id && user.appointments.length} </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <a href="/citas" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agendar cita</a>
            
        </div>
    </div>
</div>
    )

}