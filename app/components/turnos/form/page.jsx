"use client"
import {Button,Form,Input,Radio,Alert,Select} from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicos } from '@/app/redux/reducer';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from "./form.module.css"
const { TextArea } = Input;
import { PhoneOutlined } from '@ant-design/icons';
import Image from 'next/image';

export default function UserLogin() {
  const {logStatus,speciality} = useSelector(state => state)
  const {schedule} = useSelector((state)=>state.cita)
  const [registered,setRegistered] = useState(false)
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()

    //! logStatus has inside logStatus and userStatus
    //! speciality has inside AllMedicos

  useEffect(()=>{
    axios.get("http://localhost:3001/medics")
    .then((res)=>{
        dispatch(getMedicos(res.data));
    })
},[])

const countries = [
  { name: 'Argentina', code: 'AR', prefix: '+54', flag: './img/argentina.png' },
  { name: 'Venezuela', code: 'VE', prefix: '+58', flag: './img/venezuela.png' },
  { name: 'Peru', code: 'PE', prefix: '+51', flag: './img/peru.png' },
  { name: 'Uruguay', code: 'UY', prefix: '+598', flag: './img/uruguay.png' },
  { name: 'Colombia', code: 'CO', prefix: '+57', flag: './img/colombia.png' },
  { name: 'Brasil', code: 'BR', prefix: '+55', flag: './img/brasil.png' },
  { name: 'Chile', code: 'CL', prefix: '+56', flag: './img/chile.png' },
  // Agrega más países según tus necesidades
];

const obrasSociales = ["particular","IOMA","OSMECON","OSAP","ELEVAR","CENTRO MEDICO PUEYRREDON","OSEIV","APRES","PAMI"]

const [selectedCountry, setSelectedCountry] = useState(countries[0]);
const [selectedObra,setSelectedObra] = useState(null)

const handleCountryChange = (event) => {
  const country = countries.find((c) => c.code === event);
  setSelectedCountry(country);
};

const handleObraChange = (event) => {
  setSelectedObra(event);
};

function validateObject(obj) {
  const requiredProperties = [
    "firstName",
    "lastName",
    "phone",
    "email",
    "dni",
    "observaciones"
  ];

  for (const prop of requiredProperties) {
    if (!obj.hasOwnProperty(prop) || obj[prop] === "") {
      return false;
    }
  }

  return true;
}

const cityGetter = async () => {
  try {
    const response = await axios.get("http://localhost:3001/cities");
    const citiesData = response.data;

    if (citiesData && schedule && Object.keys(schedule).length > 0) {
      const cityIds = Object.values(schedule).map(element => {
        if (element.city) {
          const city = citiesData.find(city => city.name === element.city.name);
          if (city) {
            return city.id;
          }
        }
        return null;
      });

      return cityIds.filter(id => id !== null);
    }

    return [];
  } catch (error) {
    console.error("Error al obtener los datos de las ciudades:", error);
    throw error;
  }
}


const onSubmit = async (values) => {
  if (validateObject(values)) {
    try {
      const cityId = await cityGetter();
      const patient = { ...values, userId: logStatus.userStatus.id,cityId:cityId[0],direccion:schedule.medSelect.direccion };
      const appointment = {...schedule,patientId:logStatus.userStatus.id,status: "pending"}
      if (schedule && logStatus.userStatus) {
        const patientsPost = axios.post("http://localhost:3001/patients/create",patient).then(res=>res.data)
        const appointmentPost = axios.post("http://localhost:3001/appointment/create",appointment).then(res=>res.data)
        console.log("patient",patientsPost);
        console.log("appointment",appointmentPost);
      }
    } catch (error) {
      console.error("Error al obtener el ID de la ciudad:", error);
    }
  }
}

// {
//   "scheduledDate": "2023-06-03",
//   "scheduledTime": "12:45:00",
//   "status": "pending",
//   "userId": "4403843d-b15c-49de-94da-f1fbfff22341",(user_id: rol medico)
//   "patientId": 2
// }

// appointment

// {
//   "firstName": "Guillermo ",
//   "lastName": "Dimas Rivero",
//   "phone": "333333333",
//   "email": "adhemirsabino@gmail.com",
//   "direccion": "159 Cedar St",
//   "dni": "333333333",
//   "observaciones": "Some observations about the patient",
//   "userId": "be965039-a1ce-44e7-9d00-3ddb5f15616c", (userId: usuario paciente)
//   "cityId": 15
// }

  // if(logStatus.userStatus){
    return (
        <div >
          <Form labelCol={{   span: 3, }} wrapperCol={{   span: 10, }} layout="horizontal" onFinish={(values)=>onSubmit(values)} >
          <Form.Item
            name="firstName"
            label="Nombre"
            rules={[{ required: true, message: "Por favor ingrese su nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Apellido"
            rules={[
              { required: true, message: "Por favor ingrese su apellido" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Por favor ingrese su email" },
                  {
                    validator: (_, value) => {
                      return new Promise((resolve, reject) => {
                        if (
                          value &&
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(value)
                        ) {
                          resolve(); // Resuelve la promesa si la contraseña es válida
                        } else {
                          reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                        }
                      });
                    },
                    message: "El email no es válido",
                  },
                ]}
                hasFeedback
              >
                <Input
                  className={style.input}
                  type="text"
                  name="email"
                  placeholder="xxxx@mail.com"
                />
              </Form.Item>

              <Form.Item label={"Pais"}>
                  <Select value={selectedCountry.code} showArrow={true} onChange={handleCountryChange}>
                  {countries.map((country) => (
                    <option
                      value={country.code}
                      key={country.code}
                      style={{
                        backgroundImage: `url(${country.flag})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        paddingLeft: '25px', // Ajusta el espaciado según sea necesario
                      }}
                    >
                      {country.name}
                      {/* <Image width={50} height={50} src={country.flag} alt="" /> */}
                    </option>
                  ))}
                </Select>
              </Form.Item>

                  <Form.Item name="phone" label="Teléfono" 
                  rules={[
                    {required:true,
                    message:"Por favor ingrese su número de teléfono"},
                    {
                      validator: (_, value) => {
                        return new Promise((resolve, reject) => {
                          if (value && /^[0-9]{6,14}$/.test(value)) {
                            resolve(); // Resuelve la promesa si la contraseña es válida
                          } else {
                            reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                          }
                        });
                      },
                      message: "el teléfono es incorrecto"
                    }
                  ]}
                  hasFeedback
                >
                  <Input
                  className={style.input}
                  type="number"
                  name="phone"
                  placeholder="Número de teléfono"
                />
                </Form.Item>

            


              <Form.Item
                name="dni"
                label="dni"
                rules={[
                  { required: true, message: "Por favor ingrese su documento" },
                  {
                    validator: (_, value) => {
                      return new Promise((resolve, reject) => {
                        if (
                          value &&
                          /^\w{8}/.test(value)
                        ) {
                          resolve(); // Resuelve la promesa si la contraseña es válida
                        } else {
                          reject(); // Rechaza la promesa con un mensaje de error si la contraseña no es válida
                        }
                      });
                    },
                    message: "El documento no es válido",
                  },
                ]}
                hasFeedback
              >
                <Input
                  className={style.input}
                  type="text"
                  name="dni"
                  placeholder="Número de documento"
                />
              </Form.Item>

              <Form.Item name={"obra"} label={"Obra social"} rules={[{ required: true, message: "Por favor seleccione un campo" }]}>
              <Select value={selectedObra} showArrow={true} onChange={handleObraChange}>
              {obrasSociales.map((obra) => (
                <option
                  value={obra}
                  key={obra}
                >
                  {obra}
                </option>
              ))}
            </Select>
              </Form.Item>

              <Form.Item name={"observaciones"} label={"Observaciones del paciente"}>
                <TextArea rows={4} name={"observaciones"} placeholder="Observaciones" maxLength={150} />
              </Form.Item>
              
    
              {/* {errors.password && (<span>{errors.password}</span>)} */}
              {registered === "error" ? <Alert
              message="Ocurrió un error al registrarse"
              type="warning"
    /> : !registered && <Button block htmlType='submit' loading={loading}>registrarse</Button>}
            </Form>
        </div>
      );
  //   }else{
  //     return(
  //       <div>
  //           <h1>Debe iniciar sesión para pedir un turno</h1>
  //           {setTimeout(() => {
  //               router.push("/components/forms/UserLogin")
  //           }, 2000)}
  //       </div>
  //   )
  // }

  
}
